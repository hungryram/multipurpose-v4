import { getTeam } from '../../../../../lib/groq-data'
import ContentEditor from "../../components/util/content-editor"
import Image from "next/image"
import { FaMobileAlt,FaRegEnvelope } from "react-icons/fa";
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Social from "../../components/templates/social"

type Props = {
  params: {
    slug: string
  }
}

type Meta = {
  params: {
    slug: string
  }
}

// GENERATES SEO
export async function generateMetadata({ params }: Meta): Promise<Metadata> {
  const slug = params.slug
  const teamMetaData = await getTeam(slug)

  return {
    title: teamMetaData?.team?.seo?.title_tag,
    description: teamMetaData?.team?.seo?.meta_description,
    metadataBase: new URL(teamMetaData?.profileSettings?.settings?.websiteName ?? "http://localhost:3000"),
    alternates: {
      canonical: "team/" + teamMetaData?.team?.slug,
    },
    openGraph: {
      title: teamMetaData?.team?.seo?.title_tag,
      description: teamMetaData?.team?.seo?.meta_description,
      url: "team/" + teamMetaData?.team?.slug,
      siteName: teamMetaData?.profileSettings?.company_name,
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: teamMetaData?.team?.seo?.title_tag,
      description: teamMetaData?.team?.seo?.meta_description,
      creator: "@" + teamMetaData?.profileSettings?.seo?.twitterHandle,
    },
    robots: {
      index: teamMetaData?.team?.seo?.noIndex ? false : true,
      follow: teamMetaData?.team?.seo?.noIndex ? false : true,
    },
  }
}

export default async function TeamSlug({ params }: Props) {
  const slug = params.slug
  const team = await getTeam(slug)

  if (!team?.team) {
    notFound()
  }

  const data = team?.team

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(data?.name && { name: data?.name }),
    ...(data?.jobTitle && { jobTitle: data?.jobTitle }),
    url: `${team?.profileSettings?.settings?.websiteName}/team/${data?.slug}`,
    ...(data?.imageData?.asset?.url && { image: data?.imageData?.asset?.url }),
    worksFor: {
      "@type": "Organization",
      ...(team?.profileSettings?.company_name && { name: team?.profileSettings?.company_name }),
      ...(team?.profileSettings?.settings?.websiteName && { url: team?.profileSettings?.settings?.websiteName }),
    },
  }

  console.log(data?.socialAccounts?.twitter)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <div>
        <div className="container pt-32 pb-20">
          <div className="mx-auto max-w-4xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <p className="text-base font-semibold text-primary mb-2">{data?.position}</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{data?.name}</h1>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {data?.contactInformation?.phoneNumber && (
                  <a
                    href={`tel:${data?.contactInformation?.phoneNumber}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <FaMobileAlt className="h-4 w-4" />
                    {data?.contactInformation?.phoneNumber}
                  </a>
                )}
                {data?.contactInformation?.email && (
                  <a
                    href={`mailto:${data?.contactInformation?.email}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <FaRegEnvelope className="h-4 w-4" />
                    {data?.contactInformation?.email}
                  </a>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                {data?.imageData?.asset?.url ? (
                  <Image
                    src={data?.imageData?.asset?.url || "/placeholder.svg"}
                    alt={data?.imageData?.asset?.altText || data?.name}
                    fill
                    className="object-cover"
                    placeholder={data?.imageData?.asset?.lqip ? "blur" : "empty"}
                    blurDataURL={data?.imageData?.asset?.lqip}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  {data?.about ? <ContentEditor content={data?.about} /> : <p>Bio coming soon!</p>}
                </div>

                {/* Social Links */}
                <div className="border-t">
                <Social
                    links={{
                      facebook: data?.socialAccounts?.facebook,
                      youtube: data?.socialAccounts?.youtube,
                      instagram: data?.socialAccounts?.instagram,
                      twitter: data?.socialAccounts?.twitter,
                      reddit: data?.socialAccounts?.reddit,
                      linkedin: data?.socialAccounts?.linkedin,
                      yelp: data?.socialAccounts?.yelp,
                      pinterest: data?.socialAccounts?.pinterest,
                      tiktok: data?.socialAccounts?.tiktok,
                      zillow: data?.socialAccounts?.zillow,
                    }}
                    size="large"
                    className="mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

