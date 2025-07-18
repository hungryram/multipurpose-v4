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
import React from "react"
import type { NavbarProps } from "@/lib/types"
import { getNavLink } from "../util/getButtonLink"

export function Navbar({ navbarData }: NavbarProps) {
  const [scroll, setScroll] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const ctaLink = navbarData?.appearances?.header?.ctaLink
  const ctaLinking = getNavLink(ctaLink)

  const logoWidth = navbarData.appearances?.branding?.logoWidth
  const logoScroll = scroll ? (logoWidth ?? 200) * 0.7 : (logoWidth ?? 200)
  const logoOnScroll = navbarData.appearances?.branding?.logoScroll?.asset?.url
  const contactInfo = navbarData.profileSettings?.contact_information


  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-700 ease-in-out nav-bg-fixed",
        scroll ? "shadow-md nav-bg-scroll" : "top-0 bg-transparent",
        isLoaded ? "opacity-100" : "opacity-0",
      )}
    >
      {navbarData?.appearances?.topHeaderBar?.enableTopHeaderBar && !scroll && (
        <div className="hidden lg:block bg-gray-100 py-2">
          <div className="container mx-auto flex justify-end space-x-6">
            {contactInfo?.email && (
              <a href={`mailto:${contactInfo?.email}`} className="text-sm">
                {contactInfo?.email}
              </a>
            )}
            {contactInfo?.phone && (
              <a href={`tel:${contactInfo?.phone}`} className="text-sm">
                Direct: {contactInfo?.phone}
              </a>
            )}
            {contactInfo?.office && (
              <a href={`tel:${contactInfo?.office}`} className="text-sm">
                Office: {contactInfo?.office}
              </a>
            )}
          </div>
        </div>
      )}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          {navbarData?.appearances?.branding?.logo?.asset?.url ? (
            <Image
              src={navbarData.appearances?.branding?.logo?.asset?.url || "/placeholder.svg"}
              width={logoScroll}
              height={10}
              alt={navbarData?.profileSettings?.company_name}
              className={logoOnScroll && scroll ? "hidden" : "block h-auto"}
            />
          ) : (
            <h1 className="text-xl font-bold">{navbarData?.profileSettings?.company_name}</h1>
          )}
          {scroll && logoOnScroll && (
            <Image
              src={logoOnScroll}
              width={logoScroll}
              height={10}
              alt={navbarData?.profileSettings?.company_name}
              className="h-auto"
            />
          )}
        </Link>
        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navbarData?.appearances?.header?.mainNav?.navItems?.map((item: any) => {
                return (
                  <NavigationMenuItem key={item._key}>
                    {item.subMenu?.length > 0 ? (
                      <>
                        <NavigationMenuTrigger triggerMode="click">{item.text}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[300px]">
                            {item.subMenu.map((subItem: any) => (
                              <ListItem key={subItem._key} title={subItem.text} href={getNavLink(subItem)}>
                                {subItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href={getNavLink(item)}>
                          {item.text}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
          {!navbarData?.appearances?.header?.hideCta && ctaLinking && (
            <Button asChild variant={"primary"}>
              <Link href={ctaLinking} className="uppercase heading-font text-xl tracking-wider">
                {ctaLink?.text}
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
            <SheetContent className="overflow-y-scroll" title="Navigation Menu">
              <div className="flex flex-col space-y-4 mt-20">
                {navbarData?.appearances?.header?.mainNav?.navItems?.map((item: any) => (
                  <MobileNavItem key={item._key} item={item} closeMenu={() => setIsMobileMenuOpen(false)} />
                ))}
                {!navbarData?.appearances?.header?.hideCta && ctaLinking && (
                  <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href={ctaLinking}>{ctaLink?.text}</Link>
                  </Button>
                )}
                <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                  {contactInfo?.email && <p><a href={`mailto:${contactInfo?.email}`}>{contactInfo?.email}</a></p>}
                  {contactInfo?.phone && <p>Direct: <a href={`tel:${contactInfo?.phone}`}>{contactInfo?.phone}</a></p>}
                  {contactInfo?.office && <p>Office: {contactInfo?.office}</p>}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

function MobileNavItem({ item, closeMenu }: { item: any; closeMenu: () => void }) {
  const hasSubMenu = item?.subMenu && item.subMenu.length > 0
  const menuLink = getNavLink(item)

  if (hasSubMenu) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value={item._key}>
          <AccordionTrigger>{item.text}</AccordionTrigger>
          <AccordionContent>
            {item.subMenu?.map((subItem: any) => (
              <Link
                key={subItem._key}
                href={getNavLink(subItem)}
                className="block py-2 mobileNavItem"
                target={subItem.newTab ? "_blank" : undefined}
                onClick={closeMenu}
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
      <Link
        href={menuLink}
        className="block py-2 mobileNavItem"
        target={item.newTab ? "_blank" : undefined}
        onClick={closeMenu}
      >
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

export default Navbar
