"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import HeaderSection from "./header-section"
import { ServiceListProps, Service } from "@/lib/types"


export default function ServiceList({
  services,
  section
}: {
  services: any,
  section: ServiceListProps
}) {

  const {
    content,
    textAlign,
    layoutType = "grid",
    columnNumber = 3,
    primaryButton,
    textColor,
    secondaryButton,
    limit = 6,
  } = section || {}

  const renderContent = (
    <div className="mb-16 content" style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  const renderServiceCard = (service: Service) => (
    <Card key={service._id} className="h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={service?.imageData?.asset?.url || "/placeholder.svg"}
          alt={service?.imageData?.asset?.altText || service.title}
          fill
          className="object-cover rounded-t-lg"
          placeholder={service.imageData?.asset?.lqip ? "blur" : "empty"}
          blurDataURL={service.imageData?.asset?.lqip}
        />
      </div>
      <CardHeader className="px-2">
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 grow">
        <p className="line-clamp-3">{service.detail}</p>
      </CardContent>
      <CardFooter className="px-2">
        <Button asChild>
          <Link href={`/services/${service.slug.current}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )

  const renderServices = () => {
    const limitedServices = services.slice(0, limit)
    switch (layoutType) {
      case "list":
        return (
          <div className="space-y-8">
            {limitedServices.map((service) => (
              <Card key={service._id}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={service.imageData?.asset?.url || "/placeholder.svg"}
                        alt={service.imageData?.asset?.altText || service.title}
                        fill
                        className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        placeholder={service.imageData?.asset?.lqip ? "blur" : "empty"}
                        blurDataURL={service?.imageData?.asset?.lqip}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{service.detail}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild>
                        <Link href={`/services/${service.slug.current}`}>Learn More</Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )
      case "featured":
        return (
          <div className="space-y-16">
            {limitedServices.map((service, index) => (
              <div
                key={service._id}
                className={cn("md:flex items-center", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}
              >
                <div className={cn("md:w-1/2", index % 2 === 0 ? "md:pr-8" : "md:pl-8")}>
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={service?.imageData?.asset?.url || "/placeholder.svg"}
                      alt={service?.imageData?.asset?.altText || service.title}
                      fill
                      className="object-cover rounded-lg"
                      placeholder={service?.imageData?.asset?.lqip ? "blur" : "empty"}
                      blurDataURL={service?.imageData?.asset?.lqip}
                    />
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="mb-6">{service.detail}</p>
                  <Button asChild>
                    <Link href={`/services/${service.slug.current}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      case "carousel":
        return (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto"
          >
            <CarouselContent>
              {limitedServices.map((service) => (
                <CarouselItem key={service._id} className={`md:basis-1/${columnNumber}`}>
                  <div className="p-1">{renderServiceCard(service)}</div>
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
              "sm:grid-cols-2": columnNumber === 2,
              "sm:grid-cols-3": columnNumber === 3,
              "sm:grid-cols-4": columnNumber === 4,
            })}
          >
            {limitedServices.map((service) => renderServiceCard(service))}
          </div>
        )
    }
  }

  return (
    <div>
      {renderContent}
      <div className={cn("mx-auto", content && "mt-16")}>{renderServices()}</div>
    </div>
  )
}

