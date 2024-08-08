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
<div className="bg-black text-white p-4 z-50">
  <div className="flex flex-wrap items-center justify-between">
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

    {/* Right Side - Toggle Menu Button */}
    <div className="md:hidden text-2xl">
      <button onClick={toggleMenu} className="text-white focus:outline-none">
        ☰
      </button>
    </div>

    {/* Desktop Navigation Menu */}
    <div className={`hidden md:flex items-center space-x-4`}>
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/" className="hover:text-green-500">Home</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/Projects" className="hover:text-green-500">Projects</Link>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/About" passHref>
              <NavigationMenuLink className="hover:text-green-500">
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Blog" passHref>
              <NavigationMenuLink className="hover:text-green-500">
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Contact" passHref>
              <NavigationMenuLink className="hover:text-green-500">
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMobile && menuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center">
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
          ✕
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col items-center space-y-6 text-2xl">
          <NavigationMenuItem>
            <Link href="/" onClick={toggleMenu} className="hover:text-green-500">
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Projects" onClick={toggleMenu} className="hover:text-green-500">
              Projects
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/About" onClick={toggleMenu} className="hover:text-green-500">
              About
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Blog" onClick={toggleMenu} className="hover:text-green-500">
              Blog
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/Contact" onClick={toggleMenu} className="hover:text-green-500">
              Contact
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
