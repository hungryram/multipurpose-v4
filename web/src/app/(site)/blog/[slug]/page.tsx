import { getBlog } from "../../../../../lib/groq-data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import slugify from "slugify";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import ShareSocial from "../../components/templates/share-social";
import ContentEditor from "../../components/util/content-editor";
import Breadcrumb from "../../components/templates/breadcrumbs";
import { baseEncode } from "../../../../../lib/utils";
import { generatePageMetadata } from "../../components/util/generateMetaData";
import type { Metadata } from "next";
import { PageParams } from "@/lib/types";



export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const param = await params;

  return generatePageMetadata({
    slug: param.slug,
    fetcher: getBlog,
    mainKey: "blog",
    type: 'blog'
  });
}


export default async function BlogPost({ params }: PageParams) {
    const param = await params;
    const slug = param.slug;

    const post = await getBlog(slug);

    if (!post?.blog) {
        notFound();
    }

    const postImage = post.blog.imageData?.asset;
    const avatar = post.blog.author?.avatar?.asset;

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.blog.title || "",
        description: post.blog.seo?.meta_description || "",
        datePublished: post.blog.date || "2025-01-01",
        dateModified: post.blog._updatedAt || post.blog.date || "2025-01-01",
        inLanguage: "en-us",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${post.profileSettings?.settings?.websiteName}/blog/${post.blog.slug}`,
        },
        url: `${post.profileSettings?.settings?.websiteName}/blog/${post.blog.slug}`,
        author: {
            "@type": "Person",
            name: post.blog.author?.name || "Anonymous",
            description: post.blog.author?.bio,
            image: avatar?.url,
        },
        publisher: {
            "@type": "Organization",
            name: post.profileSettings?.company_name || "",
        },
        image: {
            "@type": "ImageObject",
            url: postImage?.url || "",
            width: postImage?.width || 1200,
            height: postImage?.height || 628,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className="pt-40 pb-20">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-16 lg:grid-cols-4">
                    <aside className="lg:col-span-1 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
                        <Card className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
                            <CardHeader>
                                <CardTitle>Table of Contents</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <nav className="space-y-1">
                                    {post.blog.content.map((block: any) => {
                                        if (block._type === "block" && block.style === "h2") {
                                            const id = slugify(block.children[0].text).toLowerCase();
                                            return (
                                                <Link
                                                    key={id}
                                                    href={`#${id}`}
                                                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    {block.children[0].text}
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    <main className="lg:col-span-3 container">
                        <article className="prose prose-gray dark:prose-invert max-w-none">
                            <Breadcrumb />
                            <h1 className="font-heading mt-6 text-4xl font-bold lg:text-5xl">
                                {post.blog.title}
                            </h1>
                            <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
                                <time dateTime={post.blog.date} className="flex items-center mt-4">
                                    <CalendarIcon className="mr-1 h-4 w-4" />
                                    {format(parseISO(post.blog.date), "LLLL d, yyyy")}
                                </time>
                                {post.blog.author?.name && (
                                    <>
                                        <Separator orientation="vertical" className="h-4" />
                                        <div className="flex items-center gap-x-2">
                                            {avatar?.url && (
                                                <Image
                                                    src={avatar.url}
                                                    alt={avatar.altText ?? post.blog.author.name}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                    placeholder="blur"
                                                    blurDataURL={baseEncode}
                                                />
                                            )}
                                            <span>{post.blog.author.name}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <Image
                                src={postImage?.url ?? "/placeholder.svg"}
                                alt={postImage?.altText ?? post.blog.title}
                                className="my-10"
                                placeholder={postImage?.lqip ? "blur" : "empty"}
                                blurDataURL={postImage?.lqip}
                                width={900}
                                height={900}
                                priority
                            />

                            <div className="mt-8">
                                <ContentEditor content={post.blog.content} />
                            </div>

                            <footer className="mt-8 flex items-center justify-between">
                                <ShareSocial
                                    url={`${post.profileSettings?.settings?.websiteName}/blog/${post.blog.slug}`}
                                />
                            </footer>
                        </article>
                    </main>
                </div>
            </div>
        </>
    );
}
