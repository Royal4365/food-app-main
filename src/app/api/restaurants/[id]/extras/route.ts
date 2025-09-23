import { NextRequest, NextResponse } from "next/server";
import { getRestaurantExtras } from "@/lib/api-client";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ params is Promise now
): Promise<NextResponse> {
  try {
    const { id } = await context.params; // ✅ await params

    const extras = await getRestaurantExtras(id);

    return NextResponse.json({ success: true, data: extras });
  } catch (error) {
    console.error("Restaurant extras API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
