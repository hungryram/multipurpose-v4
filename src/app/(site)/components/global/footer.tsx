import Link from "next/link"
import Image from "next/image"
import ContentEditor from "../util/content-editor"
import Social from "../templates/social"
import { cn } from "@/lib/utils"

interface FooterProps {
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

export default function Footer({
  layout = "default",
  footerBackgroundColor = "#0d1321",
  footerHeaderColor = "#ffffff",
  footerTextColor = "#9b9b9b",
  footerText,
  company_name,
  image,
  quickLinksHeading,
  quickLinksTwoHeading,
  altText,
  blurData,
  email,
  phone_number,
  office_number,
  address,
  city,
  state,
  zip_code,
  footerDisclaimer,
  shortText,
  legal,
  links,
  secondLinks,
  googleBusiness,
  facebook,
  youtube,
  instagram,
  twitter,
  reddit,
  linkedin,
  yelp,
  pinterest,
  tiktok,
  zillow,
}: FooterProps) {
  const socialLinks = {
    googleBusiness,
    facebook,
    youtube,
    instagram,
    twitter,
    reddit,
    linkedin,
    yelp,
    pinterest,
    tiktok,
    zillow,
  }

  const renderLogo = () =>
    image ? (
      <div className={`${layout === 'single-column' ? 'flex justify-center' : 'flex justify-center md:justify-start'}`}>
        <Image
          src={image || "/placeholder.svg"}
          width={200}
          height={50}
          alt={altText || company_name}
          className="mb-6"
          placeholder={blurData ? "blur" : "empty"}
          blurDataURL={blurData}
        />
      </div>
    ) : (
      <h2 className="text-2xl font-semibold mb-4" style={{ color: footerHeaderColor }}>
        {company_name}
      </h2>
    )

    const renderContactInfo = (layout?: "single-column") => {
      if (layout === "single-column") {
        return (
          <div className="space-x-10 text-sm flex justify-center">
            {(address || city || state || zip_code) && (
              <div>
                {address && <>{address} </>}
                    {city && <>{city}, </>}
                    {state} {zip_code}
              </div>
            )}
            {phone_number && (
              <div>
                <a href={`tel:${phone_number}`}>{phone_number}</a>
              </div>
            )}
            {office_number && (
              <div>
                <a href={`tel:${office_number}`}>{office_number}</a>
              </div>
            )}
            {email && (
              <div>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            )}
          </div>
        )
      }
  
      return (
        <dl className="space-y-4 text-sm leading-6">
          {(address || city || state || zip_code) && (
            <div className="flex">
              <dt className="w-24 flex-none">Address:</dt>
              <dd>
                {address && (
                  <>
                    {address}, <br />
                  </>
                )}
                {city && <>{city}, </>} {state} {zip_code}
              </dd>
            </div>
          )}
          {phone_number && (
            <div className="flex">
              <dt className="w-24 flex-none">Direct:</dt>
              <dd>
                <a href={`tel:${phone_number}`}>{phone_number}</a>
              </dd>
            </div>
          )}
          {office_number && (
            <div className="flex">
              <dt className="w-24 flex-none">Office:</dt>
              <dd>
                <a href={`tel:${office_number}`}>{office_number}</a>
              </dd>
            </div>
          )}
          {email && (
            <div className="flex">
              <dt className="w-24 flex-none">Email:</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
          )}
        </dl>
      )
    }

    const renderSocial = (className?: string) => (
      <div style={{ color: footerTextColor }} className={className}>
        <Social links={socialLinks} className={className} />
      </div>
    )

  const renderQuickLinks = (linksArray: any[], heading: string) => (
    <div>
      {heading &&
        <h3 className="font-semibold mb-4" style={{ color: footerHeaderColor }}>
          {heading}
        </h3>
      }
      <ul
        className={cn(
          layout === "minimal" || layout === "single-column" ? "flex flex-wrap items-center gap-4" : "space-y-2",
          layout === "single-column" && "justify-center",
        )}
      >      {linksArray?.map((link: any) => {
          const quickLinks =
            (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "team" && `/team/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "homeDesign" && `/`) ||
            (link.externalUrl && `${link.externalUrl}`) ||
            "/" // Fallback to home page if no valid link is found

          return (
            <li key={link._key}>
              {link.externalUrl ? (
                <a
                  href={link.externalUrl}
                  target={link.newTab ? "_blank" : undefined}
                  className="text-sm hover:underline"
                >
                  {link.text}
                </a>
              ) : (
                <Link
                  href={quickLinks}
                  target={link.newTab ? "_blank" : undefined}
                  className="text-sm hover:underline"
                  style={{ color: footerTextColor }}
                >
                  {link.text}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderFooterText = (
    footerText &&
    <div className="text-sm mb-4">
      <ContentEditor content={footerText} />
    </div>
  )

  const renderDefaultLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        {renderLogo()}
        {shortText && <p className="text-sm mb-4">{shortText}</p>}
        {renderFooterText}
        {renderSocial()}
      </div>
      <div>
        <h3 className="font-semibold mb-4" style={{ color: footerHeaderColor }}>
          Contact Information
        </h3>
        {renderContactInfo()}
      </div>
      {links && renderQuickLinks(links, quickLinksHeading || "Quick Links")}
      {secondLinks && renderQuickLinks(secondLinks, quickLinksTwoHeading || "Resources")}
    </div>
  )


  const renderSingleColumnLayout = () => (
    <div className="text-center">
      {renderLogo()}
      {shortText && <p className="text-sm mb-4">{shortText}</p>}
      {footerText && (
        <div className="text-sm mb-4">
          <ContentEditor content={footerText} />
        </div>
      )}
      <div className="mb-8">{links && renderQuickLinks(links, "")}</div>
      {renderSocial("justify-center")}
      <div className="mt-8">
        {renderContactInfo("single-column")}
      </div>
    </div>
  )

  const renderMinimalLayout = () => (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">{renderLogo()}
        <div className="max-w-lg text-sm">
          <ContentEditor content={footerText} />
        </div>
        <div className="mb-6">
        {renderContactInfo("single-column")}
        </div>
        <div>
          {links && renderQuickLinks(links, quickLinksHeading || "Quick Links")}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        {renderSocial()}
      </div>
    </div>
  )

  const renderTwoColumnLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        {renderLogo()}
        {shortText && <p className="text-sm mb-4">{shortText}</p>}
        {renderSocial()}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {links && renderQuickLinks(links, quickLinksHeading || "Quick Links")}
        <div>
          <h3 className="font-semibold mb-4" style={{ color: footerHeaderColor }}>
            Contact Information
          </h3>
          {renderContactInfo()}
        </div>
      </div>
    </div>
  )

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div className="col-span-full xl:col-span-1">
        {renderLogo()}
        {shortText && <p className="text-sm mb-4">{shortText}</p>}
        {renderFooterText}
        {renderSocial()}
      </div>
      {links && renderQuickLinks(links, quickLinksHeading || "Quick Links")}
      {secondLinks && renderQuickLinks(secondLinks, quickLinksTwoHeading || "Resources")}
      <div>
        <h3 className="font-semibold mb-4" style={{ color: footerHeaderColor }}>
          Contact Information
        </h3>
        {renderContactInfo()}
      </div>
    </div>
  )

  const renderFooterContent = () => {
    switch (layout) {
      case "single-column":
        return renderSingleColumnLayout()
      case "minimal":
        return renderMinimalLayout()
      case "two-column":
        return renderTwoColumnLayout()
      case "grid":
        return renderGridLayout()
      case "default":
      default:
        return renderDefaultLayout()
    }
  }

  return (
    <footer
      className="py-12"
      style={{
        backgroundColor: footerBackgroundColor,
        color: footerTextColor,
      }}
    >
      <div className="container mx-auto px-4">
        {renderFooterContent()}
        <div className="mt-8 pt-8 border-t border-gray-200">
          {footerDisclaimer && (
            <div className="text-xs mb-4">
              <ContentEditor content={footerDisclaimer} />
            </div>
          )}
          {legal && (
            <ul className="flex flex-wrap gap-4 mb-4">
              {legal.map((item: any) => (
                <li key={item._key}>
                  <Link href={`/legal/${item.slug}`} className="text-xs hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs">
            &copy; Copyright {new Date().getFullYear()} &middot; {company_name} &middot; Website built by{" "}
            <a
              href="https://www.hungryram.com/"
              className="font-bold hover:underline"
              target="_blank"
            >
              Hungry Ram
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}