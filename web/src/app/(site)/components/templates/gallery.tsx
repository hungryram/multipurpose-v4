// ✅ SSR SERVER COMPONENT
import HeaderSection from "../util/header-section"
import StructuredData from "../util/structured-data"
import GalleryGrid from "./gallery-grid"
import GalleryMasonry from "../client/gallery-masonry"
import GallerySlider from "../client/gallery-slider-client"
import { GallerySliderProps } from "@/lib/types"

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
        <GallerySlider
          images={childImage}
          disableNavigation={disableNavigation}
          slideNumber={slideNumber}
          autoplay={autoplay}
          duration={duration}
          autoplaySpeed={autoplaySpeed}
        />
      )}
    </section>
  )
}
