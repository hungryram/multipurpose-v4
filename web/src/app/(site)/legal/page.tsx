import { client } from "../../../../lib/sanity"
import { legalPage } from '../../../../lib/groq-data'
import ContentEditor from '../components/util/content-editor'
import Link from 'next/link'
import Hero from '../components/templates/hero';
export const revalidate = 0;

// GENERATES SEO
export async function generateMetadata() {
    const legal = await client.fetch(legalPage)

    const hasLegal = legal?.legal?.length > 0;


    return {
        title: legal?.pageSetting?.legal?.seo?.title_tag,
        description: legal?.pageSetting?.legal?.seo?.meta_description,
        metadataBase: new URL(legal?.profileSettings?.settings?.websiteName ?? 'http://localhost:3000'),
        alternates: {
            canonical: 'legal'
        },
        openGraph: {
            title: legal?.legal?.seo?.title_tag,
            description: legal?.legal?.seo?.meta_description,
            url: 'legal',
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
            index: hasLegal,
            follow: hasLegal
        }
    }
}

export default async function LegalPage() {

    const legal = await client.fetch(legalPage)

    const pageSettings = legal?.pageSetting?.legal


    return (
        <div>
            <Hero
                image={pageSettings?.imageData.asset.url}
                content={legal?.pageSetting?.legal?.content}
                imageOverlayColor={{ rgb: { r: 0, g: 0, b: 0, a: 0.4 } }}
                textColor="#fff"
                enableBreadcrumbs={false}
                textAlign="left"
                layout="hero"
            />
            <div className="mx-auto max-w-2xl text-center content">
                <div className="mt-10">
                    <ContentEditor
                        content={pageSettings?.content}
                    />
                </div>
                <div className="my-20">
                    <ul role="list" className="divide-y list-none! divide-gray-200 text-xl">
                        {legal?.legal?.map((item: any) => (
                            <li key={item._id} className="py-4">
                                <Link href={`legal/${item.slug}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
