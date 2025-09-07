import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategories();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}