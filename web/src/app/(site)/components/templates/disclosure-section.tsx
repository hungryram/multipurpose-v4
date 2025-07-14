import DisclosureInteractive from "../client/disclosure-client"
import StructuredData from "../util/structured-data"
import { DisclosureSectionSchema } from "../schema-templates/disclosure-schema"
import HeaderSection from "../util/header-section"

export default function DisclosureSection({ section }) {
    const schemaMarkup = DisclosureSectionSchema(section)

    const {
        content,
        textAlign,
        primaryButton,
        secondaryButton,
        textColor,
        layoutType
    } = section || {}

    return (
        <>
            <StructuredData data={schemaMarkup} />
            {/* SSR the static header */}
            {layoutType !== "contentSide" && (
                <div className="mb-12" style={{ color: textColor }}>
                    <HeaderSection
                        content={content}
                        textAlign={textAlign}
                        primaryButton={primaryButton}
                        secondaryButton={secondaryButton}
                    />
                </div>
            )}
            {/* Hydrate only what needs it */}
            <DisclosureInteractive section={section} />
        </>
    )
}
