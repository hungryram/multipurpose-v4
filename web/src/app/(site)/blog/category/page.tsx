import { getAllCategories } from '../../../../../lib/groq-data';
import Link from 'next/link';
import Breadcrumb from '../../components/templates/breadcrumbs';

export const revalidate = 60;

export const metadata = {
  title: 'Blog Categories | Hungry Ram',
  description: 'Browse all blog categories and discover content organized by topic.',
  alternates: { canonical: 'https://www.hungryram.com/blog/category' },
  robots: { index: true, follow: true },
};

interface Category {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  color?: string;
  postCount: number;
}

export default async function CategoriesPage() {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="section">
      <div className="py-44 bg-[#1a1a1a]">
        <div className="content text-white container">
          <Breadcrumb textAlign="left" color="#fff" />
          <h1 className="!text-white">Blog Categories</h1>
          <p>Explore our content organized by topic. Find exactly what you're looking for.</p>
        </div>
      </div>

      <div className="container py-20">
        <div className="content">
          {categories.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-lg text-gray-600">
                  Found {categories.length} {categories.length === 1 ? 'category' : 'categories'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog/category/${category.slug}`}
                    className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {category.color && (
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          />
                        )}
                        <h2 className="!text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h2>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                      </span>
                    </div>

                    {category.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      View posts
                      <svg 
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick navigation to main blog */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Looking for all posts?</span>
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View All Blog Posts
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg 
                  className="mx-auto h-16 w-16 text-gray-400 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600">Categories will appear here once they are created.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
