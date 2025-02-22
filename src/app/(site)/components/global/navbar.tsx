"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react" // Import React
import { NavbarProps } from "@/lib/types"


export function Navbar({
  company_name,
  logo,
  navItems = [],
  logoWidth,
  phone,
  email,
  office,
  enableTopHeader,
  ctaLink,
  hideCta,
  enableTransparent,
  logoOnScroll
}: NavbarProps) {
  const [scroll, setScroll] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const ctaLinking = getCTALink(ctaLink)

  const logoScroll = scroll ? (logoWidth ?? 200) * 0.7 : (logoWidth ?? 200)

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-700 ease-in-out nav-bg-fixed",
        scroll ? "shadow-md" : "top-0",
        scroll || !enableTransparent ? 'nav-bg-scroll' : "bg-transparent",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {enableTopHeader && !scroll && (
        <div className="hidden lg:block bg-gray-100 py-2">
          <div className="container mx-auto flex justify-end space-x-6">
            {email && (
              <a href={`mailto:${email}`} className="text-sm">
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="text-sm">
                Direct: {phone}
              </a>
            )}
            {office && (
              <a href={`tel:${office}`} className="text-sm">
                Office: {office}
              </a>
            )}
          </div>
        </div>
      )}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          {logo ? (
            <Image
              src={logo || "/placeholder.svg"}
              width={logoScroll}
              height={10}
              alt={company_name}
              className={logoOnScroll && scroll ? 'hidden' : 'block h-auto'}
            />
          ) : (
            <h1 className="text-xl font-bold">{company_name}</h1>
          )}
          {scroll && logoOnScroll &&
            <Image
              src={logoOnScroll}
              width={logoScroll}
              height={10}
              alt={company_name}
              className="h-auto"
            />
          }
        </Link>
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems?.map((item) => (
                <NavigationMenuItem key={item._key}>
                  {item.subMenu && item.subMenu.length > 0 ? (
                    <>
                      <NavigationMenuTrigger triggerMode="click">{item.text}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[300px]">
                          {item.subMenu.map((subItem: any) => (
                            <ListItem key={subItem._key} title={subItem.text} href={getMenuLink(subItem)}>
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={getMenuLink(item)} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.text}</NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {!hideCta && ctaLinking && (
            <Button asChild>
              <Link href={ctaLinking}>
                {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          )}
        </div>
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4">
                {navItems?.map((item) => (
                  <MobileNavItem key={item._key} item={item} />
                ))}
                {!hideCta && ctaLinking && (
                  <Button asChild className="w-full">
                    <Link href={ctaLinking}>
                      {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </Button>
                )}
                <div className="pt-4 border-t border-gray-200">
                  {email && <p className="text-sm">{email}</p>}
                  {phone && <p className="text-sm">Direct: {phone}</p>}
                  {office && <p className="text-sm">Office: {office}</p>}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

function NavItem({ item }: { item: any }) {
  const hasSubMenu = item?.subMenu && item.subMenu.length > 0
  const menuLink = getMenuLink(item)

  if (hasSubMenu) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.text}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.subMenu.map((subItem: any) => (
              <ListItem key={subItem._key} title={subItem.text} href={getMenuLink(subItem)}>
                {subItem.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  } else {
    return (
      <NavigationMenuItem>
        <Link href={menuLink} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.text}</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    )
  }
}

function MobileNavItem({ item }: { item: any }) {
  const hasSubMenu = item?.subMenu && item.subMenu.length > 0
  const menuLink = getMenuLink(item)

  if (hasSubMenu) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value={item._key}>
          <AccordionTrigger>{item.text}</AccordionTrigger>
          <AccordionContent>
            {item.subMenu?.map((subItem: any) => (
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

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

function getMenuLink(item: any) {
  if (!item) return "/"
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

function getCTALink(ctaLink: any) {
  if (!ctaLink) return "/"
  if (ctaLink?.externalUrl) return ctaLink.externalUrl
  if (!ctaLink?.internalLink) return "/"

  const { _type, slug } = ctaLink.internalLink
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
    default:
      return "/"
  }
}

export default Navbar

