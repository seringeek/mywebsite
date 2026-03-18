"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      router.replace("/admin/login")
    }
  }, [router])

  if (isAuthenticated === null) return null

  return <AdminDashboard />
}
