import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
        {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/*", "/privacy-policy", "/terms-of-service", "/olympiads/*/edit"]
        }
    ],
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`
  };
}