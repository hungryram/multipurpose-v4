import Link from "next/link"
import Image from "next/image"
import ContentEditor from "../util/content-editor"
import Social from "../templates/social"
import { cn } from "@/lib/utils"
import { FooterProps } from "@/lib/types"
import { baseEncode } from "../../../../../lib/utils"

export default function Footer({
  footerData,
}: FooterProps) {

  // DEFINE FOOTER LAYOUT
  const layout = footerData?.appearances?.footer?.layoutType
  const social = footerData?.profileSettings?.social

  const socialLinks = {
    googleBusiness: social?.googleBusiness,
    facebook: social?.facebook,
    youtube: social?.youtube,
    instagram: social?.instagram,
    twitter: social?.twitter,
    reddit: social?.reddit,
    linkedin: social?.linkedin,
    yelp: social?.yelp,
    pinterest: social?.pinterest,
    tiktok: social?.tiktok,
    zillow: social?.zillow,
  }


  const renderLogo = () =>
    footerData?.appearances?.footer?.footerLogo?.asset?.url ? (
      <div className={`${layout === 'single-column' ? 'flex justify-center' : 'flex justify-center md:justify-start'}`}>
        <Image
          src={footerData?.appearances?.footer?.footerLogo?.asset?.url || "/placeholder.svg"}
          width={200}
          height={50}
          alt={footerData?.appearances?.footer?.footerLogo?.asset?.altText || footerData?.profileSettings?.company_name}
          className="mb-6"
          placeholder={"blur"}
          blurDataURL={footerData?.appearances?.footer?.footerLogo?.asset?.lqip || baseEncode}
        />
      </div>
    ) : (
      <h2 className="text-2xl font-semibold mb-4" style={{ color: footerData?.data?.appearances?.footerHeader }}>
        {footerData?.profileSettings?.company_name}
      </h2>
    )

  const renderContactInfo = (layout?: "single-column") => {
    if (layout === "single-column") {
      return (
        <div className="space-x-10 text-sm flex justify-center">
          {(footerData.profileSettings?.address?.address || footerData.profileSettings?.address?.city || footerData.profileSettings?.address?.state || footerData.profileSettings?.address?.zip_code) && (
            <div>
              {footerData.profileSettings?.address?.address && <>{footerData.profileSettings?.address?.address} </>}
              {footerData.profileSettings?.address?.city && <>{footerData.profileSettings?.address?.city}, </>}
              {footerData.profileSettings?.address?.state} {footerData.profileSettings?.address?.zip_code}
            </div>
          )}
          {footerData.profileSettings?.contact_information?.phone_number && (
            <div>
              <a href={`tel:${footerData.profileSettings?.contact_information?.phone_number}`}>{footerData.profileSettings?.contact_information?.phone_number}</a>
            </div>
          )}
          {footerData.profileSettings?.contact_information?.office_number && (
            <div>
              <a href={`tel:${footerData.profileSettings?.contact_information?.office_number}`}>{footerData.profileSettings?.contact_information?.office_number}</a>
            </div>
          )}
          {footerData.profileSettings?.contact_information?.email && (
            <div>
              <a href={`mailto:${footerData.profileSettings?.contact_information?.email}`}>{footerData.profileSettings?.contact_information?.email}</a>
            </div>
          )}
        </div>
      )
    }

    return (
      <dl className="space-y-4 text-sm leading-6">
        {(footerData.profileSettings?.address?.address || footerData.profileSettings?.address?.city || footerData.profileSettings?.address?.state || footerData.profileSettings?.address?.zip_code) && (
          <div className="flex">
            <dt className="w-24 flex-none">Address:</dt>
            <dd>
              {footerData.profileSettings?.address?.address && (
                <>
                  {footerData.profileSettings?.address?.address}, <br />
                </>
              )}
              {footerData.profileSettings?.address?.city && <>{footerData.profileSettings?.address?.city}, </>} {footerData.profileSettings?.address?.state} {footerData.profileSettings?.address?.zip_code}
            </dd>
          </div>
        )}
        {footerData?.profileSettings?.contact_information?.phone_number && (
          <div className="flex">
            <dt className="w-24 flex-none">Direct:</dt>
            <dd>
              <a href={`tel:${footerData?.profileSettings?.contact_information?.phone_number}`}>{footerData?.profileSettings?.contact_information?.phone_number}</a>
            </dd>
          </div>
        )}
        {footerData?.profileSettings?.contact_information?.office_number && (
          <div className="flex">
            <dt className="w-24 flex-none">Office:</dt>
            <dd>
              <a href={`tel:${footerData?.profileSettings?.contact_information?.office_number}`}>{footerData?.profileSettings?.contact_information?.office_number}</a>
            </dd>
          </div>
        )}
        {footerData?.profileSettings?.contact_information?.email && (
          <div className="flex">
            <dt className="w-24 flex-none">Email:</dt>
            <dd>
              <a href={`mailto:${footerData?.profileSettings?.contact_information?.email}`}>{footerData?.profileSettings?.contact_information?.email}</a>
            </dd>
          </div>
        )}
      </dl>
    )
  }

  const renderSocial = (className?: string) => (
    <div style={{ color: footerData?.appearances?.footerText }} className={className}>
      <Social links={socialLinks} className={className} />
    </div>
  )

  const renderQuickLinks = (linksArray: any[], heading: string) => (
    <div>
      {heading &&
        <h3 className="font-semibold mb-4" style={{ color: footerData?.data?.appearances?.footerHeader }}>
          {heading}
        </h3>
      }
      <ul
        className={cn(
          layout === "minimal" || layout === "single-column" ? "flex flex-wrap items-center gap-4" : "space-y-2",
          layout === "single-column" && "justify-center",
        )}
      >
        {linksArray?.map((link: any) => {
          const quickLinks =
            (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "team" && `/team/${link.internalLink.slug}`) ||
            (link.internalLink?._type === "homeDesign" && `/`) ||
            (link.internalPath && link.internalPath) ||
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
                  style={{ color: footerData?.appearances?.footerText }}
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
    footerData?.appearances?.footer?.footerText &&
    <div className="text-sm mb-4">
      <ContentEditor content={footerData?.appearances?.footer?.footerText} />
    </div>
  )

  const renderDefaultLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        {renderLogo()}
        {renderFooterText}
        {renderSocial()}
      </div>
      <div>
        <h3 className="font-semibold mb-4" style={{ color: footerData?.data?.appearances?.footerHeader }}>
          Contact Information
        </h3>
        {renderContactInfo()}
      </div>
      {footerData?.appearances?.footer?.quickLinks && renderQuickLinks(footerData?.appearances?.footer?.quickLinks, footerData?.appearances?.footer?.quickLinksHeading || "Quick Links")}
      {footerData?.appearances?.footer?.secondQuickLinks && renderQuickLinks(footerData?.appearances?.footer?.secondQuickLinks, footerData?.appearances?.footer?.quickLinksTwoHeading || "Resources")}
    </div>
  )


  const renderSingleColumnLayout = () => (
    <div className="text-center">
      {renderLogo()}
      {footerData?.appearances?.footer?.footerText && (
        <div className="text-sm mb-4">
          <ContentEditor content={footerData?.appearances?.footer?.footerText} />
        </div>
      )}
      <div className="mb-8">{footerData?.appearances?.footer?.quickLinks && renderQuickLinks(footerData?.appearances?.footer?.quickLinks, "")}</div>
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
          <ContentEditor content={footerData?.appearances?.footer?.footerText} />
        </div>
        <div className="mb-6">
          {renderContactInfo("single-column")}
        </div>
        <div>
          {footerData?.appearances?.footer?.quickLinks && renderQuickLinks(footerData?.appearances?.footer?.quickLinks, footerData?.appearances?.footer?.quickLinksHeading || "Quick Links")}
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
        {renderSocial()}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {footerData?.appearances?.footer?.quickLinks && renderQuickLinks(footerData?.appearances?.footer?.quickLinks, footerData?.appearances?.footer?.quickLinksHeading || "Quick Links")}
        <div>
          <h3 className="font-semibold mb-4" style={{ color: footerData?.data?.appearances?.footerHeader }}>
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
        {renderFooterText}
        {renderSocial()}
      </div>
      {footerData?.appearances?.footer?.quickLinks && renderQuickLinks(footerData?.appearances?.footer?.quickLinks, footerData?.appearances?.footer?.quickLinksHeading || "Quick Links")}
      {footerData?.appearances?.footer?.secondQuickLinks && renderQuickLinks(footerData?.appearances?.footer?.secondQuickLinks, footerData?.appearances?.footer?.quickLinksTwoHeading || "Resources")}
      <div>
        <h3 className="font-semibold mb-4" style={{ color: footerData?.data?.appearances?.footerHeader }}>
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
        backgroundColor: footerData?.appearances?.footerBg,
        color: footerData?.appearances?.footerText,
      }}
    >
      <div className="container mx-auto px-4">
        {renderFooterContent()}
        <div className="mt-8 pt-8 border-t border-gray-200">
          {footerData?.appearances?.footer?.footerDisclaimer && (
            <div className="text-xs mb-4">
              <ContentEditor content={footerData?.appearances?.footer?.footerDisclaimer} />
            </div>
          )}
          {footerData?.legal && (
            <ul className="flex flex-wrap gap-4 mb-4">
              {footerData?.legal.map((item: any) => (
                <li key={item._key}>
                  <Link href={`/legal/${item.slug}`} className="text-xs hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs">
            &copy; Copyright {new Date().getFullYear()} &middot; {footerData.profileSettings?.company_name} &middot; Website built by{" "}
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