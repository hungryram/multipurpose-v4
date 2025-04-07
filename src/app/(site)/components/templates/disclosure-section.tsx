"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentEditor from "../util/content-editor"
import HeaderSection from "./header-section"
import { DisclosureSectionProps, BlockChild, DisclosureItem, Block } from "@/lib/types"


export default function DisclosureSection({
    disclosure,
    disclosureBackgroundColor,
    disclosureTextColor,
    disclosureContentColor,
    content,
    textAlign,
    secondaryButton,
    primaryButton,
    textColor,
    layout = "default",
    contentSide = "left",
    sideContent,
}: DisclosureSectionProps) {
    const [activeTab, setActiveTab] = useState(disclosure[0]?._key || "")
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function toPlainText(blocks: Block[] = []): string {
        return blocks
            .map((block: Block) => {
                if (block._type !== "block" || !block.children) {
                    return ""
                }
                return block.children.map((child: BlockChild) => child.text).join("")
            })
            .join("\n\n")
    }

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: disclosure.map((node: DisclosureItem) => ({
            "@type": "Question",
            name: node.heading || "",
            acceptedAnswer: {
                "@type": "Answer",
                text: toPlainText(node.content) || "",
            },
        })),
    }

    const renderContent = (
        <div className="mb-12" style={{ color: textColor }}>
            <HeaderSection
                content={content}
                textAlign={textAlign}
                primaryButton={primaryButton}
                secondaryButton={secondaryButton}
            />
        </div>
    )

    const renderAccordion = (items: DisclosureItem[]) => (
        <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((node: DisclosureItem) => (
                <AccordionItem key={node._key} value={node._key} className="border rounded-lg overflow-hidden">
                    <AccordionTrigger
                        className="px-4 py-3 hover:no-underline"
                        style={{
                            background: disclosureBackgroundColor?.hex,
                            color: disclosureTextColor?.hex,
                        }}
                    >
                        {node.heading}
                    </AccordionTrigger>
                    <AccordionContent
                        className="px-4 py-3"
                        style={{
                            color: disclosureContentColor?.hex ?? "#000000",
                        }}
                    >
                        {node.content && <ContentEditor content={node.content} />}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )

    const renderAccordionContent = () => {
        switch (layout) {
            case "twoColumn":
                const midpoint = Math.ceil(disclosure.length / 2)
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                        <div>{renderAccordion(disclosure.slice(0, midpoint))}</div>
                        <div>{renderAccordion(disclosure.slice(midpoint))}</div>
                    </div>
                )
            case "sidebar":
                return (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <ul className="space-y-2">
                                {disclosure.map((item) => (
                                    <li key={item._key}>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-left"
                                            onClick={() => setActiveTab(item._key)}
                                        >
                                            {item.heading}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-2/3">
                            {disclosure.map((item) => (
                                <div key={item._key} className={cn(activeTab === item._key ? "block" : "hidden")}>
                                    <h3 className="text-xl font-semibold mb-4">{item.heading}</h3>
                                    <ContentEditor content={item.content} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case "tabbed":
                return isMobile ? (
                    renderAccordion(disclosure)
                ) : (
                    <Tabs defaultValue={disclosure[0]?._key} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
                            {disclosure.map((item) => (
                                <TabsTrigger key={item._key} value={item._key} className="px-3 py-2">
                                    {item.heading}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {disclosure.map((item) => (
                            <TabsContent key={item._key} value={item._key} className="mt-4">
                                <ContentEditor content={item.content} />
                            </TabsContent>
                        ))}
                    </Tabs>
                )
            case "contentSide":
                return (
                    <div className={`flex flex-col ${isMobile ? "" : "md:flex-row"} gap-8`}>
                        <div
                            className={`${isMobile ? "w-full" : "md:w-1/2"} ${contentSide === "left" ? "md:order-1" : "md:order-2"}`}
                        >
                            {sideContent || <ContentEditor content={content} />}
                        </div>
                        <div
                            className={`${isMobile ? "w-full" : "md:w-1/2"} ${contentSide === "left" ? "md:order-2" : "md:order-1"}`}
                        >
                            {renderAccordion(disclosure)}
                        </div>
                    </div>
                )
            case "default":
            default:
                return renderAccordion(disclosure)
        }
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
            <section>
                {layout !== "contentSide" && renderContent}
                <div
                    className={cn("mx-auto", {
                        "max-w-2xl": layout === "default",
                        "max-w-4xl": layout === "twoColumn",
                        "max-w-5xl": layout === "sidebar" || layout === "tabbed" || layout === "contentSide",
                    })}
                >
                    {renderAccordionContent()}
                </div>
            </section>
        </>
    )
}

