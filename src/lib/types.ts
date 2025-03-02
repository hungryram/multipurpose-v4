import type React from "react"
import type { ReactNode } from "react"

// NAVBAR

export interface NavbarProps {
  company_name: string
  logo: string
  navItems: any[]
  logoWidth: number
  phone: string
  email: string
  office: string
  backgroundColor: string
  enableTopHeader: boolean
  ctaLink: any
  mobileLogoWidth: number
  hideCta: boolean
  enableTransparent: boolean
  logoOnScroll: string
}

// FOOTER

export interface FooterProps {
  layout: "default" | "single-column" | "minimal" | "two-column" | "grid"
  footerBackgroundColor?: string
  footerHeaderColor?: string
  footerTextColor?: string
  footerText?: any
  company_name: string
  image?: string
  quickLinksHeading?: string
  quickLinksTwoHeading?: string
  altText?: string
  blurData?: string
  email?: string
  phone_number?: string
  office_number?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  footerDisclaimer?: any
  shortText?: string
  legal?: any[]
  links?: any[]
  secondLinks?: any[]
  googleBusiness?: string
  facebook?: string
  youtube?: string
  instagram?: string
  twitter?: string
  reddit?: string
  linkedin?: string
  yelp?: string
  pinterest?: string
  tiktok?: string
  zillow?: string
  size?: string
}

// Common Types
export interface RGB {
  r: number
  g: number
  b: number
  a: number
}

export interface Asset {
  url: string
  altText?: string
  lqip?: string
}

export interface Background {
  backgroundType: "color" | "image"
  color?: { hex: string }
  imageOverlayColor?: {
    rgb: RGB
  }
}

// Button Types
export interface ButtonStyle {
  buttonBackground: { rgb: RGB }
  buttonTextColor: { hex: string }
  buttonBorderColor: { hex: string }
}

export interface InternalLink {
  _type: "homeDesign" | "pages" | "blog" | "legal" | "services" | "team"
  slug: string
}

export interface ButtonLink {
  internalLink?: InternalLink
  externalUrl?: string
  buttonText: string
}

export interface ButtonProps {
  text: string
  link: ButtonLink
  style?: React.CSSProperties
}

// Form Types
export interface FormField {
  name: string
  label: string
  placeholder: string
  type: string
  _key: string
  radioValue: string[]
  selectValue: string[]
  checkBoxValue: string[]
  required: boolean
  stacked: boolean
  inlineEmail: boolean
  hideLabel: boolean
  half: boolean
}

export interface FormSchema {
  subject: string
  fields: FormField[]
  emailCc: string
  emailBcc: string
  sendTo: string
  sendFrom: string
  redirectTo: string
  buttonLabel: string
  buttonBackgroundColor: { hex: string }
  buttonTextColor: { hex: string }
  formDisclaimer: any
  makeStacked: boolean
  spreadsheetId?: string
  sheetName?: string
}

export interface ErrorBoundaryProps {
  children: ReactNode
  sectionName: string
}

export interface ErrorBoundaryState {
  hasError: boolean
}

// Utility Types
export interface StyleUtils {
  getBackgroundStyles: (
    bg?: Background,
    textColor?: string,
    paddingTop?: string,
    paddingBottom?: string,
    backgroundImageUrl?: string,
  ) => React.CSSProperties
  getButtonStyles: (buttonStyle?: ButtonStyle) => React.CSSProperties
}

// Helper Functions
export function buttonStyleToCss(buttonStyle?: ButtonStyle): React.CSSProperties {
  if (!buttonStyle?.buttonBackground?.rgb) {
    return {
      backgroundColor: "var(--primary)",
      color: "var(--primary-foreground)",
      border: "1px solid transparent",
    }
  }

  const { r, g, b, a } = buttonStyle.buttonBackground.rgb

  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
    color: buttonStyle.buttonTextColor?.hex ?? "var(--primary-foreground)",
    border: `1px solid ${buttonStyle.buttonBorderColor?.hex ?? "transparent"}`,
  }
}

export function convertButtonLinking(buttonLinking?: ButtonLink): ButtonProps | undefined {
  if (!buttonLinking) return undefined

  return {
    text: buttonLinking.buttonText,
    link: buttonLinking,
  }
}

