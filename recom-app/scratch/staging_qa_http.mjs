import { createHmac, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const jwtSecret = process.env.SUPABASE_JWT_SECRET || "super-secret-jwt-token-with-at-least-32-characters-long";
const appUrl = process.env.QA_APP_URL || "http://localhost:3000";

function base64Url(value) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signServiceRoleJwt() {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { iss: "supabase-demo", role: "service_role", exp: 1983812996 };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signature = createHmac("sha256", jwtSecret).update(unsigned).digest("base64url");
  return `${unsigned}.${signature}`;
}

const anon = createClient(url, anonKey);
const service = createClient(url, signServiceRoleJwt(), {
  auth: { autoRefreshToken: false, persistSession: false },
});

const results = [];
const cleanup = [];

function record(name, ok, details = "") {
  results.push({ name, ok, details });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${details ? ` :: ${details}` : ""}`);
}

async function signIn(email, password) {
  const client = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`signIn ${email}: ${error.message}`);
  return client;
}

async function createRoleUser(role) {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const email = `qa-${role}-${suffix}@recom.local`;
  const password = `QA-${role}-password-123`;
  const { data, error } = await service.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role },
  });
  if (error) throw error;
  const id = data.user.id;
  await service.from("admin_profiles").upsert({ id, role, display_name: `QA ${role}` });
  await service.from("profiles").upsert({ id, role, display_name: `QA ${role}` });
  cleanup.push(async () => service.from("admin_profiles").delete().eq("id", id));
  cleanup.push(async () => service.from("profiles").delete().eq("id", id));
  cleanup.push(async () => service.auth.admin.deleteUser(id));
  return { client: await signIn(email, password), id };
}

async function fetchStatus(path) {
  const res = await fetch(`${appUrl}${path}`, { redirect: "manual" });
  const text = await res.text();
  return { status: res.status, location: res.headers.get("location"), text };
}

try {
  const { data: buckets, error: bucketError } = await service.storage.listBuckets();
  record("service lista buckets de storage", !bucketError, bucketError?.message);
  const mediaBucket = buckets?.find((bucket) => bucket.id === "media");
  const leadBucket = buckets?.find((bucket) => bucket.id === "lead-files");
  record("bucket media publico existe", mediaBucket?.public === true, `public=${mediaBucket?.public}`);
  record("bucket lead-files privado existe", leadBucket?.public === false, `public=${leadBucket?.public}`);

  const leadObjectPath = `qa/${randomUUID()}.txt`;
  const upload = await service.storage.from("lead-files").upload(leadObjectPath, new Blob(["qa lead attachment"], { type: "text/plain" }), {
    contentType: "text/plain",
    upsert: false,
  });
  record("service faz upload em lead-files para QA", !upload.error, upload.error?.message);
  if (!upload.error) {
    cleanup.push(async () => service.storage.from("lead-files").remove([leadObjectPath]));
    const signed = await service.storage.from("lead-files").createSignedUrl(leadObjectPath, 60);
    record("lead-files gera signed URL", !signed.error && Boolean(signed.data?.signedUrl), signed.error?.message);
    if (signed.data?.signedUrl) {
      const signedFetch = await fetch(signed.data.signedUrl);
      record("signed URL de anexo privado responde", signedFetch.status === 200, `status=${signedFetch.status}`);
    }
    const publicUrl = service.storage.from("lead-files").getPublicUrl(leadObjectPath).data.publicUrl;
    const publicFetch = await fetch(publicUrl);
    record("lead-files nao responde via URL publica", publicFetch.status !== 200, `status=${publicFetch.status}`);
  }

  const admin = await createRoleUser("admin");
  const editor = await createRoleUser("editor");
  const comercial = await createRoleUser("comercial");

  const leadEmail = `qa-${Date.now()}@recom.local`;
  const leadInsert = await anon.from("leads").insert({
    name: "QA Checklist",
    company: "RECOM QA",
    email: leadEmail,
    phone: "11999999999",
    message: "Lead criado por smoke test do checklist.",
    source_page: "/contato",
    source_type: "qa",
  });
  record("anon cria lead", !leadInsert.error, leadInsert.error?.message);
  const leadLookup = await service.from("leads").select("id").eq("email", leadEmail).single();
  const leadId = leadLookup.data?.id;
  record("service localiza lead criado por anon", !leadLookup.error && Boolean(leadId), leadLookup.error?.message);
  if (leadId) cleanup.push(async () => service.from("leads").delete().eq("id", leadId));
  const adminLead = leadId ? await admin.client.from("leads").select("id").eq("id", leadId) : { data: [], error: null };
  record("admin le lead", !adminLead.error && adminLead.data?.length === 1, adminLead.error?.message);

  const editorLead = leadId ? await editor.client.from("leads").select("id").eq("id", leadId) : { data: [], error: null };
  record("editor nao le leads", !editorLead.error && editorLead.data?.length === 0, editorLead.error?.message);

  const comercialLead = leadId ? await comercial.client.from("leads").select("id,status").eq("id", leadId) : { data: [], error: null };
  record("comercial le leads", !comercialLead.error && comercialLead.data?.length === 1, comercialLead.error?.message);

  const comercialUpdate = leadId ? await comercial.client.from("leads").update({ status: "contacted" }).eq("id", leadId).select("id,status") : { data: [], error: null };
  record("comercial atualiza lead", !comercialUpdate.error && comercialUpdate.data?.[0]?.status === "contacted", comercialUpdate.error?.message);

  const pageSlug = `qa-page-${Date.now()}`;
  const editorPage = await editor.client.from("pages").insert({
    slug: pageSlug,
    title: "QA Editor Page",
    status: "draft",
    page_type: "static",
  }).select("id").single();
  record("editor cria pagina draft", !editorPage.error && Boolean(editorPage.data?.id), editorPage.error?.message);
  if (editorPage.data?.id) cleanup.push(async () => service.from("pages").delete().eq("id", editorPage.data.id));

  const comercialPage = await comercial.client.from("pages").insert({
    slug: `${pageSlug}-comercial`,
    title: "QA Comercial Page",
    status: "draft",
    page_type: "static",
  }).select("id").single();
  record("comercial nao cria pagina", Boolean(comercialPage.error), comercialPage.error?.message || "insert sem erro");
  if (comercialPage.data?.id) cleanup.push(async () => service.from("pages").delete().eq("id", comercialPage.data.id));

  const { data: supplier } = await anon.from("suppliers").select("slug,name").in("status", ["active", "published"]).limit(1).single();
  const { data: process } = await anon.from("processes").select("slug,name").in("status", ["active", "published"]).limit(1).single();
  const { data: promotions } = await anon.from("promotions").select("slug,title,ends_at,status").in("status", ["active", "published"]);
  record("anon ve fornecedor publicado", Boolean(supplier?.slug), supplier?.slug);
  record("anon ve processo publicado", Boolean(process?.slug), process?.slug);
  record("anon ve promocoes ativas/publicaveis", Array.isArray(promotions) && promotions.every((promo) => new Date(promo.ends_at) >= new Date()), `count=${promotions?.length ?? 0}`);

  if (supplier?.slug) {
    const detail = await fetchStatus(`/fornecedores-catalogos/${supplier.slug}`);
    record("rota de fornecedor publicado responde", detail.status === 200 && detail.text.includes(supplier.name), `status=${detail.status} slug=${supplier.slug}`);
  }
  if (process?.slug) {
    const detail = await fetchStatus(`/solucoes/${process.slug}`);
    record("rota de processo publicado responde", detail.status === 200 && detail.text.includes(process.name), `status=${detail.status} slug=${process.slug}`);
  }

  const expiredSlug = `qa-expired-${Date.now()}`;
  const expired = await service.from("promotions").insert({
    slug: expiredSlug,
    title: "QA Promo Expirada",
    description: "Promocao expirada para testar filtro publico.",
    starts_at: "2026-01-01",
    ends_at: "2026-01-02",
    status: "active",
    cta_label: "Consultar disponibilidade",
    cta_url: "/contato",
  }).select("id").single();
  record("service cria promocao expirada temporaria", !expired.error && Boolean(expired.data?.id), expired.error?.message);
  if (expired.data?.id) cleanup.push(async () => service.from("promotions").delete().eq("id", expired.data.id));
  const expiredAnon = await anon.from("promotions").select("slug").eq("slug", expiredSlug);
  record("anon nao ve promocao vencida como ativa", !expiredAnon.error && expiredAnon.data?.length === 0, expiredAnon.error?.message);

  const draftProcessSlug = `qa-draft-process-${Date.now()}`;
  const draftProcess = await service.from("processes").insert({
    slug: draftProcessSlug,
    name: "QA Processo Draft",
    short_description: "Draft oculto.",
    long_description: "Draft oculto do publico.",
    status: "draft",
  }).select("id").single();
  record("service cria processo draft temporario", !draftProcess.error && Boolean(draftProcess.data?.id), draftProcess.error?.message);
  if (draftProcess.data?.id) cleanup.push(async () => service.from("processes").delete().eq("id", draftProcess.data.id));
  const draftProcessAnon = await anon.from("processes").select("slug").eq("slug", draftProcessSlug);
  record("anon nao ve processo draft", !draftProcessAnon.error && draftProcessAnon.data?.length === 0, draftProcessAnon.error?.message);

  const notFound = await fetchStatus(`/qa-rota-inexistente-${Date.now()}`);
  const hasRecoveryLinks =
    notFound.text.includes("/fornecedores-catalogos") &&
    notFound.text.includes("/solucoes") &&
    notFound.text.includes("/contato");
  record("404 tem links de recuperacao", [200, 404].includes(notFound.status) && hasRecoveryLinks, `status=${notFound.status}`);
} finally {
  for (const step of cleanup.reverse()) {
    try {
      await step();
    } catch (error) {
      console.warn(`cleanup warning: ${error.message}`);
    }
  }
}

const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`\n${failed.length} QA checks failed.`);
  process.exit(1);
}

console.log(`\n${results.length} QA checks passed.`);
