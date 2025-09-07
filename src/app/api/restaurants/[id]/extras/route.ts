import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ params is Promise now
): Promise<NextResponse> {
  try {
    const { id } = await context.params; // ✅ await params

    const result = await pool.query(
      "SELECT * FROM restaurant_extras WHERE restaurant_id = $1 ORDER BY name",
      [id]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Restaurant extras API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