// PAGE BUILDERS

// CONTENT FIELD

export interface ContentSectionProps {
  content?: any[]
  layout: ContentLayout
  heading?: string
  textAlign?: "left" | "center" | "right"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
  columnGap?: "sm" | "md" | "lg" | "xl"
  className?: string
  children?: ReactNode
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  textColor?: string
}

// SERVICE SECTION

export interface Service {
  _id: string
  title: string
  detail: string
  slug: {
    current: string
  }
  imageData: {
    asset: {
      url: string
      altText: string
      lqip: string
    }
  }
}

export interface ServiceListProps {
  services: Service[]
  content?: any[]
  textAlign?: "left" | "center" | "right"
  layout: "grid" | "list" | "featured" | "carousel"
  columns?: 2 | 3 | 4
  secondaryButton?: ButtonProps
  primaryButton?: ButtonProps
  textColor?: string
  limit?: number
}

// TEAM SECTION

export interface TeamComponentProps {
  team: TeamMember[]
  content?: any[]
  textAlign?: "left" | "center" | "right"
  paddingTop?: string
  paddingBottom?: string
  layout: "grid" | "carousel" | "list"
  secondaryButton?: ButtonProps
  textColor?: string
  primaryButton?: ButtonProps
  columns?: 2 | 3 | 4
  slidesToShow?: number
  limit?: number
}

export interface TeamMember {
  _id: string
  name: string
  position: string
  bio: any
  imageData: {
    asset: {
      url: string
      altText: string
      lqip: string
    }
  }
  slug: {
    current: string
  }
  linkedin?: string
  twitter?: string
  email?: string
}

// TESTIMONIAL SECTION

export interface TestimonialSectionProps {
  testimonials: Testimonial[]
  content?: any[]
  textAlign?: "left" | "center" | "right"
  paddingTop?: string
  paddingBottom?: string
  layout: "grid" | "slider" | "column"
  secondaryButton?: ButtonProps
  textColor?: string
  primaryButton?: ButtonProps
  slidesToShow?: number
}


export interface Testimonial {
  _id: string
  stars: number
  testimonial: any
  name: string
  position: string
  image: {
      asset: {
          url: string
          altText: string
          lqip: string
      }
  }
}

// LOGO CLOUD

export interface LogoCloudSectionProps {
  images: LogoImage[]
  content?: any[]
  textAlign?: "left" | "center" | "right"
  layout: "grid" | "slider" | "marquee"
  secondaryButton?: ButtonProps
  textColor?: string
  primaryButton?: ButtonProps
  columns?: 3 | 4 | 5 | 6
  slidesToShow?: number
}

export interface LogoImage {
  asset: {
    url: string
    altText: string
    lqip: string
  }
}

// LEAD FORM SECTION

export interface LeadFormSectionProps {
  layout: "twoColumn" | "stacked"
  content: any // This should match the type of your content structure
  formSchema: any // This should match the FormSchema type from FormBuilder
  backgroundColor?: string
  textColor?: string
  textAlign: "left" | "center" | "right"
  buttonLink?: any
  primaryButtonText?: string
  primaryButtonStyle?: React.CSSProperties
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  alignContent: boolean
  formBackgroundColor?: string
  labelColor?: string
  formContent: any;
}

// HERO

export interface HeroProps {
  content?: any[]
  image?: string
  altText?: string
  blurData?: string
  backgroundImage?: string
  images?: any
  backgroundColor?: string
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  textAlign?: "left" | "center" | "right"
  textColor?: string
  height?: "large" | "medium" | "small"
  imageOverlayColor?: {
    rgb: {
      r: number
      g: number
      b: number
      a: number
    }
  }
  layout?: "hero" | "split" | "centered" | "fullscreen" | "sideBysideCarousel"
}

// HEADER SECTION

export interface HeaderSectionProps {
  content?: any[] // Replace 'any' with a more specific type if possible
  textAlign?: "left" | "center" | "right"
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
}

// GALLERY SWIPER

