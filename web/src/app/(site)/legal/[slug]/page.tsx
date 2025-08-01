import { notFound } from "next/navigation"
import { getAllPages, getLegal } from "../../../../../lib/groq-data"
import { Metadata } from 'next';
import ContentEditor from "../../components/util/content-editor";
import Hero from "../../components/page-builder/hero";
import { generatePageMetadata } from "../../components/util/generateMetaData";
import { PageParams } from "@/lib/types";
import { client } from "../../../../../lib/sanity";


export const revalidate = 60;


// GENERATES SEO
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const param = await params;

    return generatePageMetadata({
        slug: param.slug,
        fetcher: getLegal,
        mainKey: "legal",
        type: 'legal'
    });
}


export async function generateStaticParams() {
  const { legal } = await client.fetch(getAllPages);
  return legal.map((doc: {slug: string}) => ({
    slug: doc.slug,
  }));
}

export default async function LegalSlug({ params }: PageParams) {

    const param = await params;
    const slug = param.slug;

    const legal = await getLegal(slug)

    if (!legal?.legal) {
        notFound()
    }

    return (
        <div>
            {legal?.pageSetting?.legal?.imageData?.asset?.url &&
                <Hero
                    image={legal?.pageSetting?.legal?.imageData?.asset?.url}
                    imageOverlayColor={{ rgb: { r: 0, g: 0, b: 0, a: 0.4 } }}
                    textColor="#fff"
                    enableBreadcrumbs={false}
                    textAlign="center"
                    layout="hero"
                />
            }
            <div className="mx-auto max-w-6xl content pt-44">
                <div className="container">
                    <h1>{legal?.legal?.title}</h1>
                    <hr />
                    <ContentEditor
                        content={legal?.legal?.content}
                    />
                </div>
            </div>
        </div>
    )
}
