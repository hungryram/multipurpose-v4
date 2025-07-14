import React from "react"
import { cn } from "@/lib/utils"
import FormBuilder from "./form-builder"
import HeaderSection from "../util/header-section"
import ContentEditor from "../util/content-editor"
import { LeadFormSectionProps } from "@/lib/types"

export default function LeadFormSection({
  section
}: {
  section: LeadFormSectionProps
}) {

  const {
    layoutType,
    content,
    formBuilder,
    backgroundColor,
    textColor,
    textAlign,
    primaryButton,
    secondaryButton,
    alignContentCenter = false,
    formBackgroundColor,
    labelColor,
    formContent
  } = section || {}

  const renderContent = (
    <div style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  return (
    <section className={cn(backgroundColor && `bg-[${backgroundColor}]`)} style={{ color: textColor?.hex }}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "gap-8",
            layoutType === "twoColumn" ? "lg:flex" : "space-y-8",
            alignContentCenter ? "items-center" : null,
          )}
        >
          <div className={cn(layoutType === "twoColumn" ? "lg:w-1/2" : "w-full")}>{renderContent}</div>
          <div
            className={cn('py-10 px-4', layoutType === "twoColumn" ? "lg:w-1/2" : "w-full")}
            style={{ backgroundColor: formBackgroundColor?.hex }}
          >
            {formContent && (
              <div className="content pb-6">
                <ContentEditor content={formContent} />
              </div>
            )}
            <FormBuilder
              formSchema={{
                ...formBuilder,
                subject: formBuilder?.subject || 'Contact Form Submission',
                sendTo: formBuilder?.sendTo,
                redirectTo: formBuilder?.redirectTo,
              }}
              labelColor={labelColor?.hex} />
          </div>
        </div>
      </div>
    </section>
  )
}
