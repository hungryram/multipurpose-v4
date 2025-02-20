"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import HeaderSection from "./header-section"

interface ButtonProps {
  text: string
  link: string
  style?: React.CSSProperties
}

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface GallerySliderProps {
  images: GalleryImage[]
  showArrows?: boolean
  showPagination?: boolean
  slidesToShow?: number
  textColor?: string
  effect?: "slide" | "fade"
  content?: any[]
  image?: string
  altText?: string
  blurData?: string
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  buttonLink?: any
  textAlign?: "left" | "center" | "right"
  autoplay?: boolean
}

export default function GallerySlider({
  images,
  showArrows = true,
  showPagination = true,
  slidesToShow = 3,
  effect = "slide",
  content,
  buttonLink,
  image,
  altText,
  blurData,
  textAlign = "left",
  primaryButton,
  secondaryButton,
  textColor = "black",
  autoplay = false,
}: GallerySliderProps) {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  const renderContent = content && content.length > 0 && (
    <div className="py-16" style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        buttonLink={buttonLink}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  return (
    <div className="section">
      <div className="w-full">
        {renderContent}
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]} 
          onMouseEnter={autoplay ? plugin.current.stop : undefined}
          onMouseLeave={autoplay ? plugin.current.reset : undefined}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className={`md:basis-1/${slidesToShow}`}>
                <div>
                  <Card>
                    <div className="relative w-full h-96">
                      <Image
                        src={image?.asset?.url || "/placeholder.svg"}
                        alt={image.alt}
                        fill={true}
                        className="object-cover"
                      />
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {showArrows && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </div>
    </div>
  )
}

