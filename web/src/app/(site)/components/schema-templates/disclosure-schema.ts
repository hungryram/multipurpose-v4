import { DisclosureSectionProps, Block, BlockChild } from "@/lib/types"

export function toPlainText(blocks: Block[] = []): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return ""
      return block.children.map((child) => child.text).join("")
    })
    .join("\n\n")
}

export function DisclosureSectionSchema(section: DisclosureSectionProps) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: section.disclosures.map((node) => ({
      "@type": "Question",
      name: node.heading || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(node.content) || "",
      },
    })),
  }
}
