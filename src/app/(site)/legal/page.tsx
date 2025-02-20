import { client } from '../../../../sanity/lib/client'
import { legalPage } from '../../../../lib/groq-data'
import ContentEditor from '../components/util/content-editor'
import Link from 'next/link'
export const revalidate = 0;

// GENERATES SEO
export async function generateMetadata() {
    const legal = await client.fetch(legalPage, { next: { revalidate: 60 } })

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

    const legal = await client.fetch(legalPage, { next: { revalidate: 60 } })

    const pageSettings = legal?.pageSetting?.legal

    return (
        <div className="px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{pageSettings?.title}</h1>
                <div className="mt-10">
                    <ContentEditor 
                        content={pageSettings?.content}
                    />
                </div>
                <div className="my-20">
                    <ul role="list" className="divide-y divide-gray-200">
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
