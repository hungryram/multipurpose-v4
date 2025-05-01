import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('secret')

  if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // Revalidate the entire site starting from root
    revalidatePath('/')
    return new Response('Site revalidated.', { status: 200 })
  } catch (err) {
    return new Response('Error revalidating', { status: 500 })
  }
}
