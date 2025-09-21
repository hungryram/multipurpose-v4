import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCategoryPosts, getAllCategories } from "../../../../../../lib/groq-data"
import { BlogCard } from "../../../blog/blog-pagination"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Tag } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
}

// Generate static params for all categories
export async function generateStaticParams() {
    const categories = await getAllCategories()

    return categories?.map((category: any) => ({
        slug: category.slug,
    })) || []
}

// GENERATES SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params
    const data = await getCategoryPosts(slug)

    if (!data || !data.category) {
        return {
            title: 'Category Not Found',
            description: 'The requested category could not be found.'
        }
    }

    const category = data.category
    const baseUrl = data.profileSettings?.settings?.websiteName || ''

    return {
        title: category.seo?.title_tag || `${category.title} - Blog Category`,
        description: category.seo?.meta_description || category.description || `Browse all posts in the ${category.title} category`,
        alternates: {
            canonical: `${baseUrl}/blog/category/${slug}`,
        },
        robots: {
            index: !category.seo?.noIndex,
            follow: true,
        },
        openGraph: {
            title: category.seo?.title_tag || `${category.title} - Blog Category`,
            description: category.seo?.meta_description || category.description || `Browse all posts in the ${category.title} category`,
            url: `${baseUrl}/blog/category/${slug}`,
            type: 'website',
            ...(category.imageData?.asset?.url && {
                images: [
                    {
                        url: category.imageData.asset.url,
                        alt: category.imageData.altText || category.title,
                    }
                ]
            })
        },
        twitter: {
            card: 'summary_large_image',
            title: category.seo?.title_tag || `${category.title} - Blog Category`,
            description: category.seo?.meta_description || category.description || `Browse all posts in the ${category.title} category`,
            ...(category.imageData?.asset?.url && {
                images: [category.imageData.asset.url]
            })
        }
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const data = await getCategoryPosts(slug)

    if (!data || !data.category) {
        notFound()
    }

    const { category, posts, profileSettings } = data
    const baseUrl = profileSettings?.settings?.websiteName || ''

    // Schema markup for category page
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: category.title,
        url: `${baseUrl}/blog/category/${slug}`,
        description: category.description,
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: posts?.length || 0,
            itemListElement: posts?.map((post: any, index: number) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "BlogPosting",
                    headline: post.title,
                    url: `${baseUrl}/blog/${post.slug}`,
                    datePublished: post.date,
                    description: post.excerpt || post.seo?.meta_description,
                    image: post.imageData?.asset?.url,
                    author: {
                        "@type": "Person",
                        name: post.author?.name,
                    },
                }
            })) || []
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: baseUrl
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: `${baseUrl}/blog`
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: category.title,
                    item: `${baseUrl}/blog/category/${slug}`
                }
            ]
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />

            {/* Category Header */}
            <div className="bg-primary py-12">
                <div className="container py-16 lg:px-8 lg:py-24">
                    {/* Breadcrumb */}
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/blog" className="hover:text-gray-700 dark:hover:text-gray-300">
                                    Blog
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-gray-900 dark:text-gray-100" aria-current="page">
                                {category.title}
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            {/* Category Badge */}
                            <div className="mb-4">
                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
                                        category.color
                                            ? `bg-[${category.color}]/10 text-[${category.color}]`
                                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    )}
                                >
                                    <Tag className="h-3 w-3" />
                                    Category
                                </span>
                            </div>

                            {/* Category Title */}
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                                {category.title}
                            </h1>

                            {/* Category Description */}
                            {category.description && (
                                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                                    {category.description}
                                </p>
                            )}

                            {/* Posts Count */}
                            <div className="mt-6 flex items-center gap-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    {posts?.length || 0} {posts?.length === 1 ? 'post' : 'posts'} in this category
                                </p>
                            </div>
                            <div className="mt-5">
                                <Link href="/blog">
                                    <Button variant="secondary" size="sm">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Blog
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Category Image */}
                        {category.imageData?.asset?.url && (
                            <div className="mt-8 lg:mt-0 lg:ml-8">
                                <div className="relative h-48 w-full lg:h-64 lg:w-80 rounded-2xl overflow-hidden">
                                    <Image
                                        src={category.imageData.asset.url}
                                        alt={category.imageData.altText || category.title}
                                        fill
                                        className="object-cover"
                                        placeholder={category.imageData.lqip ? "blur" : "empty"}
                                        blurDataURL={category.imageData.lqip}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="py-16 lg:py-24">
                <div className="container">
                    {posts && posts.length > 0 ? (
                        <>
                            <h2 className="sr-only">Posts in {category.title}</h2>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post: any) => (
                                    <BlogCard
                                        key={post._id}
                                        title={post.title}
                                        slug={`blog/${post.slug}`}
                                        date={format(parseISO(post.date), "LLLL d, yyyy")}
                                        image={post.imageData?.asset?.url}
                                        blurData={post.imageData?.lqip}
                                        altText={post.imageData?.altText}
                                        excerpt={post.excerpt}
                                    />
                                ))}
                            </div>
                        </>

                    ) : (
                        <div className="text-center py-12">
                            <Tag className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                No posts yet
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                There are no posts in the {category.title} category yet. Check back later!
                            </p>
                            <div className="mt-6">
                                <Link href="/blog">
                                    <Button variant={'primary'}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Browse All Posts
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
