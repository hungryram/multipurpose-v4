"use client"

import type React from "react"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { Component, type ErrorInfo, type ReactNode } from "react"
import ContentSection from "./content-simple"

// Dynamically import sections for better performance
const Hero = dynamic(() => import("./hero"))
const CtaSection = dynamic(() => import("./call-to-action"))
const LeadFormSection = dynamic(() => import("./lead-form-section"))
const GallerySlider = dynamic(() => import("./gallery"))
const FeaturedGrid = dynamic(() => import("./feature-section"))
const TestimonialSection = dynamic(() => import("./testimonials-section"))
const TeamComponent = dynamic(() => import("./team-section"))
const LogoCloudSection = dynamic(() => import("./logo-cloud-section"))
const DisclosureSection = dynamic(() => import("./disclosure-section"))
const ServiceList = dynamic(() => import("./services-section"))
const BlogSection = dynamic(() => import("./blog-section"))

// Add these type definitions at the top of the file
export type HeroLayout = "hero" | "split" | "centered"
export type CTALayout = "full-width" | "banner" | "text-image" | "fullWidthTextImage"
export type BlogLayout = "grid" | "list" | "featured" | "carousel"
export type TestimonialLayout = "grid" | "slider" | "column"
export type TeamLayout = "grid" | "carousel" | "list"
export type ServiceLayout = "grid" | "list" | "featured" | "carousel"
export type GalleryLayout = "grid" | "slider" | "masonry"
export type FeatureLayout = "overlay" | "text-below" | "text-only" | "image-only"
export type LogoLayout = "grid" | "slider" | "marquee"
export type DisclosureLayout = "default" | "twoColumn" | "sidebar" | "tabbed" | "contentSide"
export type TextAlign = "left" | "center" | "right"
export type ColumnLayout = "half" | "twoFifths" | "oneThird"
export type ContentLayout = "simpleFullWidth" | "twoColumn" | "prose" | "article"
export type LeadForm = "twoColumn" | "stacked"

// Types
interface Background {
    backgroundType: "color" | "image"
    color?: { hex?: string }
    imageOverlayColor?: {
        rgb?: { r?: number; g?: number; b?: number; a?: number }
    }
}

interface ButtonStyle {
    buttonBackground?: {
        rgb?: { r?: number; g?: number; b?: number; a?: number }
    }
    buttonTextColor?: { hex?: string }
    buttonBorderColor?: { hex?: string }
}

interface ButtonLink {
    buttonText: string
    link: string
}

interface ButtonProps {
    text: string
    link: ButtonLink
    style: {
        backgroundColor: string
        color: string
        border: string
    }
}

// Update the BaseSection interface
interface BaseSection {
    _type: string
    _key?: string
    id?: string
    background?: {
        background: Background
        contentColor?: { hex?: string }
    }
    backgroundImage?: {
        image?: {
            asset?: {
                url: string
            }
        }
    }
    content?: any
    textAlign?: "left" | "center" | "right"
    textColor?: { hex?: string }
    paddingTop?: string
    paddingBottom?: string
    button?: ButtonStyle
    secondaryButton?: ButtonStyle
    buttonLinking?: ButtonLink
    secondButtonLinking?: ButtonLink
    layoutType: string
    imageData?: {
        asset?: {
            url: string
        }
    }
    // Add specific layout types based on section type
    layout?:
    | HeroLayout
    | CTALayout
    | BlogLayout
    | TestimonialLayout
    | TeamLayout
    | ServiceLayout
    | GalleryLayout
    | FeatureLayout
    | LogoLayout
    | DisclosureLayout
    | LeadForm
    [key: string]: any
}

interface PageBuilderProps {
    pageBuilder: BaseSection[]
    allTestimonials: any[]
    allServices: any[]
    allTeam: any[]
    allBlog: any[]
    email?: string
    phone_number?: string
    office_number?: string
    address?: string
    city?: string
    state?: string
    zip_code?: string
    facebook?: string
    youtube?: string
    instagram?: string
    twitter?: string
    reddit?: string
    linkedin?: string
    yelp?: string
    pinterest?: string
    tiktok?: string
    zillow?: string
}

