import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({ error: "Not available in static mode" }, { status: 501 })
}
