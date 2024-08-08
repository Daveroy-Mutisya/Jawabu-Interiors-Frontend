'use client'

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import menuIcon from "../../public/menu.png";
import closeIcon from "../../public/close.png";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavBar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true); // Mark the component as hydrated

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Use 768px as breakpoint for mobile
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!hydrated) {
    // Render a fallback while the component is hydrating
    return null;
  }

  return (
<div className="bg-black text-white p-4">
  <div className="flex flex-wrap items-center justify-between z-50">
    {/* Left Side - Jawabu Interiors */}
    <div className="flex items-center space-x-4">
      <h1 className="text-3xl font-extrabold lg:text-3xl">
        Jawabu
      </h1>
      <h1 className="text-3xl font-extrabold lg:text-3xl ml-4 text-green-500">
        Interiors
      </h1>
      <h1 className="text-3xl font-extrabold text-white-500">
        Ltd
      </h1>
    </div>

    {/* Right Side - Navigation Menu */}
    <div className="flex items-center space-x-4">
      <div className="text-2xl md:hidden p-4">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          ☰
        </button>
      </div>
      <div className={`md:flex items-center ${menuOpen ? 'block' : 'hidden'} md:block`}>
        <NavigationMenu>
          <NavigationMenuList className={`flex ${isMobile ? 'flex-col' : 'flex-row'} space-y-4 md:space-y-0 md:space-x-4`}>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/" onClick={toggleMenu} className="hover:text-green-500">Home</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/Projects" onClick={toggleMenu} className="hover:text-green-500">Projects</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/About" passHref>
                <NavigationMenuLink onClick={toggleMenu} className={cn(navigationMenuTriggerStyle(), "hover:text-green-500")}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Blog" passHref>
                <NavigationMenuLink onClick={toggleMenu} className={cn(navigationMenuTriggerStyle(), "hover:text-green-500")}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Contact" passHref>
                <NavigationMenuLink onClick={toggleMenu} className={cn(navigationMenuTriggerStyle(), "hover:text-green-500")}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </div>
  {isMobile && menuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="flex justify-end p-4">
        <div onClick={toggleMenu} className="cursor-pointer">
          <Image src={closeIcon} alt="Close Menu" width={24} height={24} />
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col space-y-2 p-4 text-white">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/" onClick={toggleMenu} className="hover:text-green-500">Home</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/Projects" onClick={toggleMenu} className="hover:text-green-500">Projects</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/About" passHref>
              <NavigationMenuLink onClick={toggleMenu} className={cn(navigationMenuTriggerStyle(), "hover:text-green-500")}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Blog" passHref>
              <NavigationMenuLink onClick={toggleMenu} className={cn(navigationMenuTriggerStyle(), "hover:text-green-500")}>
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Contact" passHref>
              <NavigationMenuLink onClick={toggleMenu} className={cn(navigationMenuTriggerStyle(), "hover:text-green-500")}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )}
</div>


        );
      }

      const ListItem = React.forwardRef<
        React.ElementRef<'a'>,
        React.ComponentPropsWithoutRef<'a'>
      >(({ className, title, children, ...props }, ref) => {
        return (
          <li>
            <NavigationMenuLink asChild>
              <a
                ref={ref}
                className={cn(
                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                  className
                )}
                {...props}
              >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              </a>
            </NavigationMenuLink>
          </li>
  );
});
ListItem.displayName = 'ListItem';
