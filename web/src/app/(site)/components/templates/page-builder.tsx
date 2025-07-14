import { useCallback } from "react"
import { cn } from "@/lib/utils"
import SectionErrorBoundary from "../client/section-error-boundary"

// Import sections normally (SSR-friendly)
import Hero from "./hero"
import CtaSection from "./call-to-action"
import ContentSection from "./content-simple"
import LeadFormSection from "./lead-form-section"
import Gallery from "./gallery"
import FeaturedGrid from "./feature-section"
import TestimonialSection from "./testimonials-section"
import TeamComponent from "./team-section"
import LogoCloudSection from "./logo-cloud-section"
import DisclosureSection from "./disclosure-section"
import ServiceList from "./services-section"
import BlogSection from "./blog-section"

import {
  Background,
  BaseSection,
  ButtonProps,
  ButtonStyle,
  PageBuilderProps
} from "@/lib/types"

export default function PageBuilder({
  pageBuilder,
  allTestimonials,
  allTeam,
  allServices,
  allBlog,
}: PageBuilderProps) {

  // Button styling
  const getButtonStyles = useCallback((buttonStyle?: ButtonStyle) => {
    if (!buttonStyle?.buttonBackground?.rgb) return {}
    const { r = 0, g = 0, b = 0, a = 1 } = buttonStyle.buttonBackground.rgb
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
      color: buttonStyle.buttonTextColor?.hex ?? "#000",
      border: `1px solid ${buttonStyle.buttonBorderColor?.hex ?? "transparent"}`
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
    }, [getButtonStyles])

  const getSecondaryButtonProps = useCallback(
    (section: BaseSection): ButtonProps | undefined => {
      if (!section.secondButtonLinking) return undefined
      return {
        text: section.secondButtonLinking.buttonText,
        link: section.secondButtonLinking,
        style: getButtonStyles(section.secondaryButton),
      }
    }, [getButtonStyles])

  const getBackgroundStyles = useCallback(
    (
      bg?: Background,
      textColor?: string,
      paddingTop?: string,
      paddingBottom?: string,
      backgroundImageUrl?: string
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
    }, [])

  const builderData = (section: BaseSection) => ({
    ...section,
    primaryButton: getButtonProps(section),
    secondaryButton: getSecondaryButtonProps(section),
  })

  const renderSection = useCallback(
    (section: BaseSection) => {
      switch (section._type) {
        case "hero":
          return <Hero section={builderData(section)} />
        case "ctaSection":
          return <CtaSection section={builderData(section)} />
        case "blogDisplay":
          return <BlogSection section={builderData(section)} blog={allBlog} />
        case "leadForm":
          return <LeadFormSection section={builderData(section)} />
        case "testimonialBuilder":
          return <TestimonialSection section={builderData(section)} testimonials={allTestimonials} />
        case "teamDisplay":
          return <TeamComponent section={builderData(section)} team={allTeam} />
        case "contentField":
          return <ContentSection section={builderData(section)} />
        case "servicesDisplay":
          return <ServiceList services={allServices} section={builderData(section)} />
        case "gallery":
          return <Gallery section={builderData(section)} />
        case "featuredGrid":
          return <FeaturedGrid section={builderData(section)} />
        case "logos":
          return <LogoCloudSection section={builderData(section)} />
        case "codeBlock":
          return <div dangerouslySetInnerHTML={{ __html: section?.code }} />
        case "disclosureSection":
          return <DisclosureSection section={builderData(section)} />
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

        const isFullWidth = (
          (section._type === "hero" && section.layoutType === "hero") ||
          section.layoutType === "sideBysideCarousel" ||
          (section._type === "ctaSection" && section.layoutType === "fullWidthTextImage")
        )

        return (
          <SectionErrorBoundary key={section._key || section.id} sectionName={section._type}>
            <section
              className={cn("w-full", {
                "bg-cover bg-center": section.background?.background.backgroundType === "image",
              })}
              style={backgroundStyles}
              id={`${section._type}-${section._key}`}
            >
              {isFullWidth ? (
                renderSection(section)
              ) : (
                <div className="container">
                  {renderSection(section)}
                </div>
              )}
            </section>
          </SectionErrorBoundary>
        )
      })}
    </>
  )
}
