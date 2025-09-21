import { getAllPages, getBlog } from "../../../../../lib/groq-data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import slugify from "slugify";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import ShareSocial from "../../components/templates/share-social";
import ContentEditor from "../../components/util/content-editor";
import Breadcrumb from "../../components/templates/breadcrumbs";
import { baseEncode } from "../../../../../lib/utils";
import { generatePageMetadata } from "../../components/util/generateMetaData";
import type { Metadata } from "next";
import { PageParams } from "@/lib/types";
import { client } from "../../../../../lib/sanity";
import { Suspense } from "react";

// Enhanced type definitions
interface ContentBlock {
    _type: string;
    style?: string;
    children?: Array<{ text: string; _key?: string }>;
    _key: string;
}

interface Author {
    name?: string;
    bio?: string;
    avatar?: {
        asset?: {
            url: string;
            altText?: string;
        };
    };
}

interface BlogPost {
    title: string;
    slug: string;
    date: string;
    _updatedAt?: string;
    content: ContentBlock[];
    author?: Author;
    imageData?: {
        asset?: {
            url: string;
            altText?: string;
            width?: number;
            height?: number;
            lqip?: string;
        };
    };
    seo?: {
        meta_description?: string;
    };
}

export const revalidate = 300; // Reduced from 60 to 5 minutes for better cache efficiency

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const param = await params;

    return generatePageMetadata({
        slug: param.slug,
        fetcher: getBlog,
        mainKey: "blog",
        type: 'blog'
    });
}

