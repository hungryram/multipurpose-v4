import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GalleryImage } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"

export default function GalleryGrid({
  images,
  columns = 3,
  gap = "medium",
}: {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  gap?: "small" | "medium" | "large"
}) {
  const gapClasses = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-8",
  }

  return (
    <div
      className={cn("grid", gapClasses[gap], {
        "grid-cols-1 sm:grid-cols-2": columns === 2,
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": columns === 3,
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4": columns === 4,
      })}
    >
      {images.map((image, index) => (
        <Card key={index}>
          <div className="relative h-60">
            <Image
              src={image?.asset?.url || "/placeholder.svg"}
              alt={image?.asset?.altText || "Gallery Image"}
              fill={true}
              className="object-cover rounded-lg"
              placeholder="blur"
              blurDataURL={image?.asset?.lqip ?? baseEncode}
            />
          </div>
        </Card>
      ))}
    </div>
  )
}
