import Image from "next/image"
import HeaderSection from "./header-section"
import { cn } from "@/lib/utils"
import { CtaSectionProps } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"


export default function CtaSection({
  content,
  textAlign,
  primaryButton,
  secondaryButton,
  layout,
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

  const style = {
    backgroundColor: backgroundColor
  }

  if (layout === "text-image") {
    return (
      <div>
        <div className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className={cn("flex flex-col lg:flex-row items-center gap-8", { "lg:flex-row-reverse": reverseColumn })}>
            <div className={getColumnLayoutClasses()}>
              <Image
                src={image || "/placeholder.svg"}
                alt={altText || "CTA Image"}
                width={800}
                height={600}
                className="object-cover"
                placeholder="blur"
                blurDataURL={baseEncode}
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
      <div>
        <div className={cn("mx-auto max-w-7xl px-6 sm:px-8")}>
          <div>
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
            "relative h-96 overflow-hidden md:absolute md:h-full md:w-1/3 lg:w-1/2",
            reverseColumn ? "md:right-0" : "md:left-0",
          )}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={altText || "CTA Image"}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={baseEncode}
          />
        </div>
        <div className="relative mx-auto py-24 sm:py-32 lg:px-8 lg:py-52">
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
    <div className={cn("py-24 sm:py-32", backgroundColor)}>
      <div className="px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {renderContent}
        </div>
      </div>
    </div>
  )
}

