import { client } from "../../../../sanity/lib/client"
import { servicesPage } from "../../../../lib/groq-data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ContentEditor from "../components/util/content-editor"
export const revalidate = 0;

// GENERATES SEO
export async function generateMetadata() {
    const serviceMeta = await client.fetch(servicesPage, { next: { revalidate: 60 } })

    const hasServices = serviceMeta?.services?.length > 0;

    return {
        title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
        description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
        metadataBase: new URL(serviceMeta?.profileSettings?.settings?.websiteName ?? 'http://localhost:3000'),
        alternates: {
            canonical: 'services'
        },
        openGraph: {
            title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
            description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
            url: 'services',
            siteName: serviceMeta?.profileSettings?.company_name,
            images: serviceMeta?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
            description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
            creator: '@' + serviceMeta?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: serviceMeta.appearances?.branding?.favicon?.asset?.url,
            shortcut: serviceMeta.appearances?.branding?.favicon?.asset?.url,
            apple: serviceMeta.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: hasServices,
            follow: hasServices
        }
    }
}

export default async function ServicesSection() {

    const services = await client.fetch(servicesPage, { next: { revalidate: 60 } })

    if (!services.services) {
        notFound()
    }

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Services",
        "url": `${services?.profileSettings?.settings?.websiteName}/services`,
        ...(services?.pageSetting?.services?.seo?.meta_description && { "description": services?.pageSetting?.services?.seo?.meta_description }),
        "mainEntity": services?.services?.map((node: any) => ({
            ...{
                "@type": "Service",
                "name": node?.title,
                "description": node.description,
                "image": node.imageData?.asset.url,
                "provider": {
                    "@type": "Organization",
                    "name": services?.profileSettings?.company_name,
                    "url": `${services?.profileSettings?.settings?.websiteName}/services/${node?.slug?.current}`,
                },
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className={services?.appearances?.header?.enableTransparent ? 'pt-40 pb-20' : 'section'}>
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="content">
                            <h1>{services?.pageSetting?.services?.title}</h1>
                        </div>
                        {services?.pageSetting?.services?.content &&
                            <div className="mt-10">
                                <ContentEditor
                                    content={services?.pageSetting?.services?.content}
                                />
                            </div>
                        }
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {services?.services?.map((node: any) => {

                            return (
                                <li key={node._id} className="relative">
                                    <Link href={`services/${node?.slug.current}`}>
                                        <div className="group relative block w-full h-80 overflow-hidden rounded-sm">
                                            {node?.imageData?.asset?.url ?
                                                <Image
                                                    src={node?.imageData?.asset?.url}
                                                    alt={node?.imageData?.asset?.altText}
                                                    className="object-cover group-hover:opacity-75 transition-all duration-500"
                                                    fill={true}
                                                    placeholder={node?.imageData?.asset?.lqip ? 'blur' : 'empty'}
                                                    blurDataURL={node?.imageData?.asset?.lqip}
                                                />
                                                :
                                                <div></div>
                                            }
                                        </div>
                                        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight">{node.title}</h3>
                                        {node?.detail &&
                                            <p className="mt-2">
                                                {node?.detail}
                                            </p>
                                        }
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
