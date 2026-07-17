import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://3000-i9tqrsszlxh8mw3srxdlf.e2b.app/sitemap.xml",
  };
}
