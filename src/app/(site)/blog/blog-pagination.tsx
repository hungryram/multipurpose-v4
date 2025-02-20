'use client'

import { useEffect, useState } from 'react'
import BlogCard from '../components/templates/blog-card'
import { format, parseISO } from 'date-fns'
import { blogPage } from '../../../../lib/groq-data'

export default function BlogPagination ({postsLength}: {postsLength: number}) {
    const [posts, setPosts] = useState<any>();
    const [fetching, setFetching] = useState(false);
    const postToFetch = 6;

    async function getNextSixPosts(id: number) {
        try {
            setFetching(true);
            const response = await blogPage(id)
            setPosts(response);
            setFetching(false);
        } catch (error) {
            console.error("error", error)
        }
    }

    useEffect(() => {
        getNextSixPosts(6)
    }, []);

    const clickHandler = () => getNextSixPosts(posts.blog.length + postToFetch);

    return (
        <div style={{opacity: fetching ? 0.5 : 1,}}>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts?.blog?.map((post: any) => {
                    const parsedDate = parseISO(post?.date)
                    const postImage = post?.imageData?.asset
                    return (
                        <BlogCard
                        key={post?._id}
                        title={post?.title}
                        slug={`blog/${post.slug}`}
                        date={format(parsedDate, 'LLLL	d, yyyy')}
                        image={postImage?.url}
                        blurData={postImage?.lqip}
                        altText={postImage?.altText ? postImage?.altText : post?.title}
                        />
                    )
                })}
            </div>
            {
                (postsLength > posts?.blog.length) && <div className="flex justify-center mt-8">
                    <button className="primary-button capitalize" onClick={clickHandler} disabled={fetching}>load more</button>
                </div>
            }
        </div>
    )
}