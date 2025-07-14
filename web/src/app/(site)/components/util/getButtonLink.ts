import type { ButtonProps } from "@/lib/types"

export const getButtonLink = (button?: ButtonProps["link"]): string => {
  if (!button) return ""

  if (button.externalUrl) return button.externalUrl
  if (button.internalPath) return button.internalPath
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

export function getLinkUrl(
  link?: {
    externalUrl?: string
    internalPath?: string
    internalLink?: {
      _type: string
      slug: string
    }
  }
): string {
  if (!link) return ""

  if (link.externalUrl) return link.externalUrl
  if (link.internalPath) return link.internalPath
  if (!link.internalLink) return ""

  switch (link.internalLink._type) {
    case "homeDesign":
      return "/"
    case "pages":
      return `/${link.internalLink.slug}`
    case "blog":
    case "legal":
    case "services":
    case "team":
      return `/${link.internalLink._type}/${link.internalLink.slug}`
    default:
      return ""
  }
}


/**
 * Accepts any type of navigation item or CTA link and returns a safe URL string.
 */
export function getNavLink(
  item?: {
    externalUrl?: string
    internalPath?: string
    internalLink?: {
      _type: string
      slug?: string
    }
  }
): string {
  if (!item) return "/"

  if (item.externalUrl) return item.externalUrl
  if (item.internalPath) return item.internalPath
  if (!item.internalLink) return "/"

  const { _type, slug } = item.internalLink

  switch (_type) {
    case "pages":
      return `/${slug}`
    case "blog":
      return `/blog/${slug}`
    case "legal":
      return `/legal/${slug}`
    case "services":
      return `/services/${slug}`
    case "team":
      return `/team/${slug}`
    case "homeDesign":
      return "/"
    default:
      return "/"
  }
}