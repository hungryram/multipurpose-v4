"use client"

import { useState } from "react"
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


interface NavItemProps {
  item: any
  isMobile?: boolean
}

export function NavItem({ item, isMobile = false }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubMenu = item.subMenu && item.subMenu.length > 0

  const menuLink = getMenuLink(item)

  if (isMobile) {
    if (hasSubMenu) {
      return (
        <Accordion type="single" collapsible>
          <AccordionItem value={item._key}>
            <AccordionTrigger>{item.text}</AccordionTrigger>
            <AccordionContent>
              {item.subMenu.map((subItem: any) => (
                <Link
                  key={subItem._key}
                  href={getMenuLink(subItem)}
                  className="block py-2"
                  target={subItem.newTab ? "_blank" : undefined}
                >
                  {subItem.text}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    } else {
      return (
        <Link href={menuLink} className="block py-2" target={item.newTab ? "_blank" : undefined}>
          {item.text}
        </Link>
      )
    }
  }

  if (hasSubMenu) {
    return (
      <>
        <NavigationMenuTrigger onClick={() => setIsOpen((prev) => !prev)}>{item.text}</NavigationMenuTrigger>
        {isOpen && (
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.subMenu.map((subItem: any) => (
                <li key={subItem._key}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={getMenuLink(subItem)}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      target={subItem.newTab ? "_blank" : undefined}
                    >
                      <div className="text-sm font-medium leading-none">{subItem.text}</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        )}
      </>
    )
  } else {
    return (
      <NavigationMenuLink asChild>
        <Link
          href={menuLink}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          target={item.newTab ? "_blank" : undefined}
        >
          {item.text}
        </Link>
      </NavigationMenuLink>
    )
  }
}

function getMenuLink(item: any) {
  if (item.externalUrl) return item.externalUrl
  if (!item.internalLink) return "/"

  const { _type, slug } = item.internalLink
  switch (_type) {
    case "pages":
      return `/${slug}`
    case "blog":
      return `/blog/${slug}`
    case "legal":
      return `/legal/${slug}`
    case "services":
      return `/services/${slug}`
    case "team":
      return `/team/${slug}`
    case "homeDesign":
      return "/"
    default:
      return "/"
  }
}

