import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://recom.com.br";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/preview", "/login", "/api", "/preview", "/*?preview="],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
