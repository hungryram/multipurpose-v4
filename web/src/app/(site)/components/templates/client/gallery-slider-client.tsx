"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

type BaseSliderProps = {
  slides: React.ReactNode[]
  slideNumber?: number
  autoplay?: boolean
  autoplaySpeed?: number
  duration?: number
  disableNavigation?: boolean
}

const basisClassMap: Record<number, string> = {
  1: "md:basis-full",
  2: "md:basis-1/2",
  3: "md:basis-1/3",
  4: "md:basis-1/4",
  5: "md:basis-1/5",
}

export default function BaseSlider({
  slides,
  slideNumber = 3,
  autoplay = true,
  autoplaySpeed = 3000,
  duration = 50,
  disableNavigation = false,
}: BaseSliderProps) {
  const plugin = React.useRef(
    Autoplay({ delay: autoplaySpeed, stopOnInteraction: true })
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
        duration,
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className={basisClass}>
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      {!disableNavigation && (
        <div className="flex items-center md:justify-start justify-center gap-4 mt-8">
          <CarouselPrevious className="relative !left-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
          <CarouselNext className="relative !right-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
        </div>
      )}
    </Carousel>
  )
}
