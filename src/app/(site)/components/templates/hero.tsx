import Image from "next/image"
import { cn } from "../../../../../lib/utils"
import HeaderSection from "./header-section"
import { HeroProps } from "@/lib/types"

export default function Hero({
  content,
  image,
  altText,
  blurData,
  primaryButton,
  secondaryButton,
  textAlign,
  textColor,
  imageOverlayColor,
  layout,
  height
}: HeroProps) {


  const imageOverlay = {
    background: `rgba(${imageOverlayColor?.rgb?.r ?? "0"}, ${imageOverlayColor?.rgb?.g ?? "0"}, ${imageOverlayColor?.rgb?.b ?? "0"}, ${imageOverlayColor?.rgb?.a ?? "0.2"})`,
  }

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

  const renderImage = () => (
    <Image
      src={image || "/placeholder.svg"}
      alt={altText}
      placeholder={blurData ? "blur" : "empty"}
      blurDataURL={blurData}
      className="object-cover"
      fill={true}
      sizes="100vw"
      priority={true}
    />
  )

  const imageHeight = (height: "large" | "medium" | "small") => {
    switch (height) {
      case "large":
        return "py-96";
      case "medium":
        return "py-60";
      case "small":
        return "py-40";
      default:
        return "min-h-[50vh]"; // Default to small if no value is provided
    }
  };

  switch (layout) {
    case "hero":
      return (
        <div className={cn("relative isolate flex items-center", imageHeight(height))}>
          {renderImage()}
          <div className="absolute inset-0" style={imageOverlay} aria-hidden="true"></div>
          <div className="container relative z-10">{renderContent}</div>
        </div>
      )

    case "split":
      return (
        <div className={cn("flex flex-col lg:flex-row", imageHeight)}>
          <div className="w-full lg:w-1/2 relative">{renderImage()}</div>
          <div className="w-full lg:w-1/2 flex items-center bg-background p-8 lg:p-16">
            <div className="w-full">{renderContent}</div>
          </div>
        </div>
      )

    case "centered":
      return (
        <div className={cn("relative flex items-center justify-center", imageHeight(height))}>
          {renderImage()}
          <div className="absolute inset-0" style={imageOverlay} aria-hidden="true"></div>
          <div className="container relative z-10 text-center max-w-2xl mx-auto">{renderContent}</div>
        </div>
      )

    case "fullscreen":
      return (
        <div className="relative h-screen flex items-center justify-center">
          {renderImage()}
          <div className="absolute inset-0" style={imageOverlay} aria-hidden="true"></div>
          <div className="container relative z-10">{renderContent}</div>
        </div>
      )

    default:
      return (
        <div className={cn("relative isolate flex items-center", imageHeight(height))}>
          {renderImage()}
          <div className="absolute inset-0" style={imageOverlay} aria-hidden="true"></div>
          <div className="container relative z-10">{renderContent}</div>
        </div>
      )
  }
}

