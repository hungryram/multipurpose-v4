import type React from "react"
import classNames from "classnames"
import HeaderSection from "./header-section"
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
    content,
    layout,
    textColor,
    textAlign = "left",
    maxWidth = "7xl",
    columnGap = "lg",
    className,
    primaryButton,
    secondaryButton,
}: ContentSectionProps) {
    const containerClass = classNames(
        "mx-auto",
        maxWidthClasses[maxWidth],
        {
            "md:columns-2": layout === "twoColumn",
            [columnGapClasses[columnGap]]: layout === "twoColumn",
            "prose prose-gray dark:prose-invert": layout === "prose" || layout === "article",
            "max-w-3xl": layout === "article",
        },
        className,
    )

    const contentClass = classNames(
        "prose prose-gray dark:prose-invert",
        {
            "max-w-none": layout === "twoColumn",
            "mx-auto": layout === "centered",
        },
        textAlign && `text-${textAlign}`,
    )

    const renderContent = (
        <div className="py-16" style={{ color: textColor }}>
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

