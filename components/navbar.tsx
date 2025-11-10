"use client";

import UserDropdown from "@/app/dashboard/components/userDropdown";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Switcher from "./ui/theme_switcher";

interface NavItem {
  name: string;
  href: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeLink: string;
  onLinkClick: () => void;
}

const themeColor = "#d97757"; // 🔸 unified accent color

const LogoIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 6H10V10H6V6Z" fill={themeColor} />
    <path d="M14 6H18V10H14V6Z" fill={themeColor} />
    <path d="M6 14H10V18H6V14Z" fill={themeColor} />
    <path d="M14 14H18V18H14V14Z" fill={themeColor} fillOpacity="0.5" />
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

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isActive = false,
  onClick,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? `text-[${themeColor}] bg-[${themeColor}]/10 dark:bg-[${themeColor}]/20`
        : `text-gray-600 dark:text-gray-300 hover:text-[${themeColor}] hover:bg-gray-100 dark:hover:bg-gray-800`
    }`}
  >
    {children}
  </Link>
);

const Button: React.FC<ButtonProps & { size?: "sm" | "md" | "lg" }> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}) => {
  const base =
    "rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const styles = {
    primary: `bg-[${themeColor}] text-white hover:bg-[#c96947] focus:ring-[${themeColor}] shadow-lg`,
    secondary:
      "bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700",
    outline: `border border-[${themeColor}] text-[${themeColor}] hover:bg-[${themeColor}] hover:text-white`,
    ghost:
      "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  activeLink,
  onLinkClick,
}) => (
  <div
    className={`md:hidden fixed top-20 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-300 ease-in-out z-50 ${
      isOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4 pointer-events-none"
    }`}
  >
    <div className="px-4 pt-4 pb-6 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onLinkClick}
          className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
            activeLink === item.name
              ? `text-[${themeColor}] bg-[${themeColor}]/10 dark:bg-[${themeColor}]/20`
              : `text-gray-700 dark:text-gray-300 hover:text-[${themeColor}] hover:bg-gray-50 dark:hover:bg-gray-800`
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
    <div className="pt-4 pb-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
      <div className="px-4">
        <Link href="/login" onClick={onLinkClick} className="block">
          <Button variant="outline" className="w-full justify-center">
            Login
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  // Base nav items
  const baseNavItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About us", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
  ];

  // Add Dashboard only if session exists
  const navItems = session
    ? [...baseNavItems, { name: "Dashboard", href: "/dashboard" }]
    : baseNavItems;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Truth & Dare AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 bg-white/10 dark:bg-white/5 p-1.5 rounded-xl backdrop-blur-md transition-all duration-300">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                isActive={activeLink === item.name}
                onClick={() => setActiveLink(item.name)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Switcher />
            {isPending ? null : session ? (
              <UserDropdown
                name={
                  session.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session.user.email?.split("@")[0]
                }
                email={session.user.email}
                image={
                  session.user.image ??
                  `https://avatar.vercel.sh/${session.user.email}?size=30`
                }
              />
            ) : (
              <Link href="/login">
                <Button size="sm">Log In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Switcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d97757] transition-all duration-300"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        navItems={navItems}
        activeLink={activeLink}
        onLinkClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
};
