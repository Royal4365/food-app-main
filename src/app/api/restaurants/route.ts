import { NextRequest, NextResponse } from "next/server";
import { getRestaurants } from "@/lib/api-client";

export async function GET(request: NextRequest) {
  try {
    const restaurants = await getRestaurants();

    // Check if data was returned successfully before sending a response
    if (!restaurants || restaurants.length === 0) {
      console.error("No restaurants found in the database.");
      return NextResponse.json(
        { success: false, message: "No restaurants found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    // Log the full error object for detailed debugging on Vercel
    console.error("Restaurants API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
