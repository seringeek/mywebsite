"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProjectsManager } from "./projects-manager"
import { ProofOfWorkManager } from "./proof-of-work-manager"
import { BookshelfManager } from "./bookshelf-manager"
import { SummariesManager } from "./summaries-manager"
import { ToolsManager } from "./tools-manager"
import { 
  LayoutDashboard, 
  FolderKanban, 
  Award, 
  BookOpen, 
  FileText, 
  Wrench,
  LogOut,
  Home
} from "lucide-react"

const tabs = [
  { id: "projects", label: "Side Projects", icon: FolderKanban },
  { id: "proof-of-work", label: "Proof of Work", icon: Award },
  { id: "bookshelf", label: "Bookshelf", icon: BookOpen },
  { id: "summaries", label: "Summaries", icon: FileText },
  { id: "tools", label: "Tools", icon: Wrench },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects")
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Admin Dashboard</span>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </nav>

          <div className="border-t border-border p-4 space-y-2">
            <Link href="/">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                View Site
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "proof-of-work" && <ProofOfWorkManager />}
        {activeTab === "bookshelf" && <BookshelfManager />}
        {activeTab === "summaries" && <SummariesManager />}
        {activeTab === "tools" && <ToolsManager />}
      </main>
    </div>
  )
}
