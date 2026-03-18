import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Wrench, ExternalLink } from "lucide-react"
import toolsData from "@/data/tools.json"

export default function ToolsPage() {
  const groupedTools = toolsData.reduce((acc, tool) => {
    const category = tool.category || "Other"
    if (!acc[category]) acc[category] = []
    acc[category].push(tool)
    return acc
  }, {} as Record<string, typeof toolsData>)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Tools</h1>
        <p className="text-muted-foreground mb-8">
          Software, apps, and tools I use daily for work and life.
        </p>

        {Object.keys(groupedTools).length > 0 ? (
          Object.entries(groupedTools).map(([category, categoryTools]) => (
            <div key={category} className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">{category}</h2>
              <div className="grid gap-3">
                {categoryTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary shrink-0">
                      <Wrench className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{tool.name}</h3>
                      {tool.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {tool.description}
                        </p>
                      )}
                    </div>
                    {tool.url && (
                      <Link
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No tools added yet.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
