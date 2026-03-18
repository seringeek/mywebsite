import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function BookshelfPage() {
  const supabase = await createClient()

  const { data: books } = await supabase
    .from("bookshelf")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground mb-2">Bookshelf</h1>
        <p className="text-muted-foreground mb-8">
          Books that have shaped my thinking and I recommend.
        </p>

        <div className="grid gap-4">
          {books && books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary shrink-0">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  {book.category && (
                    <Badge variant="outline" className="mt-2 text-xs font-normal">
                      {book.category}
                    </Badge>
                  )}
                </div>
                {book.rating && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{book.rating}/5</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No books added yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
