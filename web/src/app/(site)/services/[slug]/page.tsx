import React from 'react'
import { getServices } from '../../../../../lib/groq-data'
import PageBuilder from '../../components/templates/page-builder'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';
import { generatePageMetadata } from '../../components/util/generateMetaData';
import { PageParams } from '@/lib/types';

// GENERATES SEO
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const param = await params;

    return generatePageMetadata({
        slug: param.slug,
        fetcher: getServices,
        mainKey: "services",
        type: 'services'
    });
}

export default async function servicesSlug({ params }: PageParams) {

    const param = await params;
    const slug = param.slug;

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
