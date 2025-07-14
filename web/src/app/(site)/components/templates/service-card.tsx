// ServiceCard.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Service } from "@/lib/types"

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-60">
        <Image
          src={service?.imageData?.asset?.url || "/placeholder.svg"}
          alt={service?.imageData?.asset?.altText || service.title}
          fill
          className="object-cover"
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
          <Link href={`/services/${service.slug.current}`}>Learn More</Link>
      </CardFooter>
    </Card>
  )
}
