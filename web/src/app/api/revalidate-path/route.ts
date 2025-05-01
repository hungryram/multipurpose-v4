import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.REVALIDATE_SECRET_TOKEN

  // Check the secret token
  if (req.query.token !== secret) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const { _type, slug = {} } = req.body

  try {
    // Home page
    if (_type === 'homeDesign') {
      await res.revalidate('/')
    }

    // Generic pages
    else if (_type === 'page' && slug.current) {
      await res.revalidate(`/${slug.current}`)
    }

    // Blog posts
    else if (_type === 'blog' && slug.current) {
      await res.revalidate(`/blog/${slug.current}`)
    }

    // Services
    else if (_type === 'services' && slug.current) {
      await res.revalidate(`/services/${slug.current}`)
    }

    // Team
    else if (_type === 'team' && slug.current) {
      await res.revalidate(`/team/${slug.current}`)
    }

    // Legal pages
    else if (_type === 'legal' && slug.current) {
      await res.revalidate(`/legal/${slug.current}`)
    }

    // fallback
    else {
      return res.status(400).json({ message: 'Unhandled _type or missing slug' })
    }

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: err })
  }
}
