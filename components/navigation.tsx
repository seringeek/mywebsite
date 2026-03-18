"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "https://www.linkedin.com/in/serinpaul/", label: "Posts", external: true },
  { href: "/side-projects", label: "Side Projects" },
  { href: "/proof-of-work", label: "Proof of Work" },
  { href: "/about", label: "About" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-border bg-background">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className="font-[family-name:var(--font-caveat)] text-2xl text-foreground hover:text-primary transition-colors"
        >
          Serin
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isExternal = 'external' in item && item.external
            return (
              <Link
                key={item.href}
                href={item.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  isActive && !isExternal
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
