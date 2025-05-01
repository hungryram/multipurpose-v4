import { client } from "../../../../sanity/lib/client"
import { teamPage } from "../../../../lib/groq-data"
import { notFound } from "next/navigation"
import ContentEditor from "../components/util/content-editor"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const revalidate = 0

interface TeamMember {
  name: string
  position: string
  slug: {
    current: string
  }
  imageData: {
    asset: {
      url: string
      altText?: string
      lqip?: string
    }
  }
  description?: string
  socialAccounts?: {
    facebook?: string
    youtube?: string
    instagram?: string
    twitter?: string
    reddit?: string
    linkedin?: string
    yelp?: string
    pinterest?: string
    tiktok?: string
    zillow?: string
  }
}

// GENERATES SEO
export async function generateMetadata() {
  const teamMeta = await client.fetch(teamPage)
  const hasTeam = teamMeta?.team?.length > 0

  return {
    title: teamMeta?.pageSetting?.team?.seo?.title_tag,
    description: teamMeta?.pageSetting?.team?.seo?.meta_description,
    metadataBase: new URL(teamMeta?.profileSettings?.settings?.websiteName ?? "http://localhost:3000"),
    alternates: {
      canonical: "team",
    },
    openGraph: {
      title: teamMeta?.pageSetting?.team?.seo?.title_tag,
      description: teamMeta?.pageSetting?.team?.seo?.meta_description,
      url: "team",
      siteName: teamMeta?.profileSettings?.company_name,
      images: teamMeta?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
      locale: "en-US",
      type: "website",
    },
    twitter: {
      title: teamMeta?.pageSetting?.team?.seo?.title_tag,
      description: teamMeta?.pageSetting?.team?.seo?.meta_description,
      creator: "@" + teamMeta?.profileSettings?.seo?.twitterHandle,
    },
    icons: {
      icon: teamMeta.appearances?.branding?.favicon?.asset?.url,
      shortcut: teamMeta.appearances?.branding?.favicon?.asset?.url,
      apple: teamMeta.appearances?.branding?.favicon?.asset?.url,
    },
    robots: {
      index: hasTeam,
      follow: hasTeam,
    },
  }
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative aspect-[3/3] overflow-hidden rounded-t-lg">
        {member.imageData?.asset?.url ? (
          <Image
            src={member.imageData.asset.url || "/placeholder.svg"}
            alt={member.imageData.asset.altText || member.name}
            fill
            className="object-cover"
            placeholder={member.imageData.asset.lqip ? "blur" : "empty"}
            blurDataURL={member.imageData.asset.lqip}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>
      <CardContent className="flex-grow p-6">
        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{member.position}</p>
        {member.description && <p className="text-sm line-clamp-3">{member.description}</p>}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/team/${member.slug.current}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default async function TeamSection() {
  const team = await client.fetch(teamPage)

  if (!team.team) {
    notFound()
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Team",
    url: `${team?.profileSettings?.settings?.websiteName}/team`,
    ...(team?.pageSetting?.team?.seo?.meta_description && {
      description: team?.pageSetting?.team?.seo?.meta_description,
    }),
    mainEntity: team?.team?.map((member: TeamMember) => ({
      "@type": "Person",
      name: member?.name,
      jobTitle: member?.position,
      image: member?.imageData?.asset.url,
      description: member?.description,
      url: `${team?.profileSettings?.settings?.websiteName}/team/${member?.slug?.current}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <div className="pt-40 pb-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="content">
              <h1>{team?.pageSetting?.team?.title}</h1>
            </div>
            {team?.pageSetting?.team?.content && (
              <div className="mt-10">
                <ContentEditor content={team?.pageSetting?.team?.content} />
              </div>
            )}
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {team.team.map((member: TeamMember) => (
              <li key={member.slug.current}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

