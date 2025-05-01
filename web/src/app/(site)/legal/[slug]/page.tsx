import { notFound } from "next/navigation"
import { getLegal } from "../../../../../lib/groq-data"
import { Metadata } from 'next';
import ContentEditor from "../../components/util/content-editor";
import Hero from "../../components/templates/hero";
export const revalidate = 0;

interface Props {
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
    const legal = await getLegal(slug)

    return {
        title: legal?.legal?.seo?.title_tag,
        description: legal?.legal?.seo?.meta_description,
        metadataBase: new URL(legal?.profileSettings?.settings?.websiteName ?? 'http://localhost:3000'),
        alternates: {
            canonical: 'legal/' + legal?.legal?.slug
        },
        openGraph: {
            title: legal?.legal?.seo?.title_tag,
            description: legal?.legal?.seo?.meta_description,
            url: 'legal/' + legal?.legal?.slug,
            siteName: legal?.profileSettings?.company_name,
            images: legal?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: legal?.legal?.seo?.title_tag,
            description: legal?.legal?.seo?.meta_description,
            creator: '@' + legal?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: legal.appearances?.branding?.favicon?.asset?.url,
            shortcut: legal.appearances?.branding?.favicon?.asset?.url,
            apple: legal.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: legal?.legal?.seo?.noIndex ? false : true,
            follow: legal?.legal?.seo?.noIndex ? false : true,
        }
    }
}

export default async function LegalSlug({ params }: Props) {

    const legal = await getLegal(params.slug)

    if (!legal?.legal) {
        notFound()
    }

    console.log(legal.pageSetting)

    return (
        <div>
            <Hero
                image={legal.pageSetting.legal.imageData.asset.url}
                imageOverlayColor={{ rgb: { r: 0, g: 0, b: 0, a: 0.4 } }}
                textColor="#fff"
                enableBreadcrumbs={false}
                textAlign="left"
                layout="hero"
            />
            <div className="mx-auto max-w-3xl content py-20">
                <h1>{legal?.legal?.title}</h1>
                <hr />
                <ContentEditor
                    content={legal?.legal?.content}
                />
            </div>
        </div>
    )
}
