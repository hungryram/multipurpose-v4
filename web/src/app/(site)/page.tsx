import { client } from '../../../lib/sanity';
import { homePageData } from '../../../lib/groq-data';
import PageBuilder from './components/page-builder/page-builder';

export default async function Home() {
  const data = await client.fetch(homePageData)

  return (
    <PageBuilder
      pageBuilder={data.homeAppearance?.homePage?.pageBuilder}
      allTestimonials={data.allTestimonial}
      allServices={data.allServices}
      allTeam={data.allTeam}
      allBlog={data.allBlog}
    />
  )
}