import { getAllPages } from '../../../../lib/groq-data';
import { client } from "../../../../lib/sanity";
import Link from 'next/link';
import Breadcrumb from '../components/templates/breadcrumbs';

export const revalidate = 60;

export const metadata = {
    title: "Sitemap | Hungry Ram",
    description: "View a list of all our existing pages for Hungry Ram LLC",
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap` },
    robots: { index: true, follow: true },
};

export default async function SitemapPage() {
    const pages = await client.fetch(getAllPages);
    const websiteName = pages?.profileSettings?.settings?.websiteName;

    // Generate arrays of URLs
    const blogUrl = pages?.blog?.map((page: any) => ({
        title: page.title || page.slug,
        url: `${websiteName}/blog/${page.slug}`,
    })) || [];

    const legalUrl = pages?.legal?.map((page: any) => ({
        title: page.title || page.slug,
        url: `${websiteName}/legal/${page.slug}`,
    })) || [];


    const pageUrl = pages?.pages?.map((page: any) => ({
        title: page.title || page.slug,
        url: `${websiteName}/${page.slug}`,
    })) || [];


    const servicesUrl = pages?.services?.map((page: any) => ({
        title: page.title || page.slug,
        url: `${websiteName}/services/${page.slug}`,
    })) || [];

    const categoryUrl = pages?.categories?.map((page: any) => ({
        title: page.title || page.slug,
        url: `/blog/category/${page.slug}`,
    })) || [];
    


    // Static entries
    const staticEntries = [
        { title: 'Home', url: websiteName },
        { title: 'Blog', url: `${websiteName}/blog` },
        { title: 'Services', url: `${websiteName}/services` },
        { title: 'Legal', url: `${websiteName}/legal` },
    ];

    // Calculate total number of pages
    const totalCount =
        staticEntries.length +
        blogUrl.length +
        legalUrl.length +
        servicesUrl.length +
        categoryUrl.length +
        pageUrl.length;

    return (
        <div className="section">
            <div className="py-44 bg-[#1a1a1a]">
                <div className="content text-white container">
                    <Breadcrumb centered={false} color='#fff' />
                    <h1 className="!text-white">Hungry Ram Web Design Sitemap</h1>
                    <p>This is a human-readable list of all the pages included in our sitemap.</p>
                </div>
            </div>
            <div className="container py-20">
                <div className="content flex flex-col space-y-10">
                    <p><strong>Total Pages:</strong> {totalCount}</p>
                    <h2>Root Pages</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {staticEntries.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <h2>Pages</h2>
                    <ul className='columns-2' style={{ listStyle: 'none', padding: 0 }}>
                        {pageUrl.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <h2>Digital Marketing Services</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {servicesUrl.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <h2>Blog</h2>
                    <ul className='columns-2' style={{ listStyle: 'none', padding: 0 }}>
                        {blogUrl.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <h2>Category</h2>
                    <ul className='columns-2' style={{ listStyle: 'none', padding: 0 }}>
                        {categoryUrl.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                                        <h2>Category</h2>
                    <ul className='columns-2' style={{ listStyle: 'none', padding: 0 }}>
                        {categoryUrl.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <h2>Legal</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {legalUrl.map((entry, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <Link href={entry.url}>{entry.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
