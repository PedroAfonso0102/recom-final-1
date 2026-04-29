import type { NextConfig } from "next";

const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: supabaseUrl.protocol.replace(":", "") as "http" | "https",
        hostname: supabaseUrl.hostname,
        port: supabaseUrl.port,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sobre",
        destination: "/a-recom",
        permanent: true,
      },
      {
        source: "/fornecedores",
        destination: "/fornecedores-catalogos",
        permanent: true,
      },
      {
        source: "/fornecedores/:slug",
        destination: "/fornecedores-catalogos/:slug",
        permanent: true,
      },
      {
        source: "/processos",
        destination: "/solucoes",
        permanent: true,
      },
      {
        source: "/processos/:slug",
        destination: "/solucoes/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
