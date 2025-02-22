import Image from "next/image"
import HeaderSection from "./header-section"
import { cn } from "@/lib/utils"
import { CtaSectionProps } from "@/lib/types"


export default function CtaSection({
  content,
  textAlign,
  primaryButton,
  secondaryButton,
  layout,
  style,
  image,
  altText,
  reverseColumn,
  columnLayout = "half",
  subtitle,
  backgroundColor,
}: CtaSectionProps) {
  const getColumnLayoutClasses = () => {
    switch (columnLayout) {
      case "half":
        return "lg:w-1/2"
      case "twoFifths":
        return "lg:w-2/5"
      case "oneThird":
        return "lg:w-1/3"
      default:
        return "lg:w-1/2"
    }
  }

  const getSecondColumnLayoutClasses = () => {
    switch (columnLayout) {
      case "half":
        return "lg:w-1/2"
      case "twoFifths":
        return "lg:w-3/5"
      case "oneThird":
        return "lg:w-2/3"
      default:
        return "lg:w-1/2"
    }
  }

  const renderContent = (
    <HeaderSection
      content={content}
      textAlign={textAlign}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    />
  )

  if (layout === "text-image") {
    return (
      <div style={style}>
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {subtitle && (
            <div className="w-full border-b border-gray-200 pb-1 mb-8">
              <h5 className="uppercase text-gray-600">{subtitle}</h5>
            </div>
          )}
          <div className={cn("flex flex-col lg:flex-row items-center gap-8", { "lg:flex-row-reverse": reverseColumn })}>
            <div className={getColumnLayoutClasses()}>
              <Image
                src={image || "/placeholder.svg"}
                alt={altText || "CTA Image"}
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
            <div className={getSecondColumnLayoutClasses()}>
              {renderContent}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (layout === "banner") {
    return (
      <div className={cn("", { "py-12 sm:py-16": layout === "banner" })} style={style}>
        <div className={cn("mx-auto max-w-7xl px-6 sm:px-8")}>
          <div className={cn("px-6 py-16 sm:px-8 sm:py-24")}>
            {renderContent}
          </div>
        </div>
      </div>
    )
  }

  if (layout === "fullWidthTextImage") {
    return (
      <div className={cn("relative", backgroundColor)} style={style}>
        <div
          className={cn(
            "relative h-80 overflow-hidden md:absolute md:h-full md:w-1/3 lg:w-1/2",
            reverseColumn ? "md:right-0" : "md:left-0",
          )}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={altText || "CTA Image"}
            layout="fill"
            objectFit="cover"
            className="mix-blend-multiply saturate-0"
          />
        </div>
        <div className="relative mx-auto py-24 sm:py-32 lg:px-8 lg:py-40">
          <div
            className={cn(
              "pl-6 pr-6 md:w-2/3 lg:w-1/2 lg:pr-0 xl:pl-32",
              reverseColumn ? "md:mr-auto md:pr-16 lg:pr-24" : "md:ml-auto md:pl-16 lg:pl-24",
            )}
          >
            {renderContent}
          </div>
        </div>
      </div>
    )
  }

  // Default to full-width layout
  return (
    <div className={cn("py-24 sm:py-32", backgroundColor)} style={style}>
      <div className="px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {renderContent}
        </div>
      </div>
    </div>
  )
}

