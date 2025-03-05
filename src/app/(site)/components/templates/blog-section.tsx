"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import HeaderSection from "./header-section"
import { BlogSectionProps, BlogPost } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"


function BlogCard({
  title,
  slug,
  date,
  image,
  blurData,
  altText,
  hideTitle = false,
  hideContent = false
}: {
  title: string
  slug: string
  date?: string
  image?: string
  blurData?: string
  altText?: string
  hideTitle?: boolean
  hideContent?: boolean
}) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48">
        {image && (
          <Image
            src={image || "/placeholder.svg"}
            alt={altText || title}
            fill
            className="object-cover rounded-t-lg"
            placeholder={"blur"}
            blurDataURL={blurData || baseEncode}
          />
        )}
      </div>
      {!hideTitle && (
        <CardHeader className="px-2">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      {!hideContent && (
        <>
          <CardContent className="px-2 flex-grow">{date && <p className="text-sm text-gray-500">{date}</p>}</CardContent>
          <CardFooter className="px-2">
            <Link href={slug} className="text-primary hover:underline">
              Read More
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default function BlogSection({
  blog,
  content,
  textAlign,
  layout = "grid",
  columns = 3,
  primaryButton,
  textColor,
  secondaryButton,
  carouselSlidesPerView = 1,
  limit = 6,
}: BlogSectionProps) {


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

  const renderBlogCard = (post: BlogPost, hideTitle = false, hideContent = false) => {
    const parsedDate = parseISO(post.date)
    const postImage = post.imageData?.asset

    return (
      <BlogCard
        key={post._id}
        title={post.title}
        slug={`/blog/${post.slug.current}`}
        date={post.date ? format(parsedDate, "LLLL	d, yyyy") : undefined}
        image={postImage?.url}
        blurData={postImage?.lqip}
        altText={postImage?.altText}
        hideTitle={hideTitle}
        hideContent={hideContent}
      />
    )
  }

  const renderBlogPosts = () => {
    const limitedBlog = blog.slice(0, limit)

    switch (layout) {
      case "list":
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            {limitedBlog.map((post) => (
              <div key={post._id} className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">{renderBlogCard(post, true, true)}</div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug.current}`} className="text-primary hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      case "featured":
        return (
          <div className="space-y-16">
            {limitedBlog.map((post, index) => (
              <div
                key={post._id}
                className={cn("md:flex items-center", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}
              >
                <div className={cn("md:w-1/2", index % 2 === 0 ? "md:pr-8" : "md:pl-8")}>{renderBlogCard(post)}</div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                  <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                  {/* Add excerpt or additional content here */}
                  <Link href={`/blog/${post.slug.current}`} className="text-primary hover:underline">
                    Read More
                  </Link>
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
              {limitedBlog.map((post) => (
                <CarouselItem key={post._id} className={`md:basis-1/${carouselSlidesPerView}`}>
                  <div className="p-1">{renderBlogCard(post)}</div>
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
              "sm:grid-cols-2": columns === 2,
              "sm:grid-cols-3": columns === 3,
              "sm:grid-cols-4": columns === 4,
            })}
          >
            {limitedBlog.map((post) => (
              <div key={post._id}>{renderBlogCard(post)}</div>
            ))}
          </div>
        )
    }
  }

  return (
    <section>
      <div>
        {renderContent}
        <div className={cn("mx-auto", content && "mt-16")}>{renderBlogPosts()}</div>
      </div>
    </section>
  )
}

