## Deploy on Vercel

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhungryram%2Fmultipurpose-v4&repository-name=multipurpose-v4&project-name=multipurpose-v4&env=NEXT_PUBLIC_SANITY_PROJECT_ID,SANITY_STUDIO_PROJECT_ID,SANITY_STUDIO_DATASET,NEXT_PUBLIC_SANITY_DATASET,REVALIDATE_SECRET_TOKEN&demo-title=Website%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&external-id=nextjs;template=nextjs-blog-cms-sanity-v3&root-directory=web

### Deploy the WEB

[![Deploy WEB with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhungryram%2Fmultipurpose-v4&repository-name=multipurpose-v4&project-name=multipurpose-v4&env=NEXT_PUBLIC_SANITY_PROJECT_ID,SANITY_STUDIO_PROJECT_ID,SANITY_STUDIO_DATASET,NEXT_PUBLIC_SANITY_DATASET,REVALIDATE_SECRET_TOKEN&demo-title=Website%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&external-id=nextjs&template=nextjs-blog-cms-sanity-v3&root-directory=web)

### Deploy the ADMIN

[![Deploy Admin](https://vercel.com/button)](https://vercel.com/new/project?template=sanity&root-directory=cms/admin)

## INSTRUCTIONS

Create Sanity project at https://www.sanity.io/manage/personal/projects
Name dataset production

Add in the needed env variables:

SANITY_STUDIO_PROJECT_ID=
NEXT_PUBLIC_SANITY_PROJECT_ID=
SANITY_STUDIO_DATASET=production
NEXT_PUBLIC_SANITY_DATASET=production
REVALIDATE_SECRET_TOKEN=

Generate Secret Token with node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"