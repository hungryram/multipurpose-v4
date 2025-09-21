"use client"

import { format, parseISO } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CalendarIcon, ArrowRight } from "lucide-react"
import { baseEncode } from "../../../../lib/utils"

interface BlogPost {
    _id: string
    title: string
    slug: string
    date: string
    excerpt?: string
    imageData?: {
        asset?: {
            url?: string
            altText?: string
            lqip?: string
        }
    }
    categories?: Array<{
        title: string
        slug: string
        color?: string
    }>
}

interface BlogCardProps {
    title: string
    slug: string
    date: string
    image?: string
    blurData?: string
    altText?: string
    excerpt?: string
    categories?: Array<{
        title: string
        slug: string
        color?: string
    }>
}

export function BlogCard({ title, slug, date, image, blurData, altText, excerpt, categories }: BlogCardProps) {
    const handleCardClick = () => {
        window.location.href = `/${slug}`
    }

    return (
        <div onClick={handleCardClick} className="block h-full cursor-pointer">
            <Card className="group h-full overflow-hidden transition-all group">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={altText || title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        placeholder={blurData ? "blur" : "empty"}
                        blurDataURL={blurData ?? baseEncode}
                    />
                </div>
                <div className="pb-4">
                    {/* Categories - Now positioned above title */}
                    {categories && (
                        <div className="flex flex-wrap gap-1 pt-4 pb-0">
                            {categories?.map((category) => (
                                <Link 
                                    key={category.slug} 
                                    href={`/blog/category/${category.slug}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className={cn(
                                        "inline-flex items-center gap-1 rounded-full hover:bg-primary hover:text-white px-4 py-1 text-sm font-medium transition-colors hover:bg-opacity-80",
                                        category.color 
                                            ? `bg-[${category.color}]/10 text-[${category.color}] hover:bg-[${category.color}]/20` 
                                            : "bg-blue-100 text-[#144dde]"
                                    )}
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    )}
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-xl transition-colors group-hover:text-[#144dde]">
                            <h3>{title}</h3>
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <time dateTime={date}>{date}</time>
                        </div>
                    </CardHeader>
                    {excerpt &&
                        <CardContent className="!px-0 text-sm">
                            <p>{excerpt}</p>
                        </CardContent>
                    }
                    <CardFooter>
                        <span className="flex items-center gap-2 text-sm font-medium text-primary">
                            Read article <ArrowRight className="h-4 w-4" />
                        </span>
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}

interface BlogGridProps {
    posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
    return (
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts?.map((post) => {
                const parsedDate = parseISO(post.date)
                const postImage = post.imageData?.asset

                return (
                    <BlogCard
                        key={post._id}
                        title={post.title}
                        slug={`blog/${post.slug}`}
                        date={format(parsedDate, "LLLL d, yyyy")}
                        image={postImage?.url}
                        blurData={postImage?.lqip}
                        altText={postImage?.altText ?? post.title}
                        excerpt={post?.excerpt}
                        categories={post?.categories}
                    />
                )
            })}
        </div>
    )
}
