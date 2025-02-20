import { getBlog } from '../../../../../lib/groq-data'
import Image from 'next/image'
import ContentSimple from '../../components/templates/content-simple'
import ShareSocial from '../../components/templates/share-social'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';
import { format, parseISO } from 'date-fns'
import ContentEditor from '../../components/util/content-editor'
export const revalidate = 0;

type Props = {
    params: {
        slug: string
    }
}

type Meta = {
    params: {
        slug: string
    }
}

// GENERATES SEO
export async function generateMetadata({ params }: Meta): Promise<Metadata> {
    const slug = params.slug
    const post = await getBlog(slug)

    return {
        title: post?.blog?.seo?.title_tag,
        description: post?.blog?.seo?.meta_description,
        metadataBase: new URL(post?.profileSettings?.settings?.websiteName ?? 'http://localhost:3000'),
        alternates: {
            canonical: 'blog/' + post?.blog?.slug
        },
        openGraph: {
            title: post?.blog?.seo?.title_tag,
            description: post?.blog?.seo?.meta_description,
            url: 'blog/' + post?.blog?.slug,
            siteName: post?.profileSettings?.company_name,
            images: post?.blog?.imageData?.asset?.url,
            locale: 'en-US',
            type: 'article',
        },
        twitter: {
            title: post?.blog?.seo?.title_tag,
            description: post?.blog?.seo?.meta_description,
            creator: '@' + post?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: post.appearances?.branding?.favicon?.asset?.url,
            shortcut: post.appearances?.branding?.favicon?.asset?.url,
            apple: post.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: post?.blog?.seo?.noIndex ? false : true,
            follow: post?.blog?.seo?.noIndex ? false : true,
        }
    }
}

export default async function BlogSlug({ params }: Props) {
    const slug = params.slug
    const post = await getBlog(slug)

    if (!post?.blog) {
        notFound()
    }

    const postImage = post?.blog?.imageData?.asset
    const avatar = post?.blog?.author?.avatar?.asset

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        ...(post?.blog?.title && { "headline": post?.blog?.title }),
        "url": `${post?.profileSettings?.settings?.websiteName}/blog/${post?.blog?.slug}`,
        ...(post?.blog?.date && { "datePublished": post?.blog?.date }),
        ...(post?.blog?._updatedAt && { "dateModified": post?.blog?._updatedAt }),
        ...(post?.blog?.seo?.meta_description && { "description": post?.blog?.seo?.meta_description }),
        "image": {
            "@type": "ImageObject",
            ...(postImage?.url && { "url": postImage?.url }),
        },
        "author": {
            "@type": "Person",
            ...(post?.blog?.author?.name && { "name": post?.blog?.author?.name }),
        },
        "publisher": {
            "@type": "Organization",
            ...(post?.profileSettings?.company_name && { "name": post?.profileSettings?.company_name }),
            ...(post?.profileSettings?.settings?.websiteName && { "url": post?.profileSettings?.settings?.websiteName }),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className="px-6 py-32 lg:px-8">
                <div className="mx-auto max-w-3xl leading-7">
                    <div className="mb-10 text-center content">
                        <h1>{post?.blog?.title}</h1>
                        {post?.blog?.date &&
                            <time>{format(parseISO(post?.blog?.date), 'LLLL d, yyyy')}</time>
                        }
                    </div>
                    {post?.blog?.author?.name &&
                        <div className="flex justify-center items-center mx-auto mb-20">
                            <div className="mr-4 flex-shrink-0">
                                <Image
                                    src={avatar?.url}
                                    alt={avatar?.altText ? avatar?.altText : post?.blog?.author?.name}
                                    placeholder={avatar?.lqip ? 'blur' : 'empty'}
                                    blurDataURL={avatar?.lqip}
                                    width={100}
                                    height={100}
                                    className="h-10 w-10 rounded-full"
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold">{post.blog.author.name}</h4>
                            </div>
                        </div>
                    }
                    <Image
                        src={postImage?.url}
                        alt={postImage?.altText ? postImage?.altText : post?.blog?.title}
                        placeholder={postImage?.lqip ? 'blur' : 'empty'}
                        blurDataURL={postImage?.lqip}
                        width={1500}
                        height={800}
                        className="mb-10"
                    />
                    <div className="content">
                        <ContentEditor
                            content={post?.blog?.content}
                        />
                    </div>
                    <div className="mt-6">
                        <ShareSocial
                            url={post?.profileSettings?.settings?.websiteName + '/blog/' + post?.blog?.slug}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
