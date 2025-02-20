import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonProps {
  text?: string
  link: string
  style?: React.CSSProperties
  variant: "primary" | "secondary"
}

const CustomButton: React.FC<ButtonProps> = ({ text, link, style, variant }) => {
  const className = cn(
    variant === "primary" ? "primary-button" : "secondary-button",
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  )

  const isExternal = link.startsWith("http://") || link.startsWith("https://")

  return isExternal ? (
    <a href={link} className={className} style={style} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  ) : (
    <Button asChild variant={variant} style={style}>
      <Link href={link}>{text}</Link>
    </Button>
  )
}

export default CustomButton

