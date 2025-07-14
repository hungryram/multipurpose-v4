"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { LogoImage } from "@/lib/types";
import Autoplay from "embla-carousel-autoplay"

const basisClassMap: Record<number, string> = {
    1: "md:basis-full",
    2: "md:basis-1/2",
    3: "md:basis-1/3",
    4: "md:basis-1/4",
    5: "md:basis-1/5",
}

export default function LogoCloudSlider({
    images,
    columnNumber = 4,
    autoplay,
    duration,
    autoplaySpeed
}: {
    images: LogoImage[];
    columnNumber?: number;
    duration?: number
    autoplay?: boolean
    autoplaySpeed?: number
}) {

    const plugin = React.useRef(
        Autoplay({ delay: autoplaySpeed || 3000, stopOnInteraction: true })
    )

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
                    <CarouselItem
                        key={index}
                        className={`md:basis-1/${columnNumber} items-center flex justify-center`}
                    >
                        <div className="flex items-center justify-center p-4">
                            <Image
                                src={image.asset.url || "/placeholder.svg"}
                                alt={image.asset.altText || `gallery ${index}`}
                                width={200}
                                height={48}
                                placeholder={image.asset.lqip ? "blur" : "empty"}
                                blurDataURL={image.asset.lqip}
                                className="max-w-full h-auto object-contain"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
                <CarouselPrevious className="relative !left-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
                <CarouselNext className="relative !right-0 top-5 cursor-pointer" variant={'ghost'} size={"lg"} />
            </div>
        </Carousel>
    );
}
