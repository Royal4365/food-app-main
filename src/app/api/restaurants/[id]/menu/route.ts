import { NextRequest, NextResponse } from 'next/server';
import { getMenuItems } from '@/lib/api-client';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    
    const menuItems = await getMenuItems(id);
    
    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
