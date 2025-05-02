This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhungryram%2Fmultipurpose-v4&repository-name=multipurpose-v4&project-name=multipurpose-v4&env=NEXT_PUBLIC_SANITY_PROJECT_ID,SANITY_STUDIO_PROJECT_ID,SANITY_STUDIO_DATASET,NEXT_PUBLIC_SANITY_DATASET,REVALIDATE_SECRET_TOKEN&demo-title=Website%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&external-id=nextjs;template=nextjs-blog-cms-sanity-v3&root-directory=web

[![Deploy WEB with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhungryram%2Fmultipurpose-v4&repository-name=multipurpose-v4&project-name=multipurpose-v4&env=NEXT_PUBLIC_SANITY_PROJECT_ID,SANITY_STUDIO_PROJECT_ID,SANITY_STUDIO_DATASET,NEXT_PUBLIC_SANITY_DATASET,REVALIDATE_SECRET_TOKEN&demo-title=Website%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&external-id=nextjs&template=nextjs-blog-cms-sanity-v3&root-directory=web)

[![Deploy ADMIN with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhungryram%2Fmultipurpose-v4&repository-name=multipurpose-v4&project-name=multipurpose-v4&env=NEXT_PUBLIC_SANITY_PROJECT_ID,SANITY_STUDIO_PROJECT_ID,SANITY_STUDIO_DATASET,NEXT_PUBLIC_SANITY_DATASET,REVALIDATE_SECRET_TOKEN&demo-title=Website%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&external-id=nextjs&template=nextjs-blog-cms-sanity-v3&root-directory=cms%2Fadmin)



Generate Secret Token with node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"