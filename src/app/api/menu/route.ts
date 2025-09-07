import { NextRequest, NextResponse } from 'next/server';
import { getAllMenuItems } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    const menuItems = await getAllMenuItems();
    
    return NextResponse.json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}