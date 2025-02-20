import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import HeaderSection from "./header-section"
import ContentEditor from "../util/content-editor"
import { baseEncode } from "../../../../../lib/utils"
import CustomButton from "./CustomButton"

interface BlockLinking {
    internalLink?: {
        _type: "pages" | "blog" | "legal" | "services" | "team"
        slug: string
    }
    externalUrl?: string
}

interface FeaturedItem {
    heading: string
    content?: any
    image?: {
        src: string
        alt: string
        asset?: {
            url: string
            altText: string
            lqip?: string
        }
    }
    blockLinking?: BlockLinking
    button?: {
        text?: string
    }
}

interface ButtonProps {
    text: string
    link: string
    style?: React.CSSProperties
}

type CardLayout = "overlay" | "text-below" | "text-only" | "image-only"

interface FeaturedGridProps {
    blocks: FeaturedItem[]
    columns: 1 | 2 | 3 | 4
    layout: "grid" | "masonry"
    cardLayout: CardLayout
    content: any[]
    buttonLink?: any
    image: string
    textColor: string
    textAlign: "left" | "center" | "right"
    altText: string
    blurData?: string
    primaryButton?: ButtonProps
    secondaryButton?: ButtonProps
    imageHeight?: 'small' | 'medium' | 'large'
}

const FeaturedGrid: React.FC<FeaturedGridProps> = ({
    blocks,
    columns,
    layout,
    cardLayout,
    textAlign,
    textColor,
    content,
    buttonLink,
    secondaryButton,
    primaryButton,
    imageHeight = 'large'
}) => {

    const gridClass = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns]

    const imageHeightClass = {
        small: "h-32",
        medium: "h-48",
        large: "h-64",
    }[imageHeight]

    const renderContent = (
        <div className="py-16" style={{ color: textColor }}>
            <HeaderSection
                content={content}
                textAlign={textAlign}
                buttonLink={buttonLink}
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
            />
        </div>
    )

    const getLinkUrl = (blockLinking: BlockLinking | undefined) => {
        if (!blockLinking) return ""

        const { internalLink, externalUrl } = blockLinking

        if (externalUrl) return externalUrl

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

        switch (cardLayout) {
            case "overlay":
                return (
                    <Card key={index} className="relative overflow-hidden h-64">
                        {item.image && (
                            <Image src={item.image.src || "/placeholder.svg"} alt={item.image.alt} fill className="object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                            <CardTitle className="text-white mb-2">{item.heading}</CardTitle>
                            {item?.content && (
                                <CardDescription className="text-white text-sm">
                                    <ContentEditor content={item?.content} />
                                </CardDescription>
                            )}
                            {linkUrl && item.button.text && <CustomButton text={item.button?.text} link={linkUrl} variant="secondary" />}
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
                                className="object-cover rounded-t-lg"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{item.heading}</CardTitle>
                            {item?.content && (
                                <CardDescription>
                                    <ContentEditor content={item?.content} />
                                </CardDescription>
                            )}
                        </CardHeader>
                        {linkUrl && item.button.text &&
                            <CardContent>
                                <CustomButton text={item.button?.text} link={linkUrl} variant="secondary" />
                            </CardContent>
                        }
                    </Card>
                )
            case "text-only":
                return (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{item.heading}</CardTitle>
                            {item?.content && (
                                <CardDescription>
                                    <ContentEditor content={item?.content} />
                                </CardDescription>
                            )}
                        </CardHeader>
                        {linkUrl && item.button.text &&
                            <CardContent>
                                <CustomButton text={item.button?.text} link={linkUrl} variant="secondary" />
                            </CardContent>
                        }
                    </Card>
                )
            case "image-only":
                return (
                    <Card key={index} className={`overflow-hidden relative ${imageHeightClass}`}>
                        <Image src={item?.image?.asset?.url || "/placeholder.svg"} alt={item?.image?.asset?.url} fill className="object-cover" placeholder="blur" blurDataURL={item?.image?.asset?.lqip || baseEncode} />
                    </Card>
                )
            default:
                return null
        }
    }

    return (
        <div>
            {renderContent}
            <div className={cn("grid gap-6", gridClass, layout === "masonry" && "masonry")}>
                {blocks?.map((item, index) => renderCard(item, index))}
            </div>
        </div>
    )
}

export default FeaturedGrid

