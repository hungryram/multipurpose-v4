import type { MetadataRoute } from "next";
import { client } from "../../lib/sanity";
import { getAllPages } from "../../lib/groq-data";

export const revalidate = 86400; // re-generate daily (avoid changing lastmod every request)

interface PageItem {
  slug: string;            // e.g., "ryan-serhant"
  _updatedAt: string;      // ISO string from Sanity
  seo?: { noindex?: boolean }; // if you have this in your query, we'll honor it
}

interface SitemapData {
  profileSettings?: { settings?: { websiteName?: string } };
  blog?: PageItem[];
  legal?: PageItem[];
  services?: PageItem[];
  locations?: PageItem[];
  tools?: PageItem[];
  pages?: PageItem[];
  portfolio?: PageItem[];
  categories?: PageItem[];
}

type Entry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: MetadataRoute.Sitemap[number]["priority"];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data: SitemapData = await client.fetch(getAllPages);

  // Use canonical base; strip trailing slash
  const base = (data?.profileSettings?.settings?.websiteName || process.env.NEXT_PUBLIC_SITE_URL!).replace(/\/$/, "");

  const mapSection = (prefix: string, arr?: PageItem[], opts?: { exclude?: (pi: PageItem) => boolean }) => {
    if (!arr) return [] as Entry[];
    return arr
      .filter((p) => p.slug)
      .filter((p) => !(opts?.exclude && opts.exclude(p)))
      .map((p) => ({
        url: `${base}${prefix}${p.slug}`,
        lastModified: new Date(p._updatedAt),
      }));
  };

  // Exclude patterns (tweak to your data)
  const excludeLowValue = (p: PageItem) =>
    p.seo?.noindex === true || /^(thank-you|sitemap)$/i.test(p.slug);

  const blog = mapSection("/blog/", data.blog, { exclude: excludeLowValue });
  const legal = mapSection("/legal/", data.legal);
  const services = mapSection("/services/", data.services);
  const locations = mapSection("/locations/", data.locations);
  const tools = mapSection("/tools/", data.tools);
  const pages = mapSection("/", data.pages, { exclude: excludeLowValue });
  const portfolio = mapSection("/portfolio/", data.portfolio);
  const categories = mapSection("/blog/category/", data.categories);

  // Hub pages: lastmod = latest child in section
  const latest = (arr: Entry[]) =>
    arr.length ? new Date(Math.max(...arr.map((e) => e.lastModified?.getTime() ?? 0))) : undefined;

  const hubs: Entry[] = [
    { url: base, lastModified: latest([...pages]) ?? new Date() , changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: latest(blog), changeFrequency: "weekly", priority: 0.7 },
    // { url: `${base}/blog/category`, lastModified: latest(categories), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/legal`, lastModified: latest(legal), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/services`, lastModified: latest(services), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog/category`, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Combine + de-dupe by URL
  const combined = [
    ...hubs,
    ...blog, ...legal, ...services, ...locations, ...tools, ...pages, ...portfolio, ...categories,
  ];

  const seen = new Set<string>();
  const deduped = combined.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  return deduped;
}
