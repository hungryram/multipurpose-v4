import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import ContentEditor from "../util/content-editor"
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6"
import HeaderSection from "../util/header-section"
import { TeamComponentProps, TeamMember } from "@/lib/types"
import BaseSlider from "../templates/client/gallery-slider-client"

export default function TeamComponent({
  team,
  section
}: {
  team: any,
  section: TeamComponentProps
}) {

  const {
    content,
    textAlign,
    layoutType,
    primaryButton,
    textColor,
    secondaryButton,
    columnNumber,
    limit = Number.POSITIVE_INFINITY,
  } = section || {}

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
    switch (layoutType) {
      case "carousel":
        return (
          <BaseSlider
            slides={limitedTeam.map((member) => (
              <TeamCard key={member._id} member={member} />
            ))}
            slideNumber={columnNumber}
          />
        )
      case "list":
        return (
          <div className="space-y-8 max-w-3xl mx-auto">
            {limitedTeam.map((member) => (
              <TeamCard key={member._id} member={member} layoutType="list" />
            ))}
          </div>
        )
      case "grid":
      default:
        return (
          <div
            className={cn("grid gap-8", {
              "sm:grid-cols-2": columnNumber === 2,
              "sm:grid-cols-3": columnNumber === 3,
              "sm:grid-cols-4": columnNumber === 4,
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

function TeamCard({ member, layoutType = "grid" }: { member: TeamMember; layoutType?: "grid" | "list" }) {
  return (
    <Card className={cn(layoutType === "list" && "flex items-start")}>
      <CardContent className={cn("p-6", layoutType === "list" && "grow")}>
        <div className={cn("mb-4", layoutType === "list" && "mr-6")}>
          <div className={cn("relative", layoutType === "list" ? "w-24 h-24" : "w-full pb-[100%]")}>
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
