"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

type Restaurant = {
  id: number;
  name: string;
  category: string;
  image: string;
  logo: string;
  rating: number;
  discount?: string;
  address?: string;
  phone?: string;
  hours?: string;
  delivery_radius?: string;
  delivery_time?: string;
  features?: string[];
};

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurant/${restaurant.id}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out will-change-transform hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a4037]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <div className="relative h-48 w-full">
          <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(26,64,55,0.9)] py-2 px-3">
            <h3 className="font-semibold text-white text-lg">{restaurant.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" /> 
                <span className="text-white">{restaurant.rating}</span>
              </span>
            </div>
          </div>
          {restaurant.discount && (
            <span className="absolute top-3 right-3 text-xs bg-orange-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
              {restaurant.discount}
            </span>
          )}
          <span className="absolute top-3 left-3 text-xs bg-[#2d544c] text-white px-3 py-1 rounded-full font-medium shadow-sm">
            {restaurant.category}
          </span>
        </div>
        <div className="p-5">
          <div className="text-sm text-[#5a5a5a] line-clamp-2">
            Authentic Maharashtrian thalis available
          </div>
          <div className="mt-3 text-[#1a4037] font-medium text-sm">
            View Menu →
          </div>
        </div>
      </motion.div>
    </Link>
  );
}