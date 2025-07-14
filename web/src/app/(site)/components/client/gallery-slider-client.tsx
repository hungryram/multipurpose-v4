"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { GalleryImage } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"

const basisClassMap: Record<number, string> = {
  1: "md:basis-full",
  2: "md:basis-1/2",
  3: "md:basis-1/3",
  4: "md:basis-1/4",
  5: "md:basis-1/5",
}

export default function GallerySlider({
  images,
  disableNavigation = true,
  slideNumber = 3,
  autoplay,
  duration,
  autoplaySpeed
}: {
  images: GalleryImage[]
  disableNavigation?: boolean
  slideNumber?: number
  duration?: number
  autoplay?: boolean
  autoplaySpeed?: number
}) {

  console.log(autoplay)
  const plugin = React.useRef(
    Autoplay({ delay: autoplaySpeed || 3000, stopOnInteraction: true })
  )

  const basisClass = basisClassMap[slideNumber] || "md:basis-1/3"

  return (
    <Carousel
      plugins={autoplay ? [plugin.current] : []}
      onMouseEnter={autoplay ? plugin.current.stop : undefined}
      onMouseLeave={autoplay ? plugin.current.reset : undefined}
      opts={{
        align: "start",
        loop: true,
        duration: duration || 50
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className={basisClass}>
            <Card>
              <div className="relative h-80">
                <Image
                  src={image?.asset?.url || "/placeholder.svg"}
                  alt={image.asset?.altText || "Gallery Slide"}
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
      {!disableNavigation && (
        <div className="flex items-center justify-start gap-4 mt-8">
          <CarouselPrevious className="relative !left-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
          <CarouselNext className="relative !right-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
        </div>
      )}
    </Carousel>
  )
}
