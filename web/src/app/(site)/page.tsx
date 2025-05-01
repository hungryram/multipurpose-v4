import { client } from '../../../lib/sanity';
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
    />
  )
}