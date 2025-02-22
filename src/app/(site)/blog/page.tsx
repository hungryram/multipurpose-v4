import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogPage } from "../../../../lib/groq-data"
import ContentEditor from "../components/util/content-editor"
import BlogPaginationClient from "./blog-pagination"

// GENERATES SEO
export async function generateMetadata(): Promise<Metadata> {
  const post = await blogPage()
  const hasBlog = post?.blog?.length > 0

  return {
    title: post?.pageSetting?.blog?.seo?.title_tag,
    description: post?.pageSetting?.blog?.seo?.meta_description,
    metadataBase: new URL(post?.profileSettings?.settings?.websiteName ?? "http://localhost:3000"),
    alternates: {
      canonical: "blog",
    },
    openGraph: {
      title: post?.blog?.seo?.title_tag,
      description: post?.blog?.seo?.meta_description,
      url: "blog",
      siteName: post?.profileSettings?.company_name,
      images: post?.blog?.imageData?.asset?.url,
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post?.blog?.seo?.title_tag,
      description: post?.blog?.seo?.meta_description,
      creator: "@" + post?.profileSettings?.seo?.twitterHandle,
    },
    icons: {
      icon: post.appearances?.branding?.favicon?.asset?.url,
      shortcut: post.appearances?.branding?.favicon?.asset?.url,
      apple: post.appearances?.branding?.favicon?.asset?.url,
    },
    robots: {
      index: hasBlog,
      follow: hasBlog,
    },
  }
}

export default async function BlogPage() {
  const posts = await blogPage()

  if (!posts) {
    notFound()
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: posts?.pageSetting?.blog?.title,
    url: `${posts?.profileSettings?.settings?.websiteName}/blog`,
    description: posts?.pageSetting?.blog?.seo?.meta_description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${posts?.profileSettings?.settings?.websiteName}/blog`,
    },
    publisher: {
      "@type": "Organization",
      ...(posts?.profileSettings?.company_name && { name: posts?.profileSettings?.company_name }),
      ...(posts?.profileSettings?.settings?.websiteName && { url: posts?.profileSettings?.settings?.websiteName }),
    },
    blogPost: posts?.blog?.map((post: any) => ({
      "@type": "BlogPosting",
      headline: post?.title,
      url: `${posts?.profileSettings?.settings?.websiteName}/blog/${post?.slug}`,
      datePublished: post?.date,
      dateModified: post?._updatedAt,
      description: post?.seo?.meta_description,
      image: {
        "@type": "ImageObject",
        url: post?.imageData?.asset.url,
      },
      author: {
        "@type": "Person",
        name: post?.author?.name,
      },
      publisher: {
        "@type": "Organization",
        ...(posts?.profileSettings?.company_name && { name: posts?.profileSettings?.company_name }),
        ...(posts?.profileSettings?.settings?.websiteName && { url: posts?.profileSettings?.settings?.websiteName }),
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <div className="pt-40 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{posts?.pageSetting?.blog?.title ?? 'Blog'}</h1>
            {posts?.pageSetting?.blog?.content && (
              <div className="mt-10">
                <ContentEditor content={posts?.pageSetting?.blog?.content} />
              </div>
            )}
          </div>
          <BlogPaginationClient initialPosts={posts.blog} postsLength={posts?.blog?.length} />
        </div>
      </div>
    </>
  )
}

