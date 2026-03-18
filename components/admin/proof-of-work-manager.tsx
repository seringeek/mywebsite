"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"

type ProofOfWork = {
  id: string
  title: string
  description: string | null
  category: string
  date: string | null
  url: string | null
}

export function ProofOfWorkManager() {
  const [items, setItems] = useState<ProofOfWork[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ProofOfWork | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    url: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const { data } = await supabase
      .from("proof_of_work")
      .select("*")
      .order("created_at", { ascending: false })
    setItems(data || [])
    setIsLoading(false)
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", date: "", url: "" })
    setEditingItem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const itemData = {
      title: formData.title,
      description: formData.description || null,
      category: formData.category,
      date: formData.date || null,
      url: formData.url || null,
    }

    if (editingItem) {
      await supabase.from("proof_of_work").update(itemData).eq("id", editingItem.id)
    } else {
      await supabase.from("proof_of_work").insert(itemData)
    }

    setIsDialogOpen(false)
    resetForm()
    fetchItems()
  }

  const handleEdit = (item: ProofOfWork) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      date: item.date || "",
      url: item.url || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await supabase.from("proof_of_work").delete().eq("id", id)
      fetchItems()
    }
  }

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proof of Work</h1>
          <p className="text-muted-foreground">Manage your work, writings, and talks</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Talk, Article" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date (optional)</Label>
                  <Input id="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="e.g., March 2024" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL (optional)</Label>
                <Input id="url" type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://..." />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {items.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No items yet.</CardContent></Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{item.category}</Badge>
                      {item.date && <span className="text-sm text-muted-foreground">{item.date}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
              {item.description && <CardContent><p className="text-sm text-muted-foreground">{item.description}</p></CardContent>}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
