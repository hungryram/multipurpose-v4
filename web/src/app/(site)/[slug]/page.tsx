import { notFound } from "next/navigation";
import { getPage } from "../../../../lib/groq-data";
import PageBuilder from "../components/templates/page-builder";
import { Metadata } from "next";
import { generatePageMetadata } from "../components/util/generateMetaData";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params; 

  return generatePageMetadata({
    slug: param.slug,
    fetcher: getPage,
    mainKey: "blog",
    type: 'page'
  });
}

// GENERATES PAGE DATA
export default async function Page({ params }: Props) {
  const param = await params;
  const slug = param.slug;
  
  const page = await getPage(slug);

  if (!page?.pages) {
    notFound();
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...(page?.pages?.title && { name: page.pages.title }),
    ...(page?.profileSettings?.settings?.websiteName && { url: page.profileSettings.settings.websiteName }),
    ...(page?.pages?.seo?.meta_description && { description: page.pages.seo.meta_description }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${page?.profileSettings?.settings?.websiteName}/${slug}`,
    },
    "publisher": {
      "@type": "Organization",
      ...(page?.profileSettings?.company_name && { name: page.profileSettings.company_name }),
      ...(page?.profileSettings?.settings?.websiteName && { url: page.profileSettings.settings.websiteName }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <PageBuilder
        pageBuilder={page?.pages?.pageBuilder}
        allServices={page?.allServices}
        allTestimonials={page?.allTestimonial}
        allBlog={page?.allBlog}
        allTeam={page?.allTeam}
      />
    </>
  );
}
