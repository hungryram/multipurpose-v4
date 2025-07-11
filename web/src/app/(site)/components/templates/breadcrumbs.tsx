'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoChevronForwardOutline } from "react-icons/io5";
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

function Breadcrumb({ textAlign, color }: { textAlign?: string, color?: string }) {
    const pathname = usePathname();

    if (!pathname) {
        return null;
    }

    // Split the pathname into individual segments
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');

    // Generate breadcrumb schema
    const generateSchema = () => {
        const itemListElement = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${window.location.origin}/`
            },
            ...pathSegments.map((segment, index) => {
                const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                const href = `${window.location.origin}/${pathSegments.slice(0, index + 1).join('/')}`;
                return {
                    "@type": "ListItem",
                    "position": index + 2,
                    "name": name,
                    "item": href
                };
            })
        ];

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        };
    };

    useEffect(() => {
        const schema = generateSchema();
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [pathname]); // Re-run when pathname changes

    return (
        <ol role="list"
              className={cn("content list-none flex items-center ml-0!", {
                "text-left": textAlign === "left",
                "mx-auto text-center justify-center": textAlign === "center",
                "text-right justify-end": textAlign === "right",
              })}
        style={{
            color: color
        }}>
            <li className="inline-block">
                <div className="flex items-center">
                    <Link href="/">
                        Home
                    </Link>
                </div>
            </li>
            {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const linkText = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                return (
                    <li key={index} className="inline-block">
                        <div className="flex items-center">
                            <IoChevronForwardOutline className="h-5 w-5 shrink-0" aria-hidden="true" />
                            <Link
                                href={href}
                                className="capitalize"
                            >
                                {linkText}
                            </Link>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

export default Breadcrumb;