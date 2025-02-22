"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ContentEditor from "../util/content-editor"
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6"
import HeaderSection from "./header-section"
import { TeamComponentProps, TeamMember } from "@/lib/types"


export default function TeamComponent({
  team,
  content,
  textAlign,
  layout,
  primaryButton,
  textColor,
  secondaryButton,
  columns,
  limit = Number.POSITIVE_INFINITY,
}: TeamComponentProps) {

  const renderContent = (
    <div className="mb-16 content" style={{ color: textColor }}>
      <HeaderSection
        content={Array.isArray(content) ? content : []}
        textAlign={textAlign}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  const renderTeam = () => {
    const limitedTeam = team.slice(0, limit === Number.POSITIVE_INFINITY ? team.length : limit)
    switch (layout) {
      case "carousel":
        return (
          <Carousel
            className="w-full mx-auto"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {limitedTeam.map((member) => (
                <CarouselItem key={member._id} className={`md:basis-1/${columns}`}>
                  <div className="p-1">
                    <TeamCard member={member} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )
      case "list":
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            {limitedTeam.map((member) => (
              <TeamCard key={member._id} member={member} layout="list" />
            ))}
          </div>
        )
      case "grid":
      default:
        return (
          <div
            className={cn("grid gap-8", {
              "sm:grid-cols-2": columns === 2,
              "sm:grid-cols-3": columns === 3,
              "sm:grid-cols-4": columns === 4,
            })}
          >
            {limitedTeam.map((member) => (
              <TeamCard key={member._id} member={member} />
            ))}
          </div>
        )
    }
  }

  return (
      <div>
        {renderContent}
        <div className={cn("mx-auto", content && "mt-16")}>{renderTeam()}</div>
      </div>
  )
}

function TeamCard({ member, layout = "grid" }: { member: TeamMember; layout?: "grid" | "list" }) {
  return (
    <Card className={cn(layout === "list" && "flex items-start")}>
      <CardContent className={cn("p-6", layout === "list" && "flex-grow")}>
        <div className={cn("mb-4", layout === "list" && "mr-6")}>
          <div className={cn("relative", layout === "list" ? "w-24 h-24" : "w-full pb-[100%]")}>
            <Image
              src={member.imageData.asset.url || "/placeholder.svg"}
              alt={member.imageData.asset.altText || member.name}
              placeholder={member.imageData.asset.lqip ? "blur" : "empty"}
              blurDataURL={member.imageData.asset.lqip}
              fill={true}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{member.position}</p>
        <div className="text-sm text-gray-600 mb-4">
          <ContentEditor content={member.bio} />
        </div>
        <div className="flex space-x-2">
          {member.linkedin && (
            <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-600 hover:text-blue-600" />
            </Link>
          )}
          {member.twitter && (
            <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-600 hover:text-blue-400" />
            </Link>
          )}
          {member.email && (
            <Link href={`mailto:${member.email}`}>
              <FaEnvelope className="text-gray-600 hover:text-red-600" />
            </Link>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/team/${member.slug.current}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
