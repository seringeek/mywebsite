"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Zap, Box, FlaskConical } from "lucide-react"
import Link from "next/link"

type Project = {
  id: string
  title: string
  description: string
  category: "full_blown" | "micro" | "research"
  tag: string
  date_range: string
  url: string | null
}

const categories = [
  { id: "full_blown", label: "Full Blown", icon: Zap },
  { id: "micro", label: "Micro", icon: Box },
  { id: "research", label: "Research", icon: FlaskConical },
]

export function ProjectTabs({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState<string>("full_blown")

  const filteredProjects = projects.filter((p) => p.category === activeTab)

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "flex items-center gap-2 pb-3 text-sm transition-colors border-b-2 -mb-px",
                isActive
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.length === 0 ? (
          <p className="text-muted-foreground text-sm">No projects in this category yet.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {project.url ? (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {project.title}
                    </Link>
                  ) : (
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {project.tag}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{project.date_range}</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
