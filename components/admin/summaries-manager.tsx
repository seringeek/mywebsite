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

type Summary = {
  id: string
  title: string
  source: string | null
  content: string | null
  category: string | null
  url: string | null
}

export function SummariesManager() {
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Summary | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    source: "",
    content: "",
    category: "",
    url: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchSummaries()
  }, [])

  const fetchSummaries = async () => {
    const { data } = await supabase.from("summaries").select("*").order("created_at", { ascending: false })
    setSummaries(data || [])
    setIsLoading(false)
  }

  const resetForm = () => {
    setFormData({ title: "", source: "", content: "", category: "", url: "" })
    setEditingItem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const itemData = {
      title: formData.title,
      source: formData.source || null,
      content: formData.content || null,
      category: formData.category || null,
      url: formData.url || null,
    }

    if (editingItem) {
      await supabase.from("summaries").update(itemData).eq("id", editingItem.id)
    } else {
      await supabase.from("summaries").insert(itemData)
    }

    setIsDialogOpen(false)
    resetForm()
    fetchSummaries()
  }

  const handleEdit = (item: Summary) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      source: item.source || "",
      content: item.content || "",
      category: item.category || "",
      url: item.url || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await supabase.from("summaries").delete().eq("id", id)
      fetchSummaries()
    }
  }

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Summaries</h1>
          <p className="text-muted-foreground">Manage your summaries and takeaways</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm() }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Summary</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingItem ? "Edit Summary" : "Add New Summary"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source (optional)</Label>
                  <Input id="source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} placeholder="e.g., Book name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category (optional)</Label>
                  <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Business" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content (optional)</Label>
                <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL (optional)</Label>
                <Input id="url" type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {summaries.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No summaries yet.</CardContent></Card>
        ) : (
          summaries.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {item.source && <span className="text-sm text-muted-foreground">Source: {item.source}</span>}
                      {item.category && <Badge variant="outline">{item.category}</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
              {item.content && <CardContent><p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p></CardContent>}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
