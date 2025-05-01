import type React from "react"
import { client } from "../../../../lib/sanity"
import { servicesPage } from "../../../../lib/groq-data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ContentEditor from "../components/util/content-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Settings} from "lucide-react"

interface Service {
    _id: string
    title: string
    detail?: string
    description?: string
    slug: {
        current: string
    }
    imageData?: {
        asset?: {
            url: string
            altText?: string
            lqip?: string
        }
    }
}

// Map of service titles to icons - add more as needed
const serviceIcons: Record<string, React.ElementType> = {
    default: Settings,
}

// GENERATES SEO
export async function generateMetadata() {
    const serviceMeta = await client.fetch(servicesPage)
    const hasServices = serviceMeta?.services?.length > 0

    return {
        title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
        description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
        metadataBase: new URL(serviceMeta?.profileSettings?.settings?.websiteName ?? "http://localhost:3000"),
        alternates: {
            canonical: "services",
        },
        openGraph: {
            title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
            description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
            url: "services",
            siteName: serviceMeta?.profileSettings?.company_name,
            images: serviceMeta?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
            locale: "en-US",
            type: "website",
        },
        twitter: {
            title: serviceMeta?.pageSetting?.services?.seo?.title_tag,
            description: serviceMeta?.pageSetting?.services?.seo?.meta_description,
            creator: "@" + serviceMeta?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: serviceMeta.appearances?.branding?.favicon?.asset?.url,
            shortcut: serviceMeta.appearances?.branding?.favicon?.asset?.url,
            apple: serviceMeta.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: hasServices,
            follow: hasServices,
        },
    }
}

export default async function ServicesSection() {
    const services = await client.fetch(servicesPage)

    if (!services.services) {
        notFound()
    }

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Services",
        url: `${services?.profileSettings?.settings?.websiteName}/services`,
        ...(services?.pageSetting?.services?.seo?.meta_description && {
            description: services?.pageSetting?.services?.seo?.meta_description,
        }),
        mainEntity: services?.services?.map((node: Service) => ({
            "@type": "Service",
            name: node?.title,
            description: node.description,
            image: node.imageData?.asset?.url,
            provider: {
                "@type": "Organization",
                name: services?.profileSettings?.company_name,
                url: `${services?.profileSettings?.settings?.websiteName}/services/${node?.slug?.current}`,
            },
        })),
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <div className="pt-40 pb-20">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{services?.pageSetting?.services?.title ?? 'Services'}</h1>
                        {services?.pageSetting?.services?.content && (
                            <div className="mt-6 text-lg leading-8 text-muted-foreground">
                                <ContentEditor content={services?.pageSetting?.services?.content} />
                            </div>
                        )}
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {services?.services?.map((service: Service) => {
                            const IconComponent = serviceIcons[service.title] || serviceIcons.default

                            return (
                                <Link key={service._id} href={`services/${service.slug.current}`} className="group relative">
                                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                                        {service?.imageData?.asset?.url ? (
                                            <div className="relative aspect-[16/9] overflow-hidden">
                                                <Image
                                                    src={service.imageData.asset.url || "/placeholder.svg"}
                                                    alt={service.imageData.asset.altText || service.title}
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    fill
                                                    placeholder={service.imageData.asset.lqip ? "blur" : "empty"}
                                                    blurDataURL={service.imageData.asset.lqip}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex aspect-[16/9] items-center justify-center bg-muted">
                                                <IconComponent className="h-12 w-12 text-muted-foreground transition-colors group-hover:text-primary" />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                            {service.detail && <CardDescription className="line-clamp-3">{service.detail}</CardDescription>}
                                        </CardHeader>
                                        <CardContent>
                                            <span className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                                Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

