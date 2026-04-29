import { createClient } from "@supabase/supabase-js";
import { resolve } from "path";

// Env vars will be loaded via node --env-file

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runVerification() {
  console.log("--- Starting E2E API Verification ---");

  // 1. Verify Supplier Creation
  const testSupplier = {
    name: "TEST_SUP_E2E_" + Date.now(),
    slug: "test-sup-e2e-" + Date.now(),
    short_description: "Test description",
    status: "draft"
  };

  console.log("1. Creating test supplier...");
  const { data: supplier, error: supError } = await supabase
    .from("suppliers")
    .insert(testSupplier)
    .select()
    .single();

  if (supError) {
    console.error("Error creating supplier:", supError);
    return;
  }
  console.log("   Supplier created ID:", supplier.id);

  // 2. Verify CMS Page Creation
  const testPage = {
    title: "TEST_PAGE_E2E_" + Date.now(),
    slug: "test-page-e2e-" + Date.now(),
    content: { blocks: [] },
    status: "draft"
  };

  console.log("2. Creating test CMS page...");
  const { data: page, error: pageError } = await supabase
    .from("cms_pages")
    .insert(testPage)
    .select()
    .single();

  if (pageError) {
    console.error("Error creating page:", pageError);
    return;
  }
  console.log("   Page created ID:", page.id);

  // 3. Verify Lead Note Update
  console.log("3. Creating test lead and updating notes...");
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      name: "Test User",
      email: "test@example.com",
      status: "new"
    })
    .select()
    .single();

  if (leadError) {
    console.error("Error creating lead:", leadError);
  } else {
    const testNotes = "Note updated at " + new Date().toISOString();
    const { error: noteError } = await supabase
      .from("leads")
      .update({ notes: testNotes })
      .eq("id", lead.id);

    if (noteError) {
      console.error("Error updating lead notes:", noteError);
    } else {
      console.log("   Lead notes updated successfully.");
    }
  }

  // 4. Verify Audit Logs
  console.log("4. Verifying audit logs for these actions...");
  // Wait a bit for the DB to settle (though it's sync in this script)
  const { data: logs, error: logError } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (logError) {
    console.error("Error fetching audit logs:", logError);
  } else {
    console.log("   Recent Audit Logs:");
    logs.forEach(log => {
      console.log(`   - [${log.action}] on ${log.entity_type} (${log.entity_id})`);
    });
  }

  // Cleanup
  console.log("--- Cleaning up ---");
  await supabase.from("suppliers").delete().eq("id", supplier.id);
  await supabase.from("cms_pages").delete().eq("id", page.id);
  if (lead) await supabase.from("leads").delete().eq("id", lead.id);

  console.log("Verification finished.");
}

runVerification().catch(console.error);
