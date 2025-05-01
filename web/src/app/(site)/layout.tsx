import { client } from '../../../lib/sanity'
import Footer from './components/global/footer'
import Navbar from './components/global/navbar'
import './globals.css'
import { appearance, mainLayoutProfile } from '../../../lib/groq-data'
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google'
import { bodyFont, headingFont } from '../fonts'
import Pixel from './components/global/pixel'

// GENERATES SEO
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(mainLayoutProfile)

  return {
    title: data?.profileSettings?.seo?.title_tag,
    description: data?.profileSettings?.seo?.meta_description,
    alternates: {
      canonical: data?.profileSettings?.settings?.websiteName
    },
    openGraph: {
      title: data?.profileSettings?.seo?.title_tag,
      description: data?.profileSettings?.seo?.meta_description,
      url: data?.profileSettings?.settings?.websiteName,
      siteName: data?.profileSettings?.company_name,
      images: data?.profileSettings?.seo?.sharingImageBanner?.asset?.url,
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.profileSettings?.seo?.title_tag,
      description: data?.profileSettings?.seo?.meta_description,
      creator: '@' + data?.profileSettings?.seo?.twitterHandle,
    },
    icons: {
      icon: data.appearances?.branding?.favicon?.asset?.url,
      shortcut: data.appearances?.branding?.favicon?.asset?.url,
      apple: data.appearances?.branding?.favicon?.asset?.url,
    },
    verification: {
      google: data?.profileSettings?.settings?.googleVerification
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const data = await client.fetch(appearance)

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...(data?.profileSettings?.company_name && { "name": data?.profileSettings?.company_name }),
    ...(data?.profileSettings?.seo?.meta_description && { "description": data?.profileSettings?.seo?.meta_description }),
    ...(data?.profileSettings?.settings?.websiteName && { "url": data?.profileSettings?.settings?.websiteName }),
    ...(data.appearances?.branding?.logo?.asset?.url && { "logo": data.appearances?.branding?.logo?.asset?.url }),
    ...(data?.profileSettings?.seo?.imageData?.asset?.url && { "image": data?.profileSettings?.seo?.imageData?.asset?.url }),
    "address": {
      "@type": "PostalAddress",
      ...(data?.profileSettings?.address?.address && { "streetAddress": data?.profileSettings?.address?.address }),
      ...(data?.profileSettings?.address?.city && { "addressLocality": data?.profileSettings?.address?.city }),
      ...(data?.profileSettings?.address?.state && { "addressRegion": data?.profileSettings?.address?.state }),
      ...(data?.profileSettings?.address?.zip_code && { "postalCode": data?.profileSettings?.address?.zip_code }),
      ...(data?.profileSettings?.address?.addressCountry && { "addressCountry": data?.profileSettings?.address?.addressCountry })
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        ...(data?.profileSettings?.contact_information?.office_number && { "telephone": data?.profileSettings?.contact_information?.office_number }),
        ...(data?.profileSettings?.contact_information?.office_number && { "ContactType": "Office Phone" }),
        ...(data?.profileSettings?.contact_information?.email && { "email": data?.profileSettings?.contact_information?.email }),
      },
      {
        "@type": "ContactPoint",
        ...(data?.profileSettings?.contact_information?.phone_number && { "telephone": data?.profileSettings?.contact_information?.phone_number }),
        ...(data?.profileSettings?.contact_information?.phone_number && { "ContactType": "Direct Phone" }),
      },
    ],
    "sameAs": [
      ...(data?.profileSettings?.social?.facebook ? [data.profileSettings.social.facebook] : []),
      ...(data?.profileSettings?.social?.x ? [data.profileSettings.social.x] : []),
      ...(data?.profileSettings?.social?.instagram ? [data.profileSettings.social.instagram] : []),
      ...(data?.profileSettings?.social?.youtube ? [data.profileSettings.social.youtube] : []),
      ...(data?.profileSettings?.social?.reddit ? [data.profileSettings.social.reddit] : []),
      ...(data?.profileSettings?.social?.linkedin ? [data.profileSettings.social.linkedin] : []),
      ...(data?.profileSettings?.social?.yelp ? [data.profileSettings.social.yelp] : []),
      ...(data?.profileSettings?.social?.pinterest ? [data.profileSettings.social.pinterest] : []),
      ...(data?.profileSettings?.social?.tiktok ? [data.profileSettings.social.tiktok] : []),
      ...(data?.profileSettings?.social?.zillow ? [data.profileSettings.social.zillow] : [])
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Fill the website schema based on localBusiness schema
    ...(data?.profileSettings?.company_name && { "name": data?.profileSettings?.company_name }),
    ...(data?.profileSettings?.settings?.websiteName && { "url": data?.profileSettings?.settings?.websiteName }),
    ...(data?.profileSettings?.seo?.meta_description && { "description": data?.profileSettings?.seo?.meta_description }),
  };

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        {data?.profileSettings?.settings?.googleID &&
          <GoogleAnalytics gaId={data?.profileSettings?.settings?.googleID} />
        }
        {data?.profileSettings?.settings?.facebookPixel &&
          <Pixel
            facebookPixel={data?.profileSettings?.settings?.facebookPixel}
          />
        }
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <style>
          {`
              :root {
                  --swiper-navigation-size: 30px;
                  --top-header-background: ${data.appearances?.topHeaderBar?.topHeaderBarBgColor};
                  --top-header-text-color: ${data.appearances?.topHeaderBar?.topHeaderBarTextColor};
                  --primary-accent: ${data.appearances?.primaryAccent ?? '#cccccc'};
                  --radio-color: ${data.appearances?.primaryAccent ?? '#cccccc'};

                  --primary-button-background: ${data.appearances?.primaryButtonBg ?? 'transparent'};
                  --primary-button-text: ${data.appearances?.primaryButtonText ?? '#000000'};
                  --secondary-button-background: ${data.appearances?.secondaryButtonBg ?? 'transparent'};
                  --secondary-button-text: ${data.appearances?.secondaryButtonText ?? '#cccccc'};
                  --secondary-color: ${data.appearances?.secondaryColor ?? '#cccccc'};

                  --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                  --header-scroll-background-color: ${data.appearances?.navBgScrollColor ? data.appearances?.navBgScrollColor : 'transparent'};
                  --header-navigation-color: ${data.appearances?.navColor ?? '#ffffff'};
                  --header-navigation-scroll-color: ${data.appearances?.navScrollColor};

                  --mobile-icon-color: ${data.appearances?.mobileIconColor ?? '#ffffff'};
                  --mobile-bg-color: ${data?.appearances?.mobileMenu?.mobileBgDrawer};
                  --mobile-nav-color: ${data?.appearances?.mobileMenu?.mobileNavColor};

                  --loading-background-color: ${data.appearances?.loaderColor ?? '#0e0e0e'};
                  --loading-image: url(${data.appearances?.loaderImage});

                  --website-body-color: ${data.appearances?.websiteBodyColor ?? '#fff'};
                  --website-text-color: ${data.appearances?.websiteTextColor ?? '#222'};
                  --website-heading-color: ${data.appearances?.websiteHeadingColor ?? '#000'};

                  --button-radius: ${`${data.appearances?.buttonRadius ?? 6}px`};
                  --button-y-padding: ${`${data.appearances?.buttonYPadding ?? 8}px`};
                  --button-x-padding: ${`${data.appearances?.buttonXPadding ?? 12}px`};
                  
                  --announcementbar-background-color: ${data.appearances?.announcementBar?.announcementBgColor};
                  --announcementbar-text-color: ${data.appearances?.announcementBar?.announcementTextColor};
              }
          `}
        </style>
        <Navbar
          navbarData={data}
        />
        <main id="mainBody">
          {children}
        </main>
        <Footer
          footerData={data}
        />
      </body>
    </html>
  )
}
