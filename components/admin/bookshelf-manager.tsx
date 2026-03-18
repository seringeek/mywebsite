"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Star } from "lucide-react"

type Book = {
  id: string
  title: string
  author: string
  category: string | null
  rating: number | null
}

export function BookshelfManager() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    rating: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const { data } = await supabase.from("bookshelf").select("*").order("created_at", { ascending: false })
    setBooks(data || [])
    setIsLoading(false)
  }

  const resetForm = () => {
    setFormData({ title: "", author: "", category: "", rating: "" })
    setEditingBook(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const bookData = {
      title: formData.title,
      author: formData.author,
      category: formData.category || null,
      rating: formData.rating ? parseInt(formData.rating) : null,
    }

    if (editingBook) {
      await supabase.from("bookshelf").update(bookData).eq("id", editingBook.id)
    } else {
      await supabase.from("bookshelf").insert(bookData)
    }

    setIsDialogOpen(false)
    resetForm()
    fetchBooks()
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category || "",
      rating: book.rating?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await supabase.from("bookshelf").delete().eq("id", id)
      fetchBooks()
    }
  }

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookshelf</h1>
          <p className="text-muted-foreground">Manage your book recommendations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm() }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Book</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category (optional)</Label>
                  <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Business" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating 1-5 (optional)</Label>
                  <Input id="rating" type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
                </div>
              </div>
              <Button type="submit" className="w-full">{editingBook ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {books.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No books yet.</CardContent></Card>
        ) : (
          books.map((book) => (
            <Card key={book.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {book.category && <Badge variant="outline">{book.category}</Badge>}
                      {book.rating && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{book.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(book)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
