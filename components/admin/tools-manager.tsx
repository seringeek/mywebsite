"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"

type Tool = {
  id: string
  name: string
  description: string | null
  category: string
  url: string | null
}

export function ToolsManager() {
  const [tools, setTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    url: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    const { data } = await supabase.from("tools").select("*").order("category", { ascending: true })
    setTools(data || [])
    setIsLoading(false)
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", category: "", url: "" })
    setEditingTool(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const toolData = {
      name: formData.name,
      description: formData.description || null,
      category: formData.category,
      url: formData.url || null,
    }

    if (editingTool) {
      await supabase.from("tools").update(toolData).eq("id", editingTool.id)
    } else {
      await supabase.from("tools").insert(toolData)
    }

    setIsDialogOpen(false)
    resetForm()
    fetchTools()
  }

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool)
    setFormData({
      name: tool.name,
      description: tool.description || "",
      category: tool.category,
      url: tool.url || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await supabase.from("tools").delete().eq("id", id)
      fetchTools()
    }
  }

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tools</h1>
          <p className="text-muted-foreground">Manage your tool recommendations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm() }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Tool</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingTool ? "Edit Tool" : "Add New Tool"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Productivity, Design" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL (optional)</Label>
                <Input id="url" type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">{editingTool ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tools.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No tools yet.</CardContent></Card>
        ) : (
          tools.map((tool) => (
            <Card key={tool.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{tool.category}</Badge>
                    </div>
                    {tool.description && <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(tool)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(tool.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
