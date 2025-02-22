import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import ContentEditor from "../util/content-editor"
import { Button } from "@/components/ui/button"
import { HeaderSectionProps, ButtonProps } from "@/lib/types"

// Remove the local ButtonProps interface since we're importing it



// Update getButtonLink to use the new type
const getButtonLink = (button: ButtonProps["link"]) => {
  if (button.externalUrl) return button.externalUrl
  if (!button.internalLink) return ""

  switch (button.internalLink._type) {
    case "homeDesign":
      return "/"
    case "pages":
      return `/${button.internalLink.slug}`
    case "blog":
    case "legal":
    case "services":
    case "team":
      return `/${button.internalLink._type}/${button.internalLink.slug}`
    default:
      return ""
  }
}

const CustomButton: React.FC<ButtonProps & { variant: "primary" | "secondary" }> = ({ text, link, style, variant }) => {
  const href = getButtonLink(link)
  if (!href) return null

  const className = cn(
    variant === "primary" ? "primary-button" : "secondary-button",
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  )

  return link.externalUrl ? (
    <a href={href} className={className} style={style} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  ) : (
    <Button asChild variant={variant} style={style}>
      <Link href={href}>{text}</Link>
    </Button>
  )
}

export default function HeaderSection({ content, textAlign, primaryButton, secondaryButton }: HeaderSectionProps) {
  return (
    <div
      className={cn("content", {
        "text-left": textAlign === "left",
        "mx-auto text-center justify-center": textAlign === "center",
        "text-right justify-end": textAlign === "right",
      })}
    >
      <ContentEditor content={content} />
      {(primaryButton || secondaryButton) && (
        <div
          className={cn("mt-10 flex items-center gap-x-6", {
            "text-left": textAlign === "left",
            "mx-auto text-center justify-center": textAlign === "center",
            "text-right justify-end": textAlign === "right",
          })}
        >
          {primaryButton && <CustomButton {...primaryButton} variant="primary" />}
          {secondaryButton && <CustomButton {...secondaryButton} variant="secondary" />}
        </div>
      )}
    </div>
  )
}

