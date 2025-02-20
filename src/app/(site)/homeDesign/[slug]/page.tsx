import React from 'react'
import { getHome } from '../../../../../lib/groq-data'
import PageBuilder from '../../components/templates/main'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';
export const revalidate = 0;

type Props = {
    params: {
        slug: string
    }
}

// GENERATES SEO
export async function generateMetadata(): Promise<Metadata> {
    return {
        robots: {
            index: false,
            follow: false,
        }
    }
}

export default async function servicesSlug({ params }: Props) {

    const slug = params.slug
    const home = await getHome(slug)

    if (!home?.homeDesign) {
        notFound()
    }

    return (
        <>
            <PageBuilder
                pageBuilder={home?.homeDesign?.pageBuilder}
                allTestimonials={home?.allTestimonial}
                allServices={home?.allServices}
                allTeam={home?.allTeam}
                allBlog={home.allBlog}
                // CONTACT
                email={home?.profileSettings?.contact_information?.email}
                phone_number={home?.profileSettings?.contact_information?.phone_number}
                office_number={home?.profileSettings?.contact_information?.office_number}
                address={home?.profileSettings?.address?.address}
                city={home?.profileSettings?.address?.city}
                state={home?.profileSettings?.address?.state}
                zip_code={home?.profileSettings?.address?.zip_code}
                // SOCIAL
                facebook={home?.profileSettings?.social?.facebook}
                youtube={home?.profileSettings?.social?.youtube}
                instagram={home?.profileSettings?.social?.instagram}
                twitter={home?.profileSettings?.social?.twitter}
                reddit={home?.profileSettings?.social?.reddit}
                linkedin={home?.profileSettings?.social?.linkedin}
                yelp={home?.profileSettings?.social?.yelp}
                pinterest={home?.profileSettings?.social?.pinterest}
                tiktok={home?.profileSettings?.social?.tiktok}
                zillow={home?.profileSettings?.social?.zillow}
            />
        </>
    )
}
