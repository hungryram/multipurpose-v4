import React from 'react'
import { getHome } from '../../../../../lib/groq-data'
import PageBuilder from '../../components/templates/page-builder'
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
            />
        </>
    )
}
