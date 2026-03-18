import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FileText, ExternalLink } from "lucide-react"


export default async function SummariesPage() {
  const supabase = await createClient()

  const { data: summaries } = await supabase
    .from("summaries")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Summaries</h1>
        <p className="text-muted-foreground mb-8">
          Key takeaways and summaries from books, articles, and talks.
        </p>

        <div className="space-y-4">
          {summaries && summaries.length > 0 ? (
            summaries.map((summary) => (
              <div
                key={summary.id}
                className="p-4 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground">{summary.title}</h3>
                      {summary.url && (
                        <Link
                          href={summary.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    {summary.source && (
                      <p className="text-sm text-muted-foreground">Source: {summary.source}</p>
                    )}
                    {summary.category && (
                      <Badge variant="outline" className="mt-2 text-xs font-normal">
                        {summary.category}
                      </Badge>
                    )}
                    {summary.content && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {summary.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No summaries added yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