export interface GalleryImage {
  src: string
  alt?: string | undefined
  width?: number
  height?: number
  asset?: {
    url: string
    altText?: string
  }
}

export interface GallerySliderProps {
  images: GalleryImage[]
  showArrows?: boolean
  showPagination?: boolean
  slidesToShow?: number
  textColor?: string
  effect?: "slide" | "fade"
  content?: any[]
  image?: string
  altText?: string
  blurData?: string
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  textAlign?: "left" | "center" | "right"
  autoplay?: boolean
  layout?: "grid" | "masonry" | "slider"
  columns?: 2 | 3 | 4
  gap?: "small" | "medium" | "large"
}

// FORM BUILDER

export interface FormField {
  name: string
  label: string
  placeholder: string
  type: string
  _key: string
  radioValue: string[]
  selectValue: string[]
  checkBoxValue: string[]
  required: boolean
  stacked: boolean
  inlineEmail: boolean
  hideLabel: boolean
  half: boolean
}

export interface FormSchema {
  subject: string
  fields: FormField[]
  emailCc: string
  emailBcc: string
  sendTo: string
  sendFrom: string
  redirectTo: string
  buttonLabel: string
  buttonBackgroundColor: { hex: string }
  buttonTextColor: { hex: string }
  formDisclaimer: any
  makeStacked: boolean
  spreadsheetId?: string
  sheetName?: string
  
}

export interface FormBuilderProps {
  formSchema: FormSchema
  labelColor?: string
}

// FEATURE SECTION

export interface BlockLinking {
  internalLink?: {
      _type: "pages" | "blog" | "legal" | "services" | "team"
      slug: string
  }
  externalUrl?: string
}

export interface FeaturedItem {
  heading: string
  content?: any
  image?: {
      src: string
      alt: string
      asset?: {
          url: string
          altText: string
          lqip?: string
      }
  }
  blockLinking?: BlockLinking
  button?: {
      text?: string
  }
}

export type CardLayout = "overlay" | "text-below" | "text-only" | "image-only"

export interface FeaturedGridProps {
  blocks: FeaturedItem[]
  columns?: 1 | 2 | 3 | 4
  layout?: CardLayout
  content?: any[]
  image?: string
  textColor?: string
  textAlign?: "left" | "center" | "right"
  altText?: string
  blurData?: string
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  imageHeight?: 'small' | 'medium' | 'large'
}

// DISCLOSURE SECTION


export interface DisclosureSectionProps {
  disclosure: DisclosureItem[]
  disclosureBackgroundColor?: { hex: string }
  disclosureTextColor?: { hex: string }
  disclosureContentColor?: { hex: string }
  content?: any[]
  textAlign?: "left" | "center" | "right"
  layout: "default" | "twoColumn" | "sidebar" | "tabbed" | "contentSide"
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  textColor?: string
  contentSide?: "left" | "right"
  sideContent?: React.ReactNode
}

export interface DisclosureItem {
  _key: string
  heading: string
  content: Block[]
}

export interface Block {
  _type: string
  children?: BlockChild[]
}

export interface BlockChild {
  text: string
}

// CTA SECTION

export interface CtaSectionProps {
  content: any[]
  textAlign: "left" | "center" | "right"
  primaryButton?: any
  secondaryButton?: any
  layout: "full-width" | "banner" | "text-image" | "fullWidthTextImage"
  style?: React.CSSProperties
  image?: string
  altText?: string
  reverseColumn?: boolean
  columnLayout?: "half" | "twoFifths" | "oneThird"
  subtitle?: string
  backgroundColor?: string
}


// BLOG SECTION

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  date: string
  imageData: {
    asset: {
      url: string
      altText: string
      lqip: string
    }
  }
  excerpt?: string
}

export interface ButtonProps {
  text: string
  link: string
  style?: React.CSSProperties
}

export interface BlogSectionProps {
  blog: BlogPost[]
  content?: any[]
  textAlign?: "left" | "center" | "right"
  layout?: "grid" | "list" | "featured" | "carousel"
  columns?: 2 | 3 | 4
  secondaryButton?: ButtonProps
  primaryButton?: ButtonProps
  textColor?: string
  carouselSlidesPerView?: number
  limit?: number
}
