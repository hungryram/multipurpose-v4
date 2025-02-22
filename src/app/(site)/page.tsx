import { client } from '../../../sanity/lib/client';
import Main from './components/templates/page-builder';
import { homePageData } from '../../../lib/groq-data';

export const revalidate = 0;

export default async function Home() {
  const data = await client.fetch(homePageData)

  return (
    <Main
      pageBuilder={data.homeAppearance?.homePage?.pageBuilder}
      allTestimonials={data.allTestimonial}
      allServices={data.allServices}
      allTeam={data.allTeam}
      allBlog={data.allBlog}
      // CONTACT
      email={data?.profileSettings?.contact_information?.email}
      phone_number={data?.profileSettings?.contact_information?.phone_number}
      office_number={data?.profileSettings?.contact_information?.office_number}
      address={data?.profileSettings?.address?.address}
      city={data?.profileSettings?.address?.city}
      state={data?.profileSettings?.address?.state}
      zip_code={data?.profileSettings?.address?.zip_code}
      // SOCIAL
      facebook={data?.profileSettings?.social?.facebook}
      youtube={data?.profileSettings?.social?.youtube}
      instagram={data?.profileSettings?.social?.instagram}
      twitter={data?.profileSettings?.social?.twitter}
      reddit={data?.profileSettings?.social?.reddit}
      linkedin={data?.profileSettings?.social?.linkedin}
      yelp={data?.profileSettings?.social?.yelp}
      pinterest={data?.profileSettings?.social?.pinterest}
      tiktok={data?.profileSettings?.social?.tiktok}
      zillow={data?.profileSettings?.social?.zillow}
    />
  )
}