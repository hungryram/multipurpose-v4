import type React from "react"
import { cn } from "@/lib/utils"
import HeaderSection from "../util/header-section"
import { ContentSectionProps } from "@/lib/types"


const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
}

const columnGapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
}

export default function ContentSection({
    section
}: {
    section: ContentSectionProps
}) {

    const {
        content,
        layoutType,
        textColor,
        textAlign = "left",
        maxWidth = "7xl",
        columnGap = "lg",
        className,
        primaryButton,
        secondaryButton,
    } = section || {}

    const containerClass = cn(
        "mx-auto",
        maxWidthClasses[maxWidth],
        {
            "md:columns-2": layoutType === "twoColumn",
            [columnGapClasses[columnGap]]: layoutType === "twoColumn",
            "prose prose-gray dark:prose-invert": layoutType === "prose" || layoutType === "article",
            "max-w-3xl": layoutType === "article",
        },
        className,
    )

    const contentClass = cn(
        "prose prose-gray dark:prose-invert",
        {
            "max-w-none": layoutType === "twoColumn",
            "mx-auto": layoutType === "centered",
        },
        textAlign && `text-${textAlign}`,
    )

    const renderContent = (
        <div style={{ color: textColor }}>
            <HeaderSection
                content={content}
                textAlign={textAlign}
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
            />
        </div>
    )

    return (
        <div className={containerClass}>
            <div className={contentClass}>
                {renderContent}
            </div>
        </div>
    )
}

