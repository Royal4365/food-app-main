"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import ThaliCard from "@/components/ThaliCard";
import ThaliModal from "@/components/ThaliModal";
import Button from "@/components/Button";
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

interface RestaurantExtra {
  id: string;
  restaurant_id: string;
  name: string;
  price: number;
  is_available: boolean;
  created_at: string;
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

// ThaliModal component is now imported from components directory

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [extras, setExtras] = useState<RestaurantExtra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  // Fetch restaurant data from API
  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        setLoading(true);
        const [restaurantResponse, menuResponse, extrasResponse] = await Promise.all([
          fetch(`/api/restaurants/${id}`),
          fetch(`/api/restaurants/${id}/menu`),
          fetch(`/api/restaurants/${id}/extras`)
        ]);
        
        if (!restaurantResponse.ok || !menuResponse.ok || !extrasResponse.ok) {
          const errors = [];
          if (!restaurantResponse.ok) errors.push(`Restaurant: ${restaurantResponse.status} ${restaurantResponse.statusText}`);
          if (!menuResponse.ok) errors.push(`Menu: ${menuResponse.status} ${menuResponse.statusText}`);
          if (!extrasResponse.ok) errors.push(`Extras: ${extrasResponse.status} ${extrasResponse.statusText}`);
          throw new Error(`Failed to fetch restaurant data: ${errors.join(', ')}`);
        }
        
        const [restaurantResult, menuResult, extrasResult] = await Promise.all([
          restaurantResponse.json(),
          menuResponse.json(),
          extrasResponse.json()
        ]);
        
        setRestaurant(restaurantResult.data);
        setMenuItems(menuResult.data);
        setExtras(extrasResult.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch restaurant data:', err);
        setError('Failed to load restaurant. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4037] mx-auto mb-4"></div>
          <p className="text-[#5a5a5a]">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !restaurant) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#1a4037] mb-2">Restaurant Not Found</h2>
          <p className="text-[#5a5a5a] mb-4">{error || 'The restaurant you are looking for does not exist.'}</p>
          <Link className="text-[#1a4037] underline hover:text-[#0f2b21]" href="/">
            ← Go back to restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-fade-in">
      <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg">
        <Image src={restaurant.image_url} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#1a4037]/70" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold drop-shadow-md">{restaurant.name}</h1>
              <p className="text-sm mt-1 text-white/90">{restaurant.category}</p>
            </div>
            <div className="flex items-center gap-1 bg-[#1a4037] px-3 py-1 rounded-md">
              <Star size={16} className="fill-yellow-400 text-yellow-400" /> 
              <span className="font-medium text-white">{restaurant.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-2xl font-bold text-[#1a4037]">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => {
          const transformedItem = transformMenuItemForFrontend(item);
          return (
            <ThaliCard
              key={item.id}
              name={transformedItem.name}
              price={transformedItem.price}
              rating={transformedItem.rating}
              content={transformedItem.content}
              hasDessert={transformedItem.has_dessert}
              onSelect={() => { setSelected(transformedItem); setOpen(true); }}
            />
          );
        })}
      </div>

      <div className="mt-10 p-5 bg-[#f5f3f0] rounded-xl">
        <h4 className="font-semibold text-[#1a4037] text-lg">Extras Included</h4>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#5a5a5a]">
          {extras.map((e) => (
            <li key={e.id} className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a4037]"></span>
              {e.name} (₹{e.price})
            </li>
          ))}
        </ul>
      </div>

      <ThaliModal 
        open={open} 
        onClose={() => setOpen(false)} 
        item={selected ? {
          name: selected.name,
          price: selected.price,
          rating: selected.rating,
          content: selected.content,
          hasDessert: selected.has_dessert
        } : null} 
        onOrder={(item, quantity, extras, note) => {
          // Handle order logic here
          console.log("Order placed:", { item, quantity, extras, note });
          // Navigate to billing page
          window.location.href = `/billing?name=${item.name}&quantity=${quantity}&price=${item.price}`;
        }}
      />
    </div>
  );
}


