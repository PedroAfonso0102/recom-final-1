import { createHmac } from "crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";

const LOCAL_SUPABASE_JWT_SECRET = "super-secret-jwt-token-with-at-least-32-characters-long";

function base64Url(value: string) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signServiceRoleJwt(secret: string) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    iss: "supabase-demo",
    role: "service_role",
    exp: 1983812996,
  };

  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signature = createHmac("sha256", secret).update(unsignedToken).digest("base64url");

  return `${unsignedToken}.${signature}`;
}

function getServiceRoleKey() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required in production.");
  }

  return signServiceRoleJwt(process.env.SUPABASE_JWT_SECRET ?? LOCAL_SUPABASE_JWT_SECRET);
}

export function createAdminClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, getServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
