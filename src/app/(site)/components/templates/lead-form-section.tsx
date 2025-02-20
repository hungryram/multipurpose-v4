import type React from "react"
import { cn } from "@/lib/utils"
import FormBuilder from "./form-builder"
import HeaderSection from "./header-section"
import ContentEditor from "../util/content-editor"

interface LeadFormSectionProps {
  layout: "twoColumn" | "stacked"
  content: any // This should match the type of your content structure
  formSchema: any // This should match the FormSchema type from FormBuilder
  backgroundColor?: string
  textColor?: string
  textAlign: "left" | "center" | "right"
  buttonLink?: any
  primaryButtonText?: string
  primaryButtonStyle?: React.CSSProperties
  primaryButton?: ButtonProps
  secondaryButton?: ButtonProps
  alignContent: boolean
  formBackgroundColor?: string
  labelColor?: string
  formContent: any;
}

interface ButtonProps {
  text: string
  link: string
  style?: React.CSSProperties
}

const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  layout,
  content,
  formSchema,
  backgroundColor,
  textColor,
  textAlign,
  buttonLink,
  primaryButton,
  secondaryButton,
  alignContent = false,
  formBackgroundColor,
  labelColor,
  formContent
}) => {
  const renderContent = (
    <div style={{ color: textColor }}>
      <HeaderSection
        content={content}
        textAlign={textAlign}
        buttonLink={buttonLink}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )

  return (
    <section className={cn(backgroundColor && `bg-[${backgroundColor}]`)} style={{ color: textColor }}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "gap-8",
            layout === "twoColumn" ? "lg:flex" : "space-y-8",
            alignContent ? "items-center" : null,
          )}
        >
          <div className={cn(layout === "twoColumn" ? "lg:w-1/2" : "w-full")}>{renderContent}</div>
          <div
            className={cn('py-10 px-4', layout === "twoColumn" ? "lg:w-1/2" : "w-full")}
            style={{ backgroundColor: formBackgroundColor }}
          >
            {formContent &&
              <div className="content pb-6">
                <ContentEditor content={formContent} />
              </div>
            }
            <FormBuilder formSchema={formSchema} labelColor={labelColor} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection

