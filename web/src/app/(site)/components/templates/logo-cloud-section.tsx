"use client"

import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import HeaderSection from "../util/header-section"
import { LogoCloudSectionProps, LogoImage } from "@/lib/types"



export default function LogoCloudSection({
  section
}: {
  section: LogoCloudSectionProps
}) {

  const {
    childImage,
    content,
    textAlign,
    layoutType,
    primaryButton,
    textColor,
    secondaryButton,
    columnNumber,
  } = section || {}

  const renderContent = (
    <div className="mb-12 content" style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  const renderLogo = (image: LogoImage, index: number) => (
    <div key={index} className="flex items-center justify-center p-4">
      <Image
        src={image.asset.url || "/placeholder.svg"}
        alt={image.asset.altText}
        width={200}
        height={48}
        placeholder={image.asset.lqip ? "blur" : "empty"}
        blurDataURL={image.asset.lqip}
        className="max-w-full h-auto object-contain"
      />
    </div>
  )

  const renderLogos = () => {
    switch (layoutType) {
      case "slider":
        return (
          <Carousel
            className="w-full mx-auto overflow-hidden"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {childImage.map((image, index) => (
                <CarouselItem key={index} className={`md:basis-1/${columnNumber} items-center flex justify-center`}>
                  {renderLogo(image, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )
      case "grid":
      default:
        return (
          <div
            className={cn("grid gap-8", {
              "grid-cols-3 sm:grid-cols-3": columnNumber === 3,
              "grid-cols-2 sm:grid-cols-4": columnNumber === 4,
              "grid-cols-3 sm:grid-cols-5": columnNumber === 5,
              "grid-cols-3 sm:grid-cols-6": columnNumber === 6,
            })}
          >
            {childImage.map((image, index) => renderLogo(image, index))}
          </div>
        )
    }
  }

  return (
    <section>
      <div>
        {renderContent}
        <div className={cn("mx-auto", content && "mt-10")}>{renderLogos()}</div>
      </div>
    </section>
  )
}


