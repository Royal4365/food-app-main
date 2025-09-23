import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantById } from '@/lib/api-client';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const restaurant = await getRestaurantById(id);
    
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: 'Restaurant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Restaurant API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
