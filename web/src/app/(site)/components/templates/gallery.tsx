"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import HeaderSection from "./header-section"
import { cn } from "@/lib/utils"
import type { GallerySliderProps, GalleryImage } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"

const GalleryGrid = ({
  images,
  columns = 3,
  gap = "medium",
}: {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  gap?: "small" | "medium" | "large"
}) => {
  const gapClasses = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-8",
  }

  return (
    <div
      className={cn("grid", gapClasses[gap], {
        "grid-cols-1 sm:grid-cols-2": columns === 2,
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": columns === 3,
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4": columns === 4,
      })}
    >
      {images.map((image, index) => (
        <Card key={index}>
          <div className="relative h-60">
            <Image
              src={image?.asset?.url || "/placeholder.svg"}
              alt={image?.asset?.altText}
              fill={true}
              className="object-cover rounded-lg"
              placeholder="blur"
              blurDataURL={image?.asset?.lqip ?? baseEncode}
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

const GalleryMasonry = ({ images }: { images: GalleryImage[] }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((image, index) => (
        <Card key={index} className="break-inside-avoid">
          <div className="relative">
            <Image
              src={image?.asset?.url || "/placeholder.svg"}
              alt={image?.asset?.altText}
              width={500}
              height={Math.floor(Math.random() * (800 - 400) + 400)} // Random height for masonry effect
              className="object-cover w-full rounded-lg"
              placeholder="blur"
              blurDataURL={image?.asset?.lqip ?? baseEncode}
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

const GallerySlider = ({
  images,
  disableNavigation = true,
  slideNumber = 3,
  autoplay = false,
}: {
  images: GalleryImage[]
  disableNavigation?: boolean
  slideNumber?: number
  autoplay?: boolean
}) => {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={autoplay ? [plugin.current] : []}
      onMouseEnter={autoplay ? plugin.current.stop : undefined}
      onMouseLeave={autoplay ? plugin.current.reset : undefined}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className={`md:basis-1/${slideNumber}`}>
            <Card>
              <div className="relative h-80">
                <Image
                  src={image?.asset?.url || "/placeholder.svg"}
                  alt={image.asset?.altText}
                  fill={true}
                  className="object-cover rounded-lg"
                  placeholder="blur"
                  blurDataURL={image?.asset?.lqip ?? baseEncode}
                />
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {disableNavigation && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}

export default function Gallery({
  section
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
  } = section || {}

  const renderContent = content && content.length > 0 && (
    <div className="mb-12" style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  const renderGallery = () => {
    switch (layoutType) {
      case "grid":
        return <GalleryGrid images={childImage} columns={slideNumber} gap={gap} />
      case "masonry":
        return <GalleryMasonry images={childImage} />
      case "slider":
      default:
        return <GallerySlider images={childImage} disableNavigation={disableNavigation} slideNumber={slideNumber} autoplay={autoplay} />
    }
  }

  return (
    <div className="w-full overflow-hidden">
      {content && (
        renderContent
      )}
      {renderGallery()}
    </div>
  )
}

