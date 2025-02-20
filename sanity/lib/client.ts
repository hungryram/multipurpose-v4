import { createClient } from 'next-sanity'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-09'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
})
