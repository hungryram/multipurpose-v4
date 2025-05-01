import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const path = req.nextUrl.searchParams.get('path') || '/'
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate-path?path=${path}`, {
      method: 'POST',
    })

    return new Response(`Revalidated: ${path}`, { status: 200 })
  } catch (err) {
    return new Response('Error revalidating', { status: 500 })
  }
}
