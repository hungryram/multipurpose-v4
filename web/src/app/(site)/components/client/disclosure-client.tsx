"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentEditor from "../util/content-editor"
import { DisclosureSectionProps, DisclosureItem } from "@/lib/types"

export default function DisclosureInteractive({
  section
}: {
  section: DisclosureSectionProps
}) {
  const {
    disclosures,
    disclosureBackgroundColor,
    disclosureTextColor,
    disclosureContentColor,
    content,
    layoutType = "default",
    contentSide = "left",
    sideContent,
  } = section || {}

  const [activeTab, setActiveTab] = useState(disclosures[0]?._key || "")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


  const renderAccordion = (items: DisclosureItem[]) => (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {items.map((node) => (
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
    switch (layoutType) {
      case "twoColumn":
        const midpoint = Math.ceil(disclosures.length / 2)
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>{renderAccordion(disclosures.slice(0, midpoint))}</div>
            <div>{renderAccordion(disclosures.slice(midpoint))}</div>
          </div>
        )
      case "sidebar":
        return (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <ul className="space-y-2">
                {disclosures.map((item) => (
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
              {disclosures.map((item) => (
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
          renderAccordion(disclosures)
        ) : (
          <Tabs defaultValue={disclosures[0]?._key} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
              {disclosures.map((item) => (
                <TabsTrigger key={item._key} value={item._key} className="px-3 py-2">
                  {item.heading}
                </TabsTrigger>
              ))}
            </TabsList>
            {disclosures.map((item) => (
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
              {renderAccordion(disclosures)}
            </div>
          </div>
        )
      case "default":
      default:
        return renderAccordion(disclosures)
    }
  }

  return (
    <section>
        {renderAccordionContent()}
    </section>
  )
}
