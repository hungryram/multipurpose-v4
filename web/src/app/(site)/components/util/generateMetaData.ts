import type {Metadata} from "next"

interface GenerateSeoOptions<T> {
  slug?: string
  fetcher: (slug?: string) => Promise<T>
  mainKey: keyof T
  type?: string
}

export async function generatePageMetadata<T extends Record<string, any>>({
  slug,
  fetcher,
  mainKey,
  type = "page",
}: GenerateSeoOptions<T>): Promise<Metadata> {
  const data = await fetcher(slug)
  const main = data?.[mainKey]
  const settings = data?.profileSettings
  const pageSetting = data?.pageSetting

  const pageSettingSEO = pageSetting?.[type]?.seo

  let urlPath: string

  if (type === "blog" && !slug) {
    urlPath = `/blog` // blog singleton/listing
  } else if (type === "blog") {
    urlPath = `/blog/${slug}` // blog post
  } else if (type === "services" && !slug) {
    urlPath = `/services` // services singleton
  } else if (type === "services") {
    urlPath = `/services/${slug}` // single service
  } else if (type === "team" && !slug) {
    urlPath = `/team` // team singleton
  } else if (type === "team") {
    urlPath = `/team/${slug}` // team member
  } else if (type === "legal" && !slug) {
    urlPath = `/legal` // legal singleton
  } else if (type === "legal") {
    urlPath = `/legal/${slug}` // legal doc
  } else {
    urlPath = slug ? `/${slug}` : `/` // fallback
  }

  return {
    title: main?.seo?.title_tag || pageSettingSEO?.title_tag,
    description:
      main?.seo?.meta_description || pageSettingSEO?.meta_description,
    metadataBase: new URL(
      settings?.settings?.websiteName ?? "http://localhost:3000"
    ),
    alternates: {
      canonical: urlPath,
    },
    openGraph: {
      title: main?.seo?.title_tag || pageSettingSEO?.title_tag,
      description:
        main?.seo?.meta_description || pageSettingSEO?.meta_description,
      url: urlPath,
      siteName: data?.profileSettings?.company_name,
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: main?.seo?.title_tag || pageSettingSEO?.title_tag,
      description:
        main?.seo?.meta_description || pageSettingSEO?.meta_description,
      creator: "@" + data?.profileSettings?.seo?.twitterHandle,
    },
    icons: {
      icon: data?.appearances?.branding?.favicon?.asset?.url,
      shortcut: data?.appearances?.branding?.favicon?.asset?.url,
      apple: data?.appearances?.branding?.favicon?.asset?.url,
    },
    robots: {
      index: main?.seo?.noIndex ? false : true,
      follow: main?.seo?.noIndex ? false : true,
    },
  }
}
