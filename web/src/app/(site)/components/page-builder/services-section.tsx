import { ServiceListProps, Service } from "@/lib/types"
import { cn } from "@/lib/utils"
import HeaderSection from "../util/header-section"
import ServiceListGrid from "../templates/service-grid"
import BaseSlider from "../templates/client/gallery-slider-client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function ServiceList({
  services,
  section
}: {
  services: Service[],
  section: ServiceListProps
}) {
  const {
    layoutType = "grid",
    limit = 6,
    columnNumber = 3,
    content,
    textAlign,
    primaryButton,
    secondaryButton,
    textColor,
    slideNumber,
    autoplay
  } = section || {}

  const limitedServices = services.slice(0, limit)

  const slides = services.map((service) => (
    <Card key={service._id} className="h-full flex flex-col">
      <div className="relative h-60">
        <Image
          src={service?.imageData?.asset?.url || "/placeholder.svg"}
          alt={service?.imageData?.asset?.altText || service.title}
          fill
          className="object-cover"
          placeholder={service?.imageData?.asset?.lqip ? "blur" : "empty"}
          blurDataURL={service?.imageData?.asset?.lqip}
        />
      </div>
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{service.detail}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/services/${service.slug.current}`}>Learn More</Link>
      </CardFooter>
    </Card>
  ))

  return (
    <div>
      {content && (
        <div className="mb-12" style={{ color: textColor }}>
          <HeaderSection
            content={content}
            textAlign={textAlign}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
          />
        </div>
      )}
      <div className={cn("mx-auto", content && "mt-16")}>
        {layoutType === "grid" && (
          <ServiceListGrid services={limitedServices} columnNumber={columnNumber} />
        )}
        {layoutType === "carousel" && (
          <BaseSlider
            slides={slides}
            slideNumber={slideNumber}
            autoplay={autoplay}
            disableNavigation={false}
          />
        )}
      </div>
    </div>
  )
}
