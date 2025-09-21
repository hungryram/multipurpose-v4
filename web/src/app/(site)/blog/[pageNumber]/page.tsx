import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogPage, getAllCategories } from "../../../../../../lib/groq-data"
import BlogGrid from "../../blog-grid"
import { generatePageMetadata } from "../../../components/util/generateMetaData"
import Hero from "../../../components/page-builder/hero"
import PaginationNav from "../../pagination-nav"

interface PageProps {
  params: Promise<{ pageNumber: string }>
}

const POSTS_PER_PAGE = 12

// GENERATES SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pageNumber } = await params
  const pageNum = parseInt(pageNumber)
  
  const posts = await blogPage()

  return {
    title: `${posts?.pageSetting?.blog?.title} - Page ${pageNum} | ${posts?.profileSettings?.company_name}`,
    description: `${posts?.pageSetting?.blog?.seo?.meta_description} Browse page ${pageNum} of our blog posts.`,
    alternates: {
      canonical: `/blog/page/${pageNum}`,
    },
    other: {
      ...(pageNum > 1 && { 'rel-prev': pageNum === 2 ? '/blog' : `/blog/page/${pageNum - 1}` }),
    },
  }
}

export default async function BlogPageNumber({ params }: PageProps) {
  const { pageNumber } = await params
  const pageNum = parseInt(pageNumber)

  if (isNaN(pageNum) || pageNum < 2) {
    notFound()
  }

  const posts = await blogPage()
  const categories = await getAllCategories()

  if (!posts || !posts.blog) {
    notFound()
  }

  const totalPosts = posts.blog.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  if (pageNum > totalPages) {
    notFound()
  }

  const startIndex = (pageNum - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = posts.blog.slice(startIndex, endIndex)

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${posts?.pageSetting?.blog?.title} - Page ${pageNum}`,
    url: `${posts?.profileSettings?.settings?.websiteName}/blog/page/${pageNum}`,
    description: posts?.pageSetting?.blog?.seo?.meta_description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${posts?.profileSettings?.settings?.websiteName}/blog/page/${pageNum}`,
    },
    publisher: {
      "@type": "Organization",
      ...(posts?.profileSettings?.company_name && { name: posts?.profileSettings?.company_name }),
      ...(posts?.profileSettings?.settings?.websiteName && { url: posts?.profileSettings?.settings?.websiteName }),
    },
    blogPost: paginatedPosts?.map((post: any) => ({
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
      
      {/* Add rel prev/next tags */}
      {pageNum > 1 && (
        <link 
          rel="prev" 
          href={pageNum === 2 ? '/blog' : `/blog/page/${pageNum - 1}`} 
        />
      )}
      {pageNum < totalPages && (
        <link rel="next" href={`/blog/page/${pageNum + 1}`} />
      )}
      
      <div className="bg-[#1a1a1a]">
        <Hero
          section={{
            layoutType: 'hero',
            content: posts?.pageSetting?.blog?.content,
            imageHeight: 'small',
          }}
        />
      </div>
      <div className="py-20">
        <div className="container">
          <BlogGrid posts={paginatedPosts} />
          <PaginationNav
            currentPage={pageNum}
            totalPages={totalPages}
            totalPosts={totalPosts}
            basePath="/blog"
            categories={categories}
          />
        </div>
      </div>
    </>
  )
}
