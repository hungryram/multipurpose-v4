import type React from "react"
import { client } from "../../../../lib/sanity"
import { servicesPage } from "../../../../lib/groq-data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ContentEditor from "../components/util/content-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Settings } from "lucide-react"
import { generatePageMetadata } from "../components/util/generateMetaData"

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
    return generatePageMetadata({
        fetcher: () => client.fetch(servicesPage),
        mainKey: "pageSetting",
        type: "services",
    });
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
            <div className="pt-44 pb-20">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
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
                                <Link key={service._id} href={`/services/${service.slug.current}`}>
                                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                                        {service?.imageData?.asset?.url ? (
                                            <div className="relative aspect-video overflow-hidden">
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
                                            <div className="flex aspect-video items-center justify-center bg-muted">
                                                <IconComponent className="h-12 w-12 text-muted-foreground transition-colors group-hover:text-primary" />
                                            </div>
                                        )}
                                        <div className="py-4 pl-6">
                                            <CardHeader>
                                                <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
                                                {service.detail && <CardDescription className="line-clamp-3">{service.detail}</CardDescription>}
                                            </CardHeader>
                                        </div>
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

