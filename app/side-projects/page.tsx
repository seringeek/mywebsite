import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { ProjectTabs } from "@/components/project-tabs"


export default async function SideProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-6">Side Projects</h1>
        <ProjectTabs projects={projects || []} />
      </main>
      <Footer />
    </div>
  )
}
