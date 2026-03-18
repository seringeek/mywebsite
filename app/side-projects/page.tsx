import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectTabs } from "@/components/project-tabs"
import projects from "@/data/projects.json"

export default function SideProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-6">Side Projects</h1>
        <ProjectTabs projects={projects} />
      </main>
      <Footer />
    </div>
  )
}
