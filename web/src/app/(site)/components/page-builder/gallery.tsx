import HeaderSection from "../util/header-section"
import GalleryGrid from "../templates/gallery-grid"
import GalleryMasonry from "../templates/client/gallery-masonry"
import { GallerySliderProps } from "@/lib/types"
import BaseSlider from "../templates/client/gallery-slider-client"
import Image from "next/image"
import { baseEncode } from "../../../../../lib/utils"
import { Card } from "@/components/ui/card"

export default function GallerySection({
  section,
}: {
  section: GallerySliderProps
}) {
  const {
    childImage,
    disableNavigation = true,
    slideNumber = 3,
    content,
    textAlign = "left",
    primaryButton,
    secondaryButton,
    textColor = "black",
    autoplay = false,
    layoutType = "slider",
    columns = 3,
    gap = "medium",
    duration,
    autoplaySpeed
  } = section || {}

    const slides = childImage.map((image) => (
    <Card key={image._key}>
      <div className="relative h-80">
        <Image
          src={image?.asset?.url || "/placeholder.svg"}
          alt={image.asset?.altText || "Gallery Slide"}
          fill
          className="object-cover rounded-lg"
          placeholder="blur"
          blurDataURL={image?.asset?.lqip ?? baseEncode}
        />
      </div>
    </Card>
  ))

  return (
    <section className="w-full overflow-hidden">
      {content && (
        <div className="mb-12" style={{ color: textColor }}>
          <HeaderSection
            content={content}
            textAlign={textAlign}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
          />
        </div>
      )}

      {layoutType === "grid" && (
        <GalleryGrid images={childImage} columns={columns} gap={gap} />
      )}

      {layoutType === "masonry" && (
        <GalleryMasonry images={childImage} />
      )}

      {layoutType === "slider" && (
        <BaseSlider
          slides={slides}
          slideNumber={slideNumber}
          autoplay={autoplay}
          autoplaySpeed={autoplaySpeed}
          duration={duration}
          disableNavigation={disableNavigation}
        />
      )}
    </section>
  )
}
