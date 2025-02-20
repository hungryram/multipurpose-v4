"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import HeaderSection from "./header-section"

interface LogoCloudSectionProps {
  images: LogoImage[]
  content: any[]
  textAlign: "left" | "center" | "right"
  primaryButtonLink: string
  primaryButtonText: string
  primaryButtonStyle: React.CSSProperties
  secondaryButtonText: string
  secondaryButtonLink: string
  secondaryButtonStyle: React.CSSProperties
  backgroundStyles: React.CSSProperties
  paddingTop: string
  paddingBottom: string
  layout: "grid" | "slider" | "marquee"
  buttonLink: any
  secondaryButton?: ButtonProps
  textColor: string
  primaryButton: ButtonProps
  columns: 3 | 4 | 5 | 6
  slidesToShow: number
}

interface ButtonProps {
  text: string
  link: string
  style?: React.CSSProperties
}

interface LogoImage {
  asset: {
    url: string
    altText: string
    lqip: string
  }
}

export default function LogoCloudSection({
  images,
  content,
  textAlign,
  layout,
  buttonLink,
  primaryButton,
  textColor,
  secondaryButton,
  columns,
}: LogoCloudSectionProps) {


  const renderContent = (
    <div className="mb-12 content" style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        buttonLink={buttonLink}
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
    switch (layout) {
      case "slider":
        return (
          <Carousel
            className="w-full mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className={`md:basis-1/${columns} items-center flex justify-center`}>
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
              "grid-cols-3 sm:grid-cols-3": columns === 3,
              "grid-cols-2 sm:grid-cols-4": columns === 4,
              "grid-cols-3 sm:grid-cols-5": columns === 5,
              "grid-cols-3 sm:grid-cols-6": columns === 6,
            })}
          >
            {images.map((image, index) => renderLogo(image, index))}
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


