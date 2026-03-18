import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import works from "@/data/proof-of-work.json"

export default function ProofOfWorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Proof of Work</h1>
        <p className="text-muted-foreground mb-8">
          A collection of my work, writings, talks, and contributions.
        </p>

        <div className="space-y-6">
          {works.length > 0 ? (
            works.map((work) => (
              <div key={work.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {work.url ? (
                      <Link
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {work.title}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : (
                      <h3 className="text-lg font-semibold text-foreground">{work.title}</h3>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {work.category}
                      </Badge>
                      {work.date && (
                        <span className="text-sm text-muted-foreground">{work.date}</span>
                      )}
                    </div>
                  </div>
                </div>
                {work.description && (
                  <p className="mt-2 text-muted-foreground leading-relaxed">{work.description}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No work items added yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