export async function generateStaticParams() {
    try {
        const { blog } = await client.fetch(getAllPages);
        return blog.map((post: { slug: string }) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Utility function to calculate reading time
function calculateReadingTime(content: ContentBlock[]): number {
    const wordsPerMinute = 200;
    const totalWords = content.reduce((count, block) => {
        if (block._type === "block" && block.children) {
            const blockText = block.children.map(child => child.text || '').join(' ');
            return count + blockText.split(/\s+/).length;
        }
        return count;
    }, 0);
    
    return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

// Generate table of contents from content (h2 headings only)
function generateTableOfContents(content: ContentBlock[]) {
    return content
        .filter((block): block is ContentBlock & { style: string; children: NonNullable<ContentBlock['children']> } => 
            block._type === "block" && 
            block.style === "h2" &&
            Boolean(block.children?.length)
        )
        .map(block => {
            // Extract all text from all children (handles links and other inline elements)
            const text = block.children
                .map(child => child.text || '')
                .join('')
                .trim();
            const id = slugify(text, { lower: true, strict: true });
            return {
                id,
                text,
                _key: block._key
            };
        })
        .filter(item => item.text.length > 0); // Filter out empty headings
}

// Table of Contents Component
function TableOfContents({ items }: { items: ReturnType<typeof generateTableOfContents> }) {
    if (items.length === 0) {
        return (
            <Card className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
                <CardHeader>
                    <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No headings found</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
            <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
                <nav aria-label="Article table of contents">
                    <ul className="space-y-1 list-none p-0">
                        {items.map((item) => (
                            <li key={item._key}>
                                <Link
                                    href={`#${item.id}`}
                                    className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1"
                                    aria-label={`Jump to section: ${item.text}`}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </CardContent>
        </Card>
    );
}

// Author Component
function AuthorInfo({ author }: { author?: Author }) {
    if (!author?.name) return null;

    const avatar = author.avatar?.asset;

    return (
        <div className="flex items-center gap-x-2">
            {avatar?.url ? (
                <Image
                    src={avatar.url}
                    alt={avatar.altText || `${author.name}'s profile picture`}
                    width={24}
                    height={24}
                    className="rounded-full ring-1 ring-border"
                    placeholder="blur"
                    blurDataURL={baseEncode}
                />
            ) : (
                <UserIcon className="w-6 h-6 text-muted-foreground" />
            )}
            <span className="font-medium">{author.name}</span>
            {author.bio && (
                <span className="sr-only">{author.bio}</span>
            )}
        </div>
    );
}

// Article Metadata Component
function ArticleMetadata({ 
    post, 
    readingTime 
}: { 
    post: { blog: BlogPost }, 
    readingTime: number 
}) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-8">
            <AuthorInfo author={post.blog.author} />
            
            <div className="flex items-center gap-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{readingTime} min read</span>
            </div>
            
            <time 
                dateTime={post.blog.date} 
                className="flex items-center gap-x-1"
                title={`Published on ${format(parseISO(post.blog.date), "PPPP")}`}
            >
                <CalendarIcon className="w-4 h-4" />
                <span>Published {format(parseISO(post.blog.date), "MMM d, yyyy")}</span>
            </time>
            
            {post.blog._updatedAt && post.blog._updatedAt !== post.blog.date && (
                <time 
                    dateTime={post.blog._updatedAt}
                    className="flex items-center gap-x-1"
                    title={`Last updated on ${format(parseISO(post.blog._updatedAt), "PPPP")}`}
                >
                    <span className="font-semibold">Updated:</span>
                    <span>{format(parseISO(post.blog._updatedAt), "MMM d, yyyy")}</span>
                </time>
            )}
        </div>
    );
}

export default async function BlogPost({ params }: PageParams) {
    const param = await params;
    const slug = param.slug;

    let post;
    try {
        post = await getBlog(slug);
    } catch (error) {
        console.error(`Error fetching blog post with slug "${slug}":`, error);
        notFound();
    }

    if (!post?.blog) {
        notFound();
    }

    const postImage = post.blog.imageData?.asset;
    const readingTime = calculateReadingTime(post.blog.content);
    const tableOfContents = generateTableOfContents(post.blog.content);
    const currentDate = new Date().toISOString();

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.blog.title || "",
        description: post.blog.seo?.meta_description || "",
        datePublished: post.blog.date || currentDate,
        dateModified: post.blog._updatedAt || post.blog.date || currentDate,
        inLanguage: "en-us",
        wordCount: post.blog.content.reduce((count, block) => {
            if (block._type === "block" && block.children) {
                const blockText = block.children.map(child => child.text || '').join(' ');
                return count + blockText.split(/\s+/).length;
            }
            return count;
        }, 0),
        timeRequired: `PT${readingTime}M`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${post.profileSettings?.settings?.websiteName || ''}/blog/${post.blog.slug}`,
        },
        url: `${post.profileSettings?.settings?.websiteName || ''}/blog/${post.blog.slug}`,
        author: {
            "@type": "Person",
            name: post.blog.author?.name || "Anonymous",
            ...(post.blog.author?.bio && { description: post.blog.author.bio }),
            ...(post.blog.author?.avatar?.asset?.url && { 
                image: {
                    "@type": "ImageObject",
                    url: post.blog.author.avatar.asset.url
                }
            }),
        },
        publisher: {
            "@type": "Organization",
            name: post.profileSettings?.company_name || "Blog Publisher",
        },
        ...(postImage?.url && {
            image: {
                "@type": "ImageObject",
                url: postImage.url,
                width: postImage.width || 1200,
                height: postImage.height || 628,
                ...(postImage.altText && { caption: postImage.altText }),
            },
        }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            
            {/* Skip to content link for accessibility */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
            >
                Skip to content
            </a>
            
            <div className="pt-40 pb-20">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-16 lg:grid-cols-4">
                    <aside 
                        className="lg:col-span-1 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto md:block hidden"
                        aria-label="Article navigation"
                    >
                        <Suspense fallback={
                            <Card className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
                                <CardHeader>
                                    <CardTitle>Loading...</CardTitle>
                                </CardHeader>
                            </Card>
                        }>
                            <TableOfContents items={tableOfContents} />
                        </Suspense>
                    </aside>

                    <main className="lg:col-span-3 container" id="main-content">
                        <article 
                            className="prose prose-gray dark:prose-invert max-w-none"
                            itemScope 
                            itemType="https://schema.org/BlogPosting"
                        >
                            <Breadcrumb />
                            
                            <header>
                                <h1 
                                    className="font-heading mt-6 text-4xl font-bold lg:text-5xl"
                                    itemProp="headline"
                                >
                                    {post.blog.title}
                                </h1>
                                
                                <ArticleMetadata post={post} readingTime={readingTime} />
                            </header>

                            {postImage?.url && (
                                <div className="my-10">
                                    <Image
                                        src={postImage.url}
                                        alt={postImage.altText || post.blog.title}
                                        className="rounded-lg shadow-lg"
                                        placeholder={postImage.lqip ? "blur" : "empty"}
                                        blurDataURL={postImage.lqip || baseEncode}
                                        width={postImage.width || 900}
                                        height={postImage.height || 600}
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                                        itemProp="image"
                                    />
                                    {postImage.altText && (
                                        <figcaption className="text-sm text-muted-foreground text-center mt-2">
                                            {postImage.altText}
                                        </figcaption>
                                    )}
                                </div>
                            )}

                            <div className="mt-8 blogArticle" itemProp="articleBody">
                                <ContentEditor content={post.blog.content} />
                            </div>

                            <Separator className="my-8" />

                            <footer className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <ShareSocial
                                    url={`${post.profileSettings?.settings?.websiteName || ''}/blog/${post.blog.slug}`}
                                    title={post.blog.title}
                                />
                                
                                <div className="text-xs text-muted-foreground">
                                    <time dateTime={post.blog._updatedAt || post.blog.date}>
                                        Last updated: {format(parseISO(post.blog._updatedAt || post.blog.date), "PPP")}
                                    </time>
                                </div>
                            </footer>
                        </article>
                    </main>
                </div>
            </div>
        </>
    );
}