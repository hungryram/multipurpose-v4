"use client"

import type React from "react"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { Component, type ErrorInfo, type ReactNode } from "react"
import {
    Background,
    BaseSection,
    ButtonProps,
    ButtonStyle,

    PageBuilderProps
} from "@/lib/types"

// Dynamically import sections for better performance
const Hero = dynamic(() => import("./hero"))
const CtaSection = dynamic(() => import("./call-to-action"))
const ContentSection = dynamic(() => import("./content-simple"))
const LeadFormSection = dynamic(() => import("./lead-form-section"))
const Gallery = dynamic(() => import("./gallery"))
const FeaturedGrid = dynamic(() => import("./feature-section"))
const TestimonialSection = dynamic(() => import("./testimonials-section"))
const TeamComponent = dynamic(() => import("./team-section"))
const LogoCloudSection = dynamic(() => import("./logo-cloud-section"))
const DisclosureSection = dynamic(() => import("./disclosure-section"))
const ServiceList = dynamic(() => import("./services-section"))
const BlogSection = dynamic(() => import("./blog-section"))

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
}: PageBuilderProps) {

    const builderData = (section: BaseSection) => ({
        ...section,
        primaryButton: getButtonProps(section),
        secondaryButton: getSecondaryButtonProps(section),
    })


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

            switch (section._type) {
                case "hero":
                    return (
                        <Hero
                            section={builderData(section)}
                        />
                    )
                case "ctaSection":
                    return (
                        <CtaSection
                            section={builderData(section)}
                        />
                    )
                case "blogDisplay":
                    return (
                        <BlogSection
                            section={builderData(section)}
                            blog={allBlog}
                        />
                    )
                case "leadForm":
                    return (
                        <LeadFormSection
                            section={builderData(section)}
                        />
                    )
                case "testimonialBuilder":
                    return (
                        <TestimonialSection
                            section={builderData(section)}
                            testimonials={allTestimonials}
                        />
                    )
                case "teamDisplay":
                    return (
                        <TeamComponent
                            section={builderData(section)}
                            team={allTeam}
                        />
                    )
                case "contentField":
                    return (
                        <ContentSection
                            section={builderData(section)}
                        />
                    )
                case "servicesDisplay":
                    return (
                        <ServiceList
                            services={allServices}
                            section={builderData(section)}
                        />
                    )
                case "gallery":
                    return (
                        <Gallery
                            section={builderData(section)}
                        />
                    )
                case "featuredGrid":
                    return (
                        <FeaturedGrid
                            section={builderData(section)}
                        />
                    )
                case "logos":
                    return (
                        <LogoCloudSection
                            section={builderData(section)}
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
                            section={builderData(section)}
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
                if (section._type === "hero" && section.layoutType === "hero" || section.layoutType === "sideBysideCarousel" || section._type === "ctaSection" && section.layoutType === "fullWidthTextImage") {
                    return (
                        <SectionErrorBoundary key={section._key || section.id} sectionName={section._type}>
                            <section
                                className={cn("w-full", {
                                    "bg-cover bg-center": section.background?.background.backgroundType === "image",
                                })}
                                style={backgroundStyles}
                                id={section?._type + '-' + section._key}
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
                            id={section?._type + '-' + section._key}
                        >
                            <div className="container">
                                {renderSection(section)}
                            </div>
                        </section>
                    </SectionErrorBoundary>
                )
            })}
        </>
    )
}

