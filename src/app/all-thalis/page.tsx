"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThaliCard from "@/components/ThaliCard";
import { useRouter } from "next/navigation";
// Types
interface Restaurant {
  id: string;
  name: string;
  category: string;
  image_url: string;
  logo_url: string;
  rating: number;
  discount: string;
  address: string;
  phone: string;
  hours: string;
  delivery_radius: string;
  delivery_time: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  price: number;
  rating: number;
  content: string;
  has_dessert: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

// Transform function for menu items
function transformMenuItemForFrontend(menuItem: MenuItem) {
  return {
    id: menuItem.id,
    restaurant_id: menuItem.restaurant_id,
    name: menuItem.name,
    price: menuItem.price,
    rating: menuItem.rating,
    content: menuItem.content,
    has_dessert: menuItem.has_dessert,
    is_available: menuItem.is_available,
    created_at: menuItem.created_at,
    updated_at: menuItem.updated_at
  };
}

export default function AllThalisPage() {
  const router = useRouter();
  const [thalis, setThalis] = useState<Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    content: string;
    has_dessert: boolean;
    restaurant: {
      id: string;
      name: string;
      category: string;
      image_url: string;
      logo_url: string;
      rating: number;
      discount: string;
      address: string;
      phone: string;
      hours: string;
      delivery_radius: string;
      delivery_time: string;
      features: string[];
    };
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all thalis from API
  useEffect(() => {
    async function fetchAllThalis() {
      try {
        setLoading(true);
        const [restaurantsResponse, menuResponse] = await Promise.all([
          fetch('/api/restaurants'),
          fetch('/api/menu')
        ]);
        
        if (!restaurantsResponse.ok || !menuResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const [restaurantsResult, menuResult] = await Promise.all([
          restaurantsResponse.json(),
          menuResponse.json()
        ]);
        
        const restaurantsData = restaurantsResult.data;
        const menuData = menuResult.data;
        
        // Create a map of restaurant data for quick lookup
        const restaurantMap = new Map<string, Restaurant>(restaurantsData.map((r: Restaurant) => [r.id, r]));
        
        // Combine menu items with restaurant data
        const allThalis = menuData.map((menuItem: MenuItem) => {
          const restaurant = restaurantMap.get(menuItem.restaurant_id);
          const transformedItem = transformMenuItemForFrontend(menuItem);
          
          return {
            name: transformedItem.name,
            price: transformedItem.price,
            restaurant: restaurant?.name || 'Unknown Restaurant',
            image: restaurant?.image_url || '',
            id: menuItem.id,
            rating: transformedItem.rating,
            content: transformedItem.content,
            hasDessert: transformedItem.has_dessert,
          };
        });
        
        setThalis(allThalis);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch thalis:', err);
        setError('Failed to load thalis. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllThalis();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4037] mx-auto mb-4"></div>
          <p className="text-[#5a5a5a]">Loading thalis...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#1a4037] mb-2">Oops! Something went wrong</h2>
          <p className="text-[#5a5a5a] mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#1a4037] text-white rounded-lg hover:bg-[#0f2b21] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a4037]">All Thalis</h1>
          <p className="mt-2 text-[#5a5a5a]">Browse our collection of authentic Maharashtrian thalis</p>
        </div>
        <div className="hidden sm:block">
          <Link href="/" className="px-4 py-2 rounded-md border border-[#1a4037] text-[#1a4037] hover:bg-[#f5f3f0] transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {thalis.map((thali, idx) => (
          <ThaliCard
            key={idx}
            name={thali.name}
            price={thali.price}
            rating={thali.rating}
            content={`From ${thali.restaurant}`}
            hasDessert={thali.has_dessert}
            onSelect={() => router.push(`/restaurant/${thali.id}`)}
          />
        ))}
      </div>
    </div>
  );
}


