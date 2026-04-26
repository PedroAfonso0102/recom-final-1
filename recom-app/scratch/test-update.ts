
import { createHmac } from "crypto";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs';
import path from 'path';

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

function loadEnv() {
  const envPath = path.resolve('.env.local');
  if (fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf8');
    env.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  }
}

async function testUpdate() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_JWT_SECRET ?? LOCAL_SUPABASE_JWT_SECRET;
  const serviceKey = signServiceRoleJwt(secret);
  
  console.log('Testing update with generated service key...');
  const supabase = createClient(url!, serviceKey);
  
  const testValue = `Update Test ${new Date().toISOString()}`;
  const { data, error, status } = await supabase
    .from('suppliers')
    .update({ name: testValue })
    .eq('slug', 'kifix')
    .select();
    
  console.log('Status:', status);
  if (error) {
    console.error('Update Error:', error);
  } else {
    console.log('Update Success:', JSON.stringify(data, null, 2));
  }
}

testUpdate();
