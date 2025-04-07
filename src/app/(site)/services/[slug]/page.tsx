import React from 'react'
import { getServices } from '../../../../../lib/groq-data'
import PageBuilder from '../../components/templates/page-builder'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';
export const revalidate = 0;

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
    const servicesMeta = await getServices(slug)
    return {
        title: servicesMeta?.services?.seo?.title_tag,
        description: servicesMeta?.services?.seo?.meta_description,
        metadataBase: new URL(servicesMeta?.profileSettings?.settings?.websiteName ?? 'http://localhost:3000'),
        alternates: {
            canonical: 'services/' + servicesMeta?.services?.slug
        },
        openGraph: {
            title: servicesMeta?.services?.seo?.title_tag,
            description: servicesMeta?.services?.seo?.meta_description,
            url: 'services/' + servicesMeta?.services?.slug,
            siteName: servicesMeta?.profileSettings?.company_name,
            images: servicesMeta?.services?.imageData?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: servicesMeta?.services?.seo?.title_tag,
            description: servicesMeta?.services?.seo?.meta_description,
            creator: '@' + servicesMeta?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: servicesMeta?.appearances?.branding?.favicon?.asset?.url,
            shortcut: servicesMeta?.appearances?.branding?.favicon?.asset?.url,
            apple: servicesMeta?.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: servicesMeta?.services?.seo?.noIndex ? false : true,
            follow: servicesMeta?.services?.seo?.noIndex ? false : true,
        }
    }
}

export default async function servicesSlug({ params }: Props) {

    const slug = params.slug
    const services = await getServices(slug)

    if (!services?.services) {
        notFound()
    }

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Service",
        ...(services?.services?.title && { "name": services?.services?.title }),
        ...(services?.services?.seo?.meta_description && { "description": services?.services?.seo?.meta_description }),
        "url": `${services?.profileSettings?.settings?.websiteName}/services/${services?.services?.slug}`,
        ...(services?.services?.imageData?.asset?.url && { "image": services?.services?.imageData?.asset?.url }),
        "provider": {
            "@type": "Organization",
            ...(services?.profileSettings?.company_name && { "name": services?.profileSettings?.company_name }),
            ...(services?.profileSettings?.settings?.websiteName && { "url": services?.profileSettings?.settings?.websiteName })
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <PageBuilder
                pageBuilder={services?.services?.pageBuilder}
                allTestimonials={services?.allTestimonial}
                allServices={services?.allServices}
                allTeam={services?.allTeam}
                allBlog={services.allBlog}
            />
        </>
    )
}
