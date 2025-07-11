import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import HeaderSection from "./header-section"
import ContentEditor from "../util/content-editor"
import CustomButton from "./custom-button"
import { baseEncode } from "../../../../../lib/utils"
import { BlockLinking, FeaturedGridProps, FeaturedItem } from "@/lib/types"

export default function FeaturedGrid({
    section
}: {
    section: FeaturedGridProps
}) {

    const {
        childBlocks,
        columnNumber,
        layoutType,
        textAlign,
        textColor,
        content,
        secondaryButton,
        primaryButton,
        imageHeight = "large"
    } = section || {}

    const gridClass = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columnNumber]

    const imageHeightClass = {
        small: "h-32",
        medium: "h-48",
        large: "h-64",
    }[imageHeight]

    const renderContent = (
        <div className="mb-12" style={{ color: textColor }}>
            <HeaderSection
                content={content}
                textAlign={textAlign}
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
            />
        </div>
    )

    const getLinkUrl = (blockLinking: BlockLinking | undefined) => {
        if (!blockLinking) return ""

        const { internalLink, externalUrl, internalPath } = blockLinking

        if (externalUrl) return externalUrl
        if (internalPath) return internalPath

        if (internalLink) {
            switch (internalLink._type) {
                case "pages":
                    return `/${internalLink.slug}`
                case "blog":
                case "legal":
                case "services":
                case "team":
                    return `/${internalLink._type}/${internalLink.slug}`
                default:
                    return ""
            }
        }

        return ""
    }

    const renderCard = (item: FeaturedItem, index: number) => {
        const linkUrl = getLinkUrl(item.blockLinking)

        switch (layoutType) {
            case "text-overlay":
                return (
                    <Card key={index} className="relative overflow-hidden h-64 group">
                        {item.image?.asset?.url && (
                            <Image
                                src={item.image?.asset?.url || "/placeholder.svg"}
                                alt={item.image?.asset?.altText}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                placeholder="blur"
                                blurDataURL={item?.image?.asset?.lqip ?? baseEncode}
                            />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-500 flex flex-col justify-end p-4">
                            <CardTitle className="text-white mb-2">
                                <h3 className="heading-font" style={{ color: item.headingColor?.hex }}>{item.heading}</h3>
                            </CardTitle>
                            {item?.content && (
                                <CardDescription className="text-white">
                                    <ContentEditor content={item?.content} />
                                </CardDescription>
                            )}
                            {linkUrl && (
                                <Link href={linkUrl} className="absolute inset-0"><span className="sr-only">view {item?.heading}</span></Link>
                            )}
                        </div>
                    </Card>
                )

            case "text-below":
                return (
                    <Card key={index}>
                        <div className={`relative ${imageHeightClass}`}>
                            <Image
                                src={item.image?.asset?.url || "/placeholder.svg"}
                                alt={item.image?.asset?.altText}
                                placeholder="blur"
                                blurDataURL={item?.image?.asset?.lqip ?? baseEncode}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>
                                <h3 className="text-2xl! mt-0!" style={{ color: item.headingColor?.hex }}>{item?.heading}</h3>
                            </CardTitle>
                            {item?.content && (
                                <CardDescription>
                                    <ContentEditor content={item?.content} />
                                </CardDescription>
                            )}
                        </CardHeader>
                        {linkUrl && (
                            <CardContent>
                                <CustomButton text={item.button?.text} link={linkUrl} variant="secondary" />
                            </CardContent>
                        )}
                    </Card>
                )

            case "text-only":
                return (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                <h3 className="text-2xl! mt-0!" style={{ color: item.headingColor?.hex }}>{item?.heading}</h3>
                            </CardTitle>
                            {item?.content && (
                                <CardDescription>
                                    <ContentEditor content={item?.content} />
                                </CardDescription>
                            )}
                        </CardHeader>
                        {linkUrl && item.button?.text && (
                            <CardContent>
                                <CustomButton text={item.button.text} link={linkUrl} variant="secondary" />
                            </CardContent>
                        )}
                    </Card>
                )

            case "image-only":
                return (
                    <Card key={index} className={`overflow-hidden relative ${imageHeightClass}`}>
                        <Image
                            src={item?.image?.asset?.url || "/placeholder.svg"}
                            alt={item?.image?.asset?.altText}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={item?.image?.asset?.lqip || baseEncode}
                        />
                    </Card>
                )

            default:
                return null
        }
    }

    return (
        <div>
            {content && renderContent}
            <div className={cn("grid gap-6", gridClass)}>
                {childBlocks?.map((item, index) => renderCard(item, index))}
            </div>
        </div>
    )
}
