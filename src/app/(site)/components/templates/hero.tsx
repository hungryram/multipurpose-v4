"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import HeaderSection from "./header-section"
import { useState, useEffect } from "react"
import type { HeroProps } from "@/lib/types"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"

export default function Hero({
  content,
  image,
  images,
  altText,
  blurData,
  primaryButton,
  secondaryButton,
  textAlign,
  backgroundColor,
  textColor,
  imageOverlayColor,
  layout,
  height,
  backgroundImage,
}: HeroProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Set up autoplay
  useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 6500) // Change slide every 6.5 seconds

    return () => clearInterval(interval)
  }, [api])

  const imageOverlay = {
    background: `rgba(${imageOverlayColor?.rgb?.r ?? "0"}, ${imageOverlayColor?.rgb?.g ?? "0"}, ${imageOverlayColor?.rgb?.b ?? "0"}, ${imageOverlayColor?.rgb?.a ?? "0"})`,
  }

  const renderContent = (
    <div style={{ color: textColor }}>
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

  const getCarouselHeight = (height: "large" | "medium" | "small") => {
    switch (height) {
      case "large":
        return "min-h-[800px]"
      case "medium":
        return "md:min-h-[600px] md:pt-56 pt-40 md:pb-32 pb-10"
      case "small":
        return "min-h-[400px]"
      default:
        return "min-h-[600px]"
    }
  }

  const renderCarousel = () => (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent className={cn(getCarouselHeight(height))}>
        {images.map((slide : any, index: number) => (
          <CarouselItem key={slide._key} className="h-full">
            <div className="grid md:grid-cols-12 h-full items-center gap-8">
              <div className="md:col-span-5">
                <div style={{ color: textColor }}>
                  <HeaderSection
                    content={slide.content}
                    textAlign={textAlign}
                    primaryButton={primaryButton}
                    secondaryButton={secondaryButton}
                  />
                </div>
              </div>
              <div className="md:col-span-7 relative">
                <div className={cn("relative", getCarouselHeight(height))}>
                  <Image
                    src={slide.asset.url || "/placeholder.svg"}
                    alt={slide.asset.altText || "Slide image"}
                    placeholder={slide.asset.lqip ? "blur" : "empty"}
                    blurDataURL={slide.asset.lqip}
                    className="object-contain"
                    fill={true}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {count > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-500",
                current === index ? "bg-primary w-6" : "bg-primary/50 hover:bg-primary/75",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Carousel>
  )

  const imageHeight = (height: "large" | "medium" | "small") => {
    switch (height) {
      case "large":
        return "py-96"
      case "medium":
        return "py-60"
      case "small":
        return "py-40"
      default:
        return "min-h-[50vh]"
    }
  }

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

    case "sideBysideCarousel":
      return (
        <div
          className={cn("relative w-full overflow-hidden")}
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {
                  backgroundColor,
                }
          }
        >
          <div className="container relative z-10">{renderCarousel()}</div>
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

