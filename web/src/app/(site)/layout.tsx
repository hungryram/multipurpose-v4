import { client } from '../../../lib/sanity'
import Footer from './components/global/footer'
import Navbar from './components/global/navbar'
import './globals.css'
import { appearance, mainLayoutProfile } from '../../../lib/groq-data'
import { Metadata } from 'next';
import { bodyFont, headingFont } from '../fonts'
import Pixel from './components/global/pixel'
import GoogleAnalytics from './components/global/analytics'
import { generatePageMetadata } from './components/util/generateMetaData'
import { localBusiness, websiteSchema } from './components/util/seo-schema'
import { buildThemeVariables } from './components/util/theme-variables'
import ThemeStyle from './components/util/theme-styles'

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    fetcher: () => client.fetch(mainLayoutProfile),
    mainKey: 'profileSettings',
    type: 'layout'
  });
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const data = await client.fetch(appearance)
  const theme = buildThemeVariables(data);
  const localBusinessSchema = localBusiness(data);
  const websiteSchemaObj = websiteSchema(data);

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema, null, 0)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchemaObj, null, 0)
          }}
        />
        {data?.profileSettings?.settings?.googleID &&
          <GoogleAnalytics GA_TRACKING_ID={data?.profileSettings?.settings?.googleID} />
        }
        {data?.profileSettings?.settings?.facebookPixel &&
          <Pixel
            facebookPixel={data?.profileSettings?.settings?.facebookPixel}
          />
        }
        <ThemeStyle theme={theme} />
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
