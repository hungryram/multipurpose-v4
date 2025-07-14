import { client } from "../../../../lib/sanity"
import { legalPage } from '../../../../lib/groq-data'
import ContentEditor from '../components/util/content-editor'
import Link from 'next/link'
import Hero from '../components/page-builder/hero';
import { generatePageMetadata } from "../components/util/generateMetaData";
export const revalidate = 0;

// GENERATES SEO
export async function generateMetadata() {
    return generatePageMetadata({
        fetcher: () => client.fetch(legalPage),
        mainKey: "pageSetting",
        type: "legal",
    });
}


export default async function LegalPage() {

    const legal = await client.fetch(legalPage)

    const pageSettings = legal?.pageSetting?.legal


    return (
        <div>
            {pageSettings?.imageData?.asset?.url &&
                <Hero
                    image={pageSettings?.imageData.asset.url}
                    content={legal?.pageSetting?.legal?.content}
                    imageOverlayColor={{ rgb: { r: 0, g: 0, b: 0, a: 0.4 } }}
                    textColor="#fff"
                    enableBreadcrumbs={false}
                    textAlign="center"
                    layout="hero"
                />
            }
            <div className="container">
                <div className="mx-auto max-w-6xl content pt-44 text-center">
                    <ContentEditor
                        content={pageSettings?.content}
                    />
                    <div className="my-20 text-center">
                        <ul role="list" className="list-none! text-xl">
                            {legal?.legal?.map((item: any) => (
                                <li key={item._id} className="py-4">
                                    <Link href={`legal/${item.slug}`}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
