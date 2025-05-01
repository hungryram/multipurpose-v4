import { revalidatePath } from "next/cache"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  // Verify the secret token
  const token = req.nextUrl.searchParams.get("secret")
  if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    // Parse the Sanity webhook payload
    const body = await req.json()

    // Extract content type and slug information
    // Note: Sanity sends slug as an object with a current property
    const { _type, slug } = body
    const slugValue = typeof slug === "object" ? slug?.current : slug

    if (!_type) {
      return new Response("Missing _type in webhook payload", { status: 400 })
    }

    console.log(`Received revalidation request for: ${_type} ${slugValue || ""}`)

    // Targeted revalidation based on content type
    switch (_type) {
      case "post":
        if (slugValue) {
          await revalidatePath(`/blog/${slugValue}`)
          console.log(`Revalidated blog post: ${slugValue}`)
        }
        // Always revalidate the blog listing pages
        await revalidatePath("/blog")
        await revalidatePath("/blog-pagination")
        console.log("Revalidated blog listings")
        break

      case "site":
        if (slugValue) {
          await revalidatePath(`/site/${slugValue}`)
          console.log(`Revalidated site page: ${slugValue}`)
        }
        break

      case "legal":
        if (slugValue) {
          await revalidatePath(`/legal/${slugValue}`)
          console.log(`Revalidated legal page: ${slugValue}`)
        }
        // Also revalidate the legal index
        await revalidatePath("/legal")
        console.log("Revalidated legal index")
        break

      case "service":
        if (slugValue) {
          await revalidatePath(`/services/${slugValue}`)
          console.log(`Revalidated service page: ${slugValue}`)
        }
        // Also revalidate the services index
        await revalidatePath("/services")
        console.log("Revalidated services index")
        break

      case "team":
        if (slugValue) {
          await revalidatePath(`/team/${slugValue}`)
          console.log(`Revalidated team member: ${slugValue}`)
        }
        // Also revalidate the team index
        await revalidatePath("/team")
        console.log("Revalidated team index")
        break

      case "home":
        // Revalidate the homepage
        await revalidatePath("/")
        console.log("Revalidated homepage")
        break

      default:
        // For other content types or when no specific path can be determined
        // Fall back to revalidating the entire site
        await revalidatePath("/", "layout")
        console.log(`Revalidated entire site for content type: ${_type}`)
    }

    return new Response(
      JSON.stringify({
        revalidated: true,
        message: `Revalidated ${_type} ${slugValue || ""}`,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (err) {
    console.error("Revalidation error:", err)
    return new Response(
      JSON.stringify({
        error: "Error revalidating",
        message: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
