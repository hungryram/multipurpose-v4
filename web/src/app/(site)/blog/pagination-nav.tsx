"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal, FolderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
    _id: string
    title: string
    slug: string
    color?: string
    postCount: number
}

interface PaginationNavProps {
    currentPage: number
    totalPages: number
    totalPosts: number
    basePath: string
    categories?: Category[]
}

export default function PaginationNav({ currentPage, totalPages, totalPosts, basePath, categories }: PaginationNavProps) {
    if (totalPages <= 1) return null

    const getPageUrl = (pageNum: number) => {
        if (pageNum === 1) return basePath
        return `${basePath}/page/${pageNum}`
    }

    const generatePageNumbers = () => {
        const pages: (number | 'ellipsis')[] = []
        const showEllipsis = totalPages > 7

        if (!showEllipsis) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage <= 4) {
                // Near the beginning
                for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
                    pages.push(i)
                }
                if (totalPages > 5) {
                    pages.push('ellipsis')
                }
            } else if (currentPage >= totalPages - 3) {
                // Near the end
                pages.push('ellipsis')
                for (let i = Math.max(2, totalPages - 4); i < totalPages; i++) {
                    pages.push(i)
                }
            } else {
                // In the middle
                pages.push('ellipsis')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('ellipsis')
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = generatePageNumbers()

    return (
        <nav className="flex flex-col items-center space-y-4 mt-12" aria-label="Blog pagination">
            {/* Posts count info */}
            <div className="text-sm text-gray-600">
                Showing page {currentPage} of {totalPages} ({totalPosts} total posts)
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-1">
                {/* Previous page */}
                <Button
                    variant="primary"
                    size="sm"
                    asChild={currentPage > 1}
                    disabled={currentPage <= 1}
                    className={cn(
                        "flex items-center space-x-1",
                        currentPage <= 1 && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {currentPage > 1 ? (
                        <Link href={getPageUrl(currentPage - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </Link>
                    ) : (
                        <>
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </>
                    )}
                </Button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                    {pageNumbers.map((pageNum, index) => {
                        if (pageNum === 'ellipsis') {
                            return (
                                <div key={`ellipsis-${index}`} className="px-3 py-2">
                                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                </div>
                            )
                        }

                        const isCurrentPage = pageNum === currentPage

                        return (
                            <Button
                                key={pageNum}
                                variant={isCurrentPage ? "primary" : "secondary"}
                                size="sm"
                                asChild={!isCurrentPage}
                                disabled={isCurrentPage}
                                className={cn(
                                    "min-w-[40px]",
                                    isCurrentPage && "bg-primary text-primary-foreground"
                                )}
                            >
                                {isCurrentPage ? (
                                    <span>{pageNum}</span>
                                ) : (
                                    <Link href={getPageUrl(pageNum)}>{pageNum}</Link>
                                )}
                            </Button>
                        )
                    })}
                </div>

                {/* Next page */}
                <Button
                    variant="primary"
                    size="sm"
                    asChild={currentPage < totalPages}
                    disabled={currentPage >= totalPages}
                    className={cn(
                        "flex items-center space-x-1",
                        currentPage >= totalPages && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {currentPage < totalPages ? (
                        <Link href={getPageUrl(currentPage + 1)}>
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    ) : (
                        <>
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>

            {/* Quick navigation to first/last pages on mobile */}
            <div className="flex items-center space-x-2 sm:hidden">
                {currentPage > 2 && (
                    <Button variant="primary" size="sm" asChild>
                        <Link href={getPageUrl(1)}>First</Link>
                    </Button>
                )}
                {currentPage < totalPages - 1 && (
                    <Button variant="primary" size="sm" asChild>
                        <Link href={getPageUrl(totalPages)}>Last</Link>
                    </Button>
                )}
            </div>

            {/* Categories Section */}
            {categories && categories.length > 0 && (
                <div className="mt-8 w-full max-w-4xl">
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                            <FolderIcon className="h-5 w-5" />
                            Browse by Category
                        </h3>
                        <p className="text-sm text-gray-600">
                            Find posts on specific topics
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/blog/category/${category.slug}`}
                                className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md",
                                    category.color 
                                        ? `bg-[${category.color}]/10 text-[${category.color}] border border-[${category.color}]/20 hover:bg-[${category.color}]/20` 
                                        : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                                )}
                            >
                                <span>{category.title}</span>
                                <span className="text-xs bg-white/80 px-1.5 py-0.5 rounded-full">
                                    {category.postCount}
                                </span>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="text-center mt-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/blog/category">
                                View All Categories
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}
