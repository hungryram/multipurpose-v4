"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CalendarIcon, ArrowRight, Loader2 } from "lucide-react"
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
}

interface BlogCardProps {
    title: string
    slug: string
    date: string
    image?: string
    blurData?: string
    altText?: string
    excerpt?: string
}

export function BlogCard({ title, slug, date, image, blurData, altText, excerpt }: BlogCardProps) {
    return (
        <Link href={`/${slug}`} className="block h-full">
            <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
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
                <div className="px-4 pb-4">
                    <CardHeader className="space-y-2">
                        <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">{title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <time dateTime={date}>{date}</time>
                        </div>
                    </CardHeader>
                    {excerpt &&
                        <CardContent>
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
        </Link>
    )
}

function BlogGridSkeleton() {
    return (
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardHeader className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardHeader>
                    <CardFooter>
                        <Skeleton className="h-4 w-24" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

interface BlogPaginationProps {
    initialPosts: BlogPost[]
    postsLength: number
}

export default function BlogPaginationClient({ initialPosts, postsLength }: BlogPaginationProps) {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
    const [fetching, setFetching] = useState(false)
    const postToFetch = 6

    async function getNextSixPosts(id: number) {
        try {
            setFetching(true)
            const response = await fetch(`/api/blog?limit=${id}`)
            const data = await response.json()
            setPosts(data.blog)
        } catch (error) {
            console.error("error", error)
        } finally {
            setFetching(false)
        }
    }

    if (!posts && fetching) {
        return <BlogGridSkeleton />
    }

    return (
        <div className={cn("transition-opacity duration-300", fetching ? "opacity-50" : "opacity-100")}>
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
                        />
                    )
                })}
            </div>
            {postsLength > (posts?.length ?? 0) && (
                <div className="flex justify-center mt-8">
                    <Button
                        size="lg"
                        onClick={() => getNextSixPosts((posts?.length ?? 0) + postToFetch)}
                        disabled={fetching}
                        className="min-w-[150px]"
                    >
                        {fetching ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More"
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}

