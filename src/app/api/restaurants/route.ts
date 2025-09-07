import { NextRequest, NextResponse } from 'next/server';
import { getRestaurants } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    const restaurants = await getRestaurants();
    
    return NextResponse.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Restaurants API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}