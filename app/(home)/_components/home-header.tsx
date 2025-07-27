import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { Shirt, Clock, Shield, Star, Phone, Mail, MapPin, Zap, Droplets, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomeHeader() {
  return (
    <>
       <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className=" mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Shirt className="h-5 w-5 sm:h-6 sm:w-6 " />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-primary">LaundryPro</span>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="#services"
                    className="text-lg font-medium text-primary"
                  >
                    Services
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-lg font-medium text-primary"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#about"
                    className="text-lg font-medium text-primary"
                  >
                    About
                  </Link>
                  <Link
                    href="#contact"
                    className="text-lg font-medium text-primary"
                  >
                    Contact
                  </Link>
                  <Separator />
                  <div className="flex flex-col space-y-3 pt-4">
                    <Link href="/login">
                      <Button variant="default" className="w-full ">
                        Login
                      </Button>
                    </Link>
                    <Button className="w-full">Order Now</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#services"
                    className=" px-4 py-2 text-primary"
                  >
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#pricing"
                    className=" px-4 py-2 text-primary"
                  >
                    Pricing
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#about"
                    className=" px-4 py-2 text-primary"
                  >
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#contact"
                    className=" px-4 py-2 text-primary"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-sm ">
                  Login
                </Button>
              </Link>
              <Button size="sm" className="text-sm">
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
