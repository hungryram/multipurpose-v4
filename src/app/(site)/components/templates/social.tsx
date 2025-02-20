import React from "react"
import {
  AiFillInstagram,
  AiFillRedditCircle,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai"
import { FaYelp, FaTiktok } from "react-icons/fa"
import { BsPinterest } from "react-icons/bs"
import { SiZillow } from "react-icons/si"
import { cn } from "@/lib/utils"

interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

interface SocialProps {
  links: {
    facebook?: string
    youtube?: string
    instagram?: string
    twitter?: string
    reddit?: string
    linkedin?: string
    yelp?: string
    pinterest?: string
    tiktok?: string
    zillow?: string
  }
  size?: "small" | "medium" | "large"
  className?: string
}

const socialIcons = {
  facebook: AiFillFacebook,
  youtube: AiFillYoutube,
  instagram: AiFillInstagram,
  twitter: AiFillTwitterCircle,
  reddit: AiFillRedditCircle,
  linkedin: AiFillLinkedin,
  yelp: FaYelp,
  pinterest: BsPinterest,
  tiktok: FaTiktok,
  zillow: SiZillow,
}

export default function Social({ links = {}, size = "medium", className }: SocialProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  }

  if (typeof links !== "object" || links === null) {
    console.error("Social component: links prop must be an object")
    return null
  }

  const socialLinks: SocialLink[] = Object.entries(links)
    .filter(([_, url]) => url && typeof url === "string")
    .map(([name, url]) => ({
      name,
      url,
      icon: React.createElement(socialIcons[name as keyof typeof socialIcons], {
        className: cn(sizeClasses[size], "transition-colors duration-200"),
      }),
    }))

  if (socialLinks.length === 0) {
    return null
  }

  return (
    <div className={cn("flex items-center space-x-4 py-4", className)}>
      {socialLinks.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${name} page`}
          className="hover:text-primary transition-colors duration-200"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}

