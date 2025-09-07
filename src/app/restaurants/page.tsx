"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Search, Filter } from "lucide-react";
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

interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

// Transform function for frontend compatibility
function transformRestaurantForFrontend(restaurant: Restaurant) {
  return {
    id: restaurant.id,
    name: restaurant.name,
    category: restaurant.category,
    image: restaurant.image_url,
    logo: restaurant.logo_url,
    rating: restaurant.rating,
    discount: restaurant.discount,
    address: restaurant.address,
    phone: restaurant.phone,
    hours: restaurant.hours,
    delivery_radius: restaurant.delivery_radius,
    delivery_time: restaurant.delivery_time,
    features: restaurant.features,
    is_active: restaurant.is_active,
    created_at: restaurant.created_at,
    updated_at: restaurant.updated_at
  };
}

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "name" | "discount">("rating");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [restaurantsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/restaurants'),
          fetch('/api/categories')
        ]);
        
        if (!restaurantsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const [restaurantsResult, categoriesResult] = await Promise.all([
          restaurantsResponse.json(),
          categoriesResponse.json()
        ]);
        
        setRestaurants(restaurantsResult.data);
        setCategories(categoriesResult.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredAndSortedRestaurants = useMemo(() => {
    const filtered = restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "discount":
          const aDiscount = parseInt(a.discount.replace(/\D/g, "")) || 0;
          const bDiscount = parseInt(b.discount.replace(/\D/g, "")) || 0;
          return bDiscount - aDiscount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, restaurants]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4037] mx-auto mb-4"></div>
          <p className="text-[#5a5a5a]">Loading restaurants...</p>
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
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a4037] mb-4">Our Partner Restaurants</h1>
        <p className="text-[#5a5a5a] text-lg max-w-2xl mx-auto">
          Discover authentic Maharashtrian cuisine from our carefully selected partner restaurants. 
          Each restaurant brings unique flavors and traditional recipes to your table.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a5a5a] h-5 w-5" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#d0d0d0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a5a5a] h-5 w-5" />
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#d0d0d0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037] appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "name" | "discount")}
            className="w-full px-4 py-3 rounded-lg border border-[#d0d0d0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037] appearance-none"
          >
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
            <option value="discount">Sort by Discount</option>
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">{restaurants.length}</div>
          <div className="text-[#5a5a5a]">Partner Restaurants</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">
            {restaurants.length * 5}
          </div>
          <div className="text-[#5a5a5a]">Total Thali Varieties</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">
            {restaurants.length > 0 ? (restaurants.reduce((acc, r) => acc + r.rating, 0) / restaurants.length).toFixed(1) : '0.0'}
          </div>
          <div className="text-[#5a5a5a]">Average Rating</div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedRestaurants.map((restaurant) => {
          const transformedRestaurant = transformRestaurantForFrontend(restaurant);
          return (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Restaurant Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={transformedRestaurant.image}
                  alt={transformedRestaurant.name}
                  fill
                  className="object-cover"
                />
              <div className="absolute top-4 right-4">
                {transformedRestaurant.discount && (
                  <span className="bg-[#e74c3c] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {transformedRestaurant.discount}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-1 bg-[#1a4037] px-3 py-1 rounded-md">
                  <Star size={16} className="fill-[#ffd700] text-[#ffd700]" />
                  <span className="font-medium text-white">{transformedRestaurant.rating}</span>
                </div>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#1a4037] mb-1">{transformedRestaurant.name}</h3>
                  <div className="flex items-center text-[#5a5a5a] text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{transformedRestaurant.category}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1a4037]">
                  <Image
                    src={transformedRestaurant.logo}
                    alt={`${transformedRestaurant.name} logo`}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center justify-between text-sm text-[#5a5a5a] mb-4">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{transformedRestaurant.delivery_time}</span>
                </div>
                <div className="text-[#1a4037] font-medium">
                  {transformedRestaurant.delivery_radius} delivery
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/restaurant/${restaurant.id}`}
                className="w-full bg-[#1a4037] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#0f2b21] transition-colors duration-200 text-center block"
              >
                View Menu & Order
              </Link>
            </div>
          </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredAndSortedRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f5f3f0] flex items-center justify-center">
            <Search className="h-10 w-10 text-[#5a5a5a]" />
          </div>
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2">No restaurants found</h3>
          <p className="text-[#5a5a5a] mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
            }}
            className="px-6 py-3 bg-[#1a4037] text-white font-medium rounded-lg hover:bg-[#0f2b21] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-[#1a4037] to-[#2d544c] rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Want to Partner With Us?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Join our network of authentic Maharashtrian restaurants and reach thousands of food lovers in your area.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-white text-[#1a4037] font-medium rounded-lg hover:bg-[#f5f3f0] transition-colors"
        >
          Become a Partner
        </Link>
      </div>
    </div>
  );
}
