"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { GalleryImage } from "@/lib/types"
import { baseEncode } from "../../../../../../lib/utils"

export default function GalleryMasonryClient({
  images,
}: {
  images: GalleryImage[]
}) {
  // This runs only on the client
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    // Generate random heights once on mount
    const randomHeights = images.map(() =>
      Math.floor(Math.random() * (800 - 400) + 400)
    )
    setHeights(randomHeights)
  }, [images])

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((image, index) => (
        <Card key={index} className="break-inside-avoid">
          <div className="relative">
            <Image
              src={image?.asset?.url || "/placeholder.svg"}
              alt={image?.asset?.altText || "Gallery Image"}
              width={500}
              height={heights[index] || 500} // fallback height until heights is set
              className="object-cover w-full rounded-lg"
              placeholder="blur"
              blurDataURL={image?.asset?.lqip ?? baseEncode}
            />
          </div>
        </Card>
      ))}
    </div>
  )
}