// Simple Error Boundary Component
class SectionErrorBoundary extends Component<{ children: ReactNode; sectionName: string }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; sectionName: string }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Error in section ${this.props.sectionName}:`, error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-center">
                    <p className="text-red-500">Error loading {this.props.sectionName} section</p>
                    {/* <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
                    >
                        Try again
                    </button> */}
                </div>
            )
        }

        return this.props.children
    }
}

export default function PageBuilder({
    pageBuilder,
    allTestimonials,
    allTeam,
    allServices,
    allBlog,
    ...props
}: PageBuilderProps) {
    // Utility function for background styles
    const getBackgroundStyles = useCallback(
        (
            bg?: Background,
            textColor?: string,
            paddingTop?: string,
            paddingBottom?: string,
            backgroundImageUrl?: string,
        ): React.CSSProperties => {
            const styles: React.CSSProperties = {
                color: textColor,
                backgroundColor: bg?.backgroundType === "color" ? bg.color?.hex : undefined,
                backgroundPosition: "center",
                backgroundSize: "cover",
                paddingTop: paddingTop || "5rem",
                paddingBottom: paddingBottom || "5rem",
            }

            if (bg?.backgroundType === "image" && backgroundImageUrl) {
                const overlayColor = bg.imageOverlayColor?.rgb
                const overlayGradient = `rgba(${overlayColor?.r ?? 0}, ${overlayColor?.g ?? 0}, ${overlayColor?.b ?? 0}, ${overlayColor?.a ?? 0})`
                styles.backgroundImage = `linear-gradient(${overlayGradient}, ${overlayGradient}), url(${backgroundImageUrl})`
            }

            return styles
        },
        [],
    )

    // Utility function for button styles
    const getButtonStyles = useCallback((buttonStyle?: ButtonStyle) => {
        if (!buttonStyle?.buttonBackground?.rgb) return {}

        const { r = 0, g = 0, b = 0, a = 1 } = buttonStyle.buttonBackground.rgb

        return {
            backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
            color: buttonStyle.buttonTextColor?.hex ?? "#000000",
            border: `1px solid ${buttonStyle.buttonBorderColor?.hex ?? "transparent"}`,
        }
    }, [])

    const getButtonProps = useCallback(
        (section: BaseSection): ButtonProps | undefined => {
            if (!section.buttonLinking) return undefined

            return {
                text: section.buttonLinking.buttonText,
                link: section.buttonLinking,
                style: getButtonStyles(section.button),
            }
        },
        [getButtonStyles],
    )

    const getSecondaryButtonProps = useCallback(
        (section: BaseSection): ButtonProps | undefined => {
            if (!section.secondButtonLinking) return undefined

            return {
                text: section.secondButtonLinking.buttonText,
                link: section.secondButtonLinking,
                style: getButtonStyles(section.secondaryButton),
            }
        },
        [getButtonStyles],
    )


    // Update the renderSection function to handle specific layouts
    const renderSection = useCallback(
        (section: BaseSection) => {
            // Special cases for full-width sections


            const commonProps = {
                content: section.content,
                textAlign: section.textAlign as "left" | "center" | "right",
                primaryButton: getButtonProps(section),
                secondaryButton: getSecondaryButtonProps(section),
            }


            if (section._type === "hero") {
                return (
                    <Hero
                        image={section.imageData?.asset?.url}
                        layout={section.layoutType as HeroLayout}
                        height={section?.imageHeight}
                        images={section.childImage}
                        textColor={section?.textColor?.hex}
                        backgroundColor={section?.backgroundColor?.hex}
                        imageOverlayColor={section?.imageOverlayColor}
                        {...commonProps}
                    />
                )
            }

            if (section._type === "ctaSection") {
                return (
                    <CtaSection
                        layout={section.layoutType as CTALayout}
                        image={section.imageData?.asset?.url}
                        altText={section?.props?.altText}
                        reverseColumn={section.reverseColumn}
                        columnLayout={section.columnLayout}
                        subtitle={section.subtitle}
                        {...commonProps}
                    />
                )
            }


            switch (section._type) {
                case "blogDisplay":
                    return (
                        <BlogSection
                            blog={allBlog}
                            columns={section?.columnNumber}
                            limit={section?.limit}
                            layout={section.layoutType as BlogLayout}
                            {...commonProps}
                        />
                    )
                case "leadForm":
                    return (
                        <LeadFormSection
                            formSchema={section.formBuilder}
                            layout={section?.layoutType as LeadForm}
                            alignContent={section?.alignContentCenter}
                            labelColor={section?.labelColor?.hex}
                            formContent={section?.formContent}
                            formBackgroundColor={section?.formBackgroundColor?.hex}
                            {...commonProps}
                        />
                    )
                case "testimonialBuilder":
                    return (
                        <TestimonialSection
                            testimonials={allTestimonials}
                            layout={section.layoutType as TestimonialLayout}
                            slidesToShow={section?.slideNumber}
                            {...commonProps}
                        />
                    )
                case "teamDisplay":
                    return (
                        <TeamComponent
                            team={allTeam}
                            layout={section.layoutType as TeamLayout}
                            limit={section?.limit}
                            columns={section?.columnNumber}
                            {...commonProps}
                        />
                    )
                case "contentField":
                    return (
                        <ContentSection
                            layout={section.layoutType as ContentLayout}
                            heading={section?.heading}
                            maxWidth={section?.maxWidth}
                            columnGap={section?.columnGap}
                            {...commonProps}
                        />
                    )
                case "servicesDisplay":
                    return (
                        <ServiceList
                            services={allServices}
                            layout={section.layoutType as ServiceLayout}
                            limit={section?.limit}
                            columns={section?.columnNumber}
                            {...commonProps}
                        />
                    )
                case "gallery":
                    return (
                        <GallerySlider
                            images={section.childImage}
                            layout={section.layoutType as GalleryLayout}
                            showArrows={true}
                            showPagination={true}
                            slidesToShow={2}
                            effect="fade"
                            {...commonProps}
                        />
                    )
                case "featuredGrid":
                    return (
                        <FeaturedGrid
                            blocks={section.childBlocks}
                            layout={section.layoutType as FeatureLayout}
                            columns={section?.columnNumber}
                            imageHeight={section?.imageHeight}
                            {...commonProps}
                        />
                    )
                case "logos":
                    return (
                        <LogoCloudSection
                            images={section?.childImage}
                            columns={section?.columnNumber}
                            layout={section.layoutType as LogoLayout}
                            {...commonProps}
                        />
                    )
                case "codeBlock":
                    return (
                        <div dangerouslySetInnerHTML={{
                            __html: section?.code
                        }} />
                    )
                case "disclosureSection":
                    return (
                        <DisclosureSection
                            disclosure={section?.disclosures}
                            disclosureBackgroundColor={section?.disclosureBackgroundColor}
                            disclosureTextColor={section?.disclosureTextColor}
                            disclosureContentColor={section?.disclosureContentColor}
                            layout={section.layoutType as DisclosureLayout}
                            {...commonProps}
                        />
                    )
                default:
                    return null
            }
        },
        [getButtonProps, getSecondaryButtonProps, allTestimonials, allTeam, allServices, allBlog],
    )

    return (
        <>
            {pageBuilder?.map((section) => {
                const backgroundStyles = getBackgroundStyles(
                    section.background?.background,
                    section.background?.contentColor?.hex,
                    section.paddingTop,
                    section.paddingBottom,
                    section.backgroundImage?.image?.asset?.url,
                )

                // Special case for full-width sections
                if (section._type === "hero" && section.layoutType === "hero" || section.layoutType === "sideBysideCarousel") {
                    return (
                        <SectionErrorBoundary key={section._key || section.id} sectionName={section._type}>
                            {renderSection(section)}
                        </SectionErrorBoundary>
                    )
                }

                if (section._type === "ctaSection" && section.layoutType === "fullWidthTextImage") {
                    return (
                        <SectionErrorBoundary key={section._key || section.id} sectionName={section._type}>
                            <section
                                className={cn("w-full", {
                                    "bg-cover bg-center": section.background?.background.backgroundType === "image",
                                })}
                                style={backgroundStyles}
                            >
                                {renderSection(section)}
                            </section>
                        </SectionErrorBoundary>
                    )
                }

                // Regular sections with container
                return (
                    <SectionErrorBoundary key={section._key || section.id} sectionName={section._type}>
                        <section
                            className={cn("w-full", {
                                "bg-cover bg-center": section.background?.background.backgroundType === "image",
                            })}
                            style={backgroundStyles}
                        >
                            <div className="container">{renderSection(section)}</div>
                        </section>
                    </SectionErrorBoundary>
                )
            })}
        </>
    )
}

