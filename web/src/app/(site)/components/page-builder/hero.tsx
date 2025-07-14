import Image from "next/image"
import { cn } from "@/lib/utils"
import Breadcrumb from "../templates/breadcrumbs"
import HeaderSection from "../util/header-section"
import HeroCarousel from "../templates/client/hero-carousel"
import type { HeroProps } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"

export default function Hero({ section }: { section: HeroProps }) {
  if (!section) return null

  const {
    content,
    imageData,
    childImage,
    primaryButton,
    secondaryButton,
    textAlign,
    imageOverlayColor,
    layoutType,
    enableBreadcrumbs,
    heading,
    textColor,
    itemsEnd,
    imageHeight = "large",
  } = section || {}

  const getImageHeight = (h: "large" | "medium" | "small") =>
    h === "large" ? "min-h-screen"
      : h === "medium" ? "min-h-[80vh]"
        : h === "small" ? "min-h-[40vh]"
          : "min-h-[50vh]"

  const imageOverlay = {
    background: `rgba(${imageOverlayColor?.rgb?.r ?? "0"}, ${imageOverlayColor?.rgb?.g ?? "0"}, ${imageOverlayColor?.rgb?.b ?? "0"}, ${imageOverlayColor?.rgb?.a ?? "0"})`,
  }

  const renderImage = () => (
    <Image
      src={imageData?.asset?.url || "/placeholder.svg"}
      alt={imageData?.asset?.altText || "Hero Image"}
      placeholder={imageData?.asset?.lqip ? "blur" : "empty"}
      blurDataURL={imageData?.asset?.lqip || baseEncode}
      className="object-cover object-center"
      fill
      priority
    />
  )

  const renderContent = (
    <div style={{ color: textColor?.hex }} className="py-20">
      {enableBreadcrumbs && <Breadcrumb textAlign={textAlign ?? "center"} color={textColor} />}
      <HeaderSection content={content} textAlign={textAlign} primaryButton={primaryButton} secondaryButton={secondaryButton} />
      {heading && (
        <div className="text-center mt-4">
          <h1 className="text-4xl uppercase">{heading}</h1>
        </div>
      )}
    </div>
  )

  switch (layoutType) {
    case "sideBysideCarousel":
      return (
        <div className="relative w-full overflow-hidden">
          <HeroCarousel
            childImage={childImage}
            textColor={textColor}
            textAlign={textAlign}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
            imageHeight={imageHeight}
          />
        </div>
      )

    case "fullImageContainer":
      return (
        <Image
          src={imageData?.asset?.url || "/placeholder.svg"}
          alt={imageData?.asset?.altText || "Hero Image"}
          placeholder={imageData?.asset?.lqip ? "blur" : "empty"}
          blurDataURL={imageData?.asset?.lqip || baseEncode}
          className="object-cover object-center"
          width={2000}
          height={2000}
          sizes="100vw"
          priority
        />
      )
    case "fullWidthFullImage":
      return (
        <div>
          <Image
            src={imageData?.asset?.url || "/placeholder.svg"}
            alt={imageData?.asset?.altText || "Hero Image"}
            placeholder={imageData?.asset?.lqip ? "blur" : "empty"}
            blurDataURL={imageData?.asset?.lqip || baseEncode}
            width={2000}
            height={2000}
            sizes="100vw"
            className="w-full"
            priority
          />
        </div>

      )

    case "hero":
      return (
        <div className={cn("relative isolate flex justify-center overflow-hidden", itemsEnd ? "!items-end" : "flex-col", getImageHeight(imageHeight))}>
          {renderImage()}
          <div className="absolute inset-0" style={imageOverlay} aria-hidden="true"></div>
          <div className="container relative z-10">
            <div className={cn(textAlign === "left" && "md:w-1/2")}>
              <div className="md:py-32 py-60">
                {renderContent}
              </div>
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className={cn("relative isolate flex items-center", getImageHeight(imageHeight))}>
          {renderImage()}
          <div className="absolute inset-0" style={imageOverlay} aria-hidden="true"></div>
          <div className="container relative z-10">{renderContent}</div>
        </div>
      )
  }
}
