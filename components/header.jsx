"use client";

import React from "react";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-users";
import BarLoader from "react-spinners/BarLoader";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Unauthenticated, Authenticated } from "convex/react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b border-white/20 bg-white/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-white/60 dark:bg-black/50 dark:border-white/10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Image
            src="/logos/SPLITZY.png"
            alt="Splitzy Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {path === '/' && (
          <div className="hidden md:flex items-center gap-8">
            <Link href='#features' className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</Link>
            <Link href='#how-it-works' className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">How it works</Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              <Button 
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>

              <Button variant="ghost" className="md:hidden w-10 h-10 p-0 text-primary">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 border-2 border-primary/20"
                }
              }}
            />
          </Authenticated> 
          
          <Unauthenticated>
            <SignInButton>
              <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-primary/5">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 border-none transition-all hover:scale-105">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>

      {isLoading && <BarLoader width={"100%"} color="#4f46e5" />}
    </header>
  );
};

export default Header;
