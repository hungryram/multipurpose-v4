import ServiceCard from "./service-card"
import { Service } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function ServiceListGrid({ services, columnNumber }: {
  services: Service[]
  columnNumber: number
}) {
  return (
    <div className={cn("grid gap-8", {
      "sm:grid-cols-2": columnNumber === 2,
      "sm:grid-cols-3": columnNumber === 3,
      "sm:grid-cols-4": columnNumber === 4,
    })}>
      {services.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  )
}
