"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Phone, Star, Search, Filter, Navigation } from "lucide-react";
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

type RestaurantWithLocation = Restaurant & {
  address: string;
  area: string;
  city: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  hours: string;
  deliveryRadius: string;
};

// Mock location data for restaurants
const restaurantLocations = [
  {
    id: 1,
    name: "Pune Thali House",
    address: "123 MG Road, Pune, Maharashtra 411001",
    area: "MG Road",
    city: "Pune",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    phone: "+91 98765 43210",
    hours: "10:00 AM - 10:00 PM",
    deliveryRadius: "5 km",
    deliveryTime: "30-45 min",
    rating: 4.5,
    image: "https://placehold.co/400x300?text=Pune+Thali+House",
    features: ["Free Delivery", "Cash on Delivery", "Online Payment"]
  },
  {
    id: 2,
    name: "Mumbai Spice Kitchen",
    address: "456 Linking Road, Bandra West, Mumbai 400050",
    area: "Bandra West",
    city: "Mumbai",
    coordinates: { lat: 19.0544, lng: 72.8406 },
    phone: "+91 98765 43211",
    hours: "11:00 AM - 11:00 PM",
    deliveryRadius: "8 km",
    deliveryTime: "35-50 min",
    rating: 4.8,
    image: "https://placehold.co/400x300?text=Mumbai+Spice+Kitchen",
    features: ["Free Delivery", "Online Payment", "Express Delivery"]
  },
  {
    id: 3,
    name: "Kolhapur Royal Kitchen",
    address: "789 Mahadwar Road, Kolhapur, Maharashtra 416001",
    area: "Mahadwar Road",
    city: "Kolhapur",
    coordinates: { lat: 16.7050, lng: 74.2433 },
    phone: "+91 98765 43212",
    hours: "9:00 AM - 9:00 PM",
    deliveryRadius: "6 km",
    deliveryTime: "25-40 min",
    rating: 4.9,
    image: "https://placehold.co/400x300?text=Kolhapur+Royal+Kitchen",
    features: ["Free Delivery", "Cash on Delivery", "Online Payment", "Premium Service"]
  }
];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch restaurants from API
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        const response = await fetch('/api/restaurants');
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        
        const result = await response.json();
        setRestaurants(result.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  // Create restaurant locations with mock location data
  const restaurantLocationsWithData = restaurants.map(restaurant => {
    const mockLocation = restaurantLocations.find(loc => loc.name === restaurant.name) || restaurantLocations[0];
    return {
      ...restaurant,
      address: restaurant.address || mockLocation.address,
      area: mockLocation.area,
      city: mockLocation.city,
      coordinates: mockLocation.coordinates,
      phone: restaurant.phone || mockLocation.phone,
      hours: restaurant.hours || mockLocation.hours,
      deliveryRadius: restaurant.delivery_radius || mockLocation.deliveryRadius,
    };
  });

  const cities = [...new Set(restaurantLocationsWithData.map(r => r.city))];
  const areas = [...new Set(restaurantLocationsWithData.map(r => r.area))];

  const filteredLocations = restaurantLocationsWithData.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || location.city === selectedCity;
    const matchesArea = !selectedArea || location.area === selectedArea;
    return matchesSearch && matchesCity && matchesArea;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1a4037] mb-4">Restaurant Locations</h1>
        <p className="text-[#5a5a5a] text-lg max-w-2xl mx-auto">
          Find our partner restaurants near you and enjoy authentic Maharashtrian thalis 
          delivered fresh to your doorstep.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4037]"></div>
          <p className="mt-4 text-[#5a5a5a]">Loading restaurants...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#1a4037] text-white rounded-lg hover:bg-[#0f2b21] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Content - only show when not loading and no error */}
      {!loading && !error && (
        <>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a5a5a] h-5 w-5" />
            <input
              type="text"
              placeholder="Search restaurants or areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#d0d0d0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
            />
          </div>

          {/* City Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5a5a5a] h-5 w-5" />
            <select
              value={selectedCity || ""}
              onChange={(e) => setSelectedCity(e.target.value || null)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#d0d0d0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037] appearance-none"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <select
            value={selectedArea || ""}
            onChange={(e) => setSelectedArea(e.target.value || null)}
            className="w-full px-4 py-3 rounded-lg border border-[#d0d0d0] bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037] appearance-none"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">{restaurantLocations.length}</div>
          <div className="text-[#5a5a5a]">Restaurant Locations</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">{cities.length}</div>
          <div className="text-[#5a5a5a]">Cities Covered</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">50+</div>
          <div className="text-[#5a5a5a]">Delivery Areas</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] text-center">
          <div className="text-3xl font-bold text-[#1a4037] mb-2">30-50</div>
          <div className="text-[#5a5a5a]">Min Delivery Time</div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#1a4037] mb-4 text-center">Interactive Map</h2>
        <div className="relative h-96 bg-[#f5f3f0] rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-[#1a4037] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1a4037] mb-2">Map Integration Coming Soon</h3>
              <p className="text-[#5a5a5a]">Interactive map showing all restaurant locations will be available soon.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredLocations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
          >
            {/* Restaurant Image */}
            <div className="relative h-48 w-full">
              <Image
                src={location.image_url}
                alt={location.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 bg-[#1a4037] px-3 py-1 rounded-md">
                  <Star size={16} className="fill-[#ffd700] text-[#ffd700]" />
                  <span className="font-medium text-white">{location.rating}</span>
                </div>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1a4037] mb-2">{location.name}</h3>
              
              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={18} className="text-[#1a4037] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#2c2c2c] font-medium">{location.address}</p>
                  <p className="text-[#5a5a5a] text-sm">{location.area}, {location.city}</p>
                </div>
              </div>

              {/* Contact & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#1a4037]" />
                  <span className="text-[#5a5a5a] text-sm">{location.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#1a4037]" />
                  <span className="text-[#5a5a5a] text-sm">{location.hours}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-[#f5f3f0] rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-[#1a4037] mb-2">Delivery Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#5a5a5a]">Delivery Time:</span>
                    <span className="font-medium text-[#1a4037] ml-1">{location.delivery_time}</span>
                  </div>
                  <div>
                    <span className="text-[#5a5a5a]">Delivery Radius:</span>
                    <span className="font-medium text-[#1a4037] ml-1">{location.delivery_radius}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-semibold text-[#1a4037] mb-2">Available Services</h4>
                <div className="flex flex-wrap gap-2">
                  {location.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#1a4037]/10 text-[#1a4037] text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`/restaurant/${location.id}`}
                  className="flex-1 bg-[#1a4037] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#0f2b21] transition-colors duration-200 text-center"
                >
                  View Menu
                </a>
                <button className="px-4 py-3 border border-[#1a4037] text-[#1a4037] rounded-lg hover:bg-[#1a4037] hover:text-white transition-colors duration-200">
                  <Navigation size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f5f3f0] flex items-center justify-center">
            <MapPin className="h-10 w-10 text-[#5a5a5a]" />
          </div>
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2">No locations found</h3>
          <p className="text-[#5a5a5a] mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCity(null);
              setSelectedArea(null);
            }}
            className="px-6 py-3 bg-[#1a4037] text-white font-medium rounded-lg hover:bg-[#0f2b21] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-[#1a4037] to-[#2d544c] rounded-xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Don't See Your Area?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          We're constantly expanding our delivery network. Let us know your location and we'll 
          work on bringing authentic Maharashtrian thalis to your area soon.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-white text-[#1a4037] font-medium rounded-lg hover:bg-[#f5f3f0] transition-colors"
        >
          Request Delivery to Your Area
        </a>
      </div>
        </>
      )}
    </div>
  );
}

