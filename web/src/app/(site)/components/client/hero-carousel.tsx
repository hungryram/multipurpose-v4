"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import HeaderSection from "../util/header-section"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"
import { baseEncode } from "../../../../../lib/utils"

export default function HeroCarousel({
    childImage,
    textColor,
    textAlign,
    primaryButton,
    secondaryButton,
    imageHeight = "large",
}: {
    childImage: any[]
    textColor?: any
    textAlign?: string
    primaryButton?: any
    secondaryButton?: any
    imageHeight?: "large" | "medium" | "small"
}) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) return
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())
        api.on("select", () => setCurrent(api.selectedScrollSnap()))
    }, [api])

    useEffect(() => {
        if (!api) return
        const interval = setInterval(() => api.scrollNext(), 6500)
        return () => clearInterval(interval)
    }, [api])

    const getCarouselHeight = (h: "large" | "medium" | "small") =>
        h === "large" ? "md:min-h-screen h-96"
            : h === "medium" ? "min-h-[80vh]"
                : h === "small" ? "min-h-[40vh]"
                    : "min-h-[50vh]"

    return (
        <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="w-full">
            <CarouselContent className={cn(getCarouselHeight(imageHeight))}>
                {childImage.map((slide, index) => (
                    <CarouselItem key={slide._key} className="h-full">
                        <div className="grid grid-cols-1 md:grid-cols-12 h-full items-center gap-8 gap-y-8">
                            <div
                                className="w-full md:col-span-5 text-center md:text-left"
                                style={{ color: textColor }}
                            >
                                <HeaderSection
                                    content={slide.content}
                                    textAlign={textAlign}
                                    primaryButton={primaryButton}
                                    secondaryButton={secondaryButton}
                                />
                            </div>
                            <div className="w-full md:col-span-7 relative">
                                <div className={cn("relative", getCarouselHeight(imageHeight))}>
                                    <Image
                                        src={slide.asset.url || "/placeholder.svg"}
                                        alt={slide.asset.altText || "Slide image"}
                                        placeholder={slide.asset.lqip ? "blur" : "empty"}
                                        blurDataURL={slide.asset.lqip ?? baseEncode}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </CarouselItem>

                ))}
            </CarouselContent>

            {count > 1 && (
                <div className="flex items-center justify-start gap-4 mt-8 absolute bottom-20">
                    <CarouselPrevious className="relative !left-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
                    <CarouselNext className="relative !right-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
                </div>
            )}
        </Carousel>
    )
}
