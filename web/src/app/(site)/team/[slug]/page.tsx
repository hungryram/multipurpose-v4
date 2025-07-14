import { getTeam } from '../../../../../lib/groq-data'
import ContentEditor from "../../components/util/content-editor"
import Image from "next/image"
import { FaMobileAlt, FaRegEnvelope } from "react-icons/fa";
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Social from "../../components/templates/social"
import { generatePageMetadata } from '../../components/util/generateMetaData';
import { PageParams } from '@/lib/types';

// GENERATES SEO
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const param = await params;

  return generatePageMetadata({
    slug: param.slug,
    fetcher: getTeam,
    mainKey: "team",
    type: 'team'
  });
}

export default async function TeamSlug({ params }: PageParams) {
  const param = await params;
  const slug = param.slug;
  
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <div>
        <div className="container pt-44 pb-20">
          <div>
            {/* Header Section */}
            <div className="text-left mb-12">
              <p className="text-base font-semibold text-primary mb-2">{data?.position}</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{data?.name}</h1>
              <div className="flex flex-wrap items-center justify-start gap-6">
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
              <div>
                {data?.imageData?.asset?.url ? (
                  <Image
                    src={data?.imageData?.asset?.url || "/placeholder.svg"}
                    alt={data?.imageData?.asset?.altText || data?.name}
                    width={800}
                    height={800}
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

