import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('secret')

  if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    await revalidatePath('/', 'layout')
    console.log('Revalidated / via POST')
    return new Response('Site revalidated.', { status: 200 })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new Response('Error revalidating', { status: 500 })
  }
}
