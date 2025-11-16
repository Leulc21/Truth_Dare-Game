"use client";

import UserDropdown from "@/app/dashboard/_components/userDropdown";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Switcher from "./ui/theme_switcher";

interface NavItem {
  name: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // ✅ Get session using Better Auth
  const { data: session, isPending } = authClient.useSession();

  // ✅ Base nav items (always visible)
  const baseNavItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "FAQ", href: "/#faq" },
    { name: "Testimonials", href: "/#testimonials" },
  ];

  // ✅ Conditionally show Dashboard if session exists
  const navItems = session
    ? [...baseNavItems, { name: "Dashboard", href: "/dashboard" }]
    : baseNavItems;

  // ✅ Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Check if link is active
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const LogoIcon: React.FC = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path d="M6 6H10V10H6V6Z" fill="currentColor" />
      <path d="M14 6H18V10H14V6Z" fill="currentColor" />
      <path d="M6 14H10V18H6V14Z" fill="currentColor" />
      <path d="M14 14H18V18H14V14Z" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );

  const MenuIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <LogoIcon />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Truth & Dare AI
            </span>
          </Link>

          {/* ✅ Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 glass p-1.5 rounded-2xl border border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isLinkActive(item.href)
                    ? "text-white bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white/10 dark:hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* ✅ Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Switcher />

            {/* Handle Auth State */}
            {isPending ? (
              <div className="w-8 h-8 rounded-full glass animate-pulse" />
            ) : session ? (
              <UserDropdown
                name={
                  session.user?.name && session.user.name.length > 0
                    ? session.user.name
                    : session.user?.email?.split("@")[0] || "User"
                }
                email={session.user?.email || ""}
                image={
                  session.user?.image ||
                  `https://avatar.vercel.sh/${session.user?.email}?size=30`
                }
              />
            ) : (
              <Link href="/login">
                <button className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
                  Log In
                </button>
              </Link>
            )}
          </div>

          {/* ✅ Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Switcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl glass border border-white/10 hover:border-primary/30 transition-all duration-300"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/10 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isLinkActive(item.href)
                    ? "text-white bg-gradient-to-r from-primary to-secondary shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 pb-6 px-4 border-t border-gray-200/50 dark:border-white/10">
            {isPending ? (
              <div className="w-full h-10 rounded-xl glass animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3 p-3 rounded-xl glass border border-white/10">
                <img
                  src={
                    session.user?.image ||
                    `https://avatar.vercel.sh/${session.user?.email}?size=40`
                  }
                  alt={session.user?.name || "User"}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <button className="w-full px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
