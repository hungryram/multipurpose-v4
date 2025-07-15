import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import HeaderSection from "../util/header-section"
import { BlogSectionProps, BlogPost } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"
import BaseSlider from "../templates/client/gallery-slider-client"

export default function BlogSection({
  section,
  blog
}: { section: BlogSectionProps, blog: any }) {

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

    switch (layoutType) {
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
          <BaseSlider
            slides={limitedBlog.map((post) => renderBlogCard(post, false, false))}
            slideNumber={columnNumber}
          />
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
      <div className="relative h-60 w-full">
        {image && (
          <Image
            src={image || "/placeholder.svg"}
            alt={altText || title}
            fill
            className="object-cover"
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
          <CardContent className="px-2 grow">{date && <p className="text-sm text-gray-500">{date}</p>}</CardContent>
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
