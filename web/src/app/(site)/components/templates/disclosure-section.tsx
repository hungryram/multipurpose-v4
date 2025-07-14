import DisclosureInteractive from "../client/disclosure-client"
import StructuredData from "../util/structured-data"
import { DisclosureSectionSchema } from "../schema-templates/disclosure-schema"
import type { DisclosureSectionProps } from "@/lib/types"

export default function DisclosureSection({
  section
}: {
  section: DisclosureSectionProps
}) {
  const schemaMarkup = DisclosureSectionSchema(section)

  return (
    <>
      <StructuredData data={schemaMarkup} />
      <DisclosureInteractive section={section} />
    </>
  )
}
