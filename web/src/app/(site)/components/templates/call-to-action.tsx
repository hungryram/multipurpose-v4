import Image from "next/image"
import HeaderSection from "../util/header-section"
import { cn } from "@/lib/utils"
import { CtaSectionProps } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"


export default function CtaSection({
  section
}: { section: CtaSectionProps }) {

  const {
    content,
    textAlign,
    primaryButton,
    secondaryButton,
    layoutType,
    imageData,
    reverseColumn,
    columnLayout = "half",
  } = section || {}

  const getColumnLayoutClasses = () => {
    switch (columnLayout) {
      case "half":
        return "lg:w-1/2"
      case "twoFifths":
        return "lg:w-2/5"
      case "oneThird":
        return "lg:w-1/3"
      case "oneFourth":
        return "lg:w-1/4"
      case "threeFifth":
        return "lg:w-3/5"
      case "twoThirds":
        return "lg:w-2/3"
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
      case "oneFourth":
        return "lg:w-3/4"
      case "threeFifth":
        return "lg:w-2/5"
      case "twoThirds":
        return "lg:w-1/3"
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

  if (layoutType === "text-image") {
    return (
      <div>
        <div className={cn("flex flex-col lg:flex-row items-center gap-8", { "lg:flex-row-reverse": reverseColumn })}>
          <div className={getColumnLayoutClasses()}>
            <Image
              src={imageData?.asset?.url || "/placeholder.svg"}
              alt={imageData?.asset?.altText || "CTA Image"}
              width={1920}
              height={1080}
              className="object-cover"
              placeholder="blur"
              blurDataURL={imageData?.asset?.lqip ?? baseEncode}
            />
          </div>
          <div className={getSecondColumnLayoutClasses()}>
            {renderContent}
          </div>
        </div>
      </div>
    )
  }

  if (layoutType === "banner") {
    return (
      <div>
        <div className={cn("mx-auto max-w-7xl px-6 sm:px-8")}>
          {renderContent}
        </div>
      </div>
    )
  }

  if (layoutType === "fullWidthTextImage") {
    return (
      <div className={cn("relative")}>
        <div
          className={cn(
            "relative h-96 overflow-hidden md:absolute md:h-full md:w-1/3 lg:w-1/2",
            reverseColumn ? "md:right-0" : "md:left-0",
          )}
        >
          <Image
            src={imageData?.asset?.url || "/placeholder.svg"}
            alt={imageData?.asset?.altText || "CTA Image"}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={imageData?.asset?.lqip ?? baseEncode}
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
    <div>
      {renderContent}
    </div>
  )
}

