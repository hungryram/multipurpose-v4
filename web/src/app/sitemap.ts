import { MetadataRoute } from 'next';
import { getAllPages } from '../../lib/groq-data';
import { client } from '../../lib/sanity';

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await client.fetch(getAllPages);

  const websiteName = pages?.profileSettings?.settings?.websiteName

  // Generate the sitemap for blog
  const blogUrl = pages?.blog?.map((page: any) => ({
    url: `${websiteName}/blog/${page.slug}`,
    lastModified: page?._updatedAt,
  }));

  // Generate the sitemap for legal
  const legalUrl = pages?.legal?.map((page: any) => ({
    url: `${websiteName}/legal/${page.slug}`,
    lastModified: page?._updatedAt,
  }));

  // Generate the sitemap for team
  const teamUrl = pages?.team?.map((page: any) => ({
    url: `${websiteName}/team/${page.slug}`,
    lastModified: page?._updatedAt,
  }));

  // Generate the sitemap for services
  const servicesUrl = pages?.services?.map((page: any) => ({
    url: `${websiteName}/services/${page.slug}`,
    lastModified: page?._updatedAt,
  }));

  // Generate the sitemap for pages
  const pageUrl = pages?.pages?.map((page: any) => ({
    url: `${websiteName}/${page.slug}`,
    lastModified: page?._updatedAt,
  }));


  // Add additional static sitemap entries if needed
  const staticEntries = [
    {
      url: websiteName,
      lastModified: new Date(),
    },
    {
      url: `${websiteName}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${websiteName}/legal`,
      lastModified: new Date(),
    },
    {
      url: `${websiteName}/team`,
      lastModified: new Date(),
    },
    {
      url: `${websiteName}/services`,
      lastModified: new Date(),
    },
  ];

  // Concatenate the dynamic and static sitemap entries
  const allEntries = [...staticEntries, ...blogUrl, ...legalUrl, ...pageUrl, ...teamUrl, ...servicesUrl];

  return allEntries;
}
