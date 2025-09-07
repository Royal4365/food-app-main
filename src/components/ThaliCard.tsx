"use client";

import { Star, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ThaliCardProps {
  name: string;
  price: number;
  rating: number;
  content: string;
  hasDessert: boolean;
  onSelect: () => void;
}

export default function ThaliCard({ name, price, rating, content, hasDessert, onSelect }: ThaliCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-[#1a4037] text-lg">{name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-[#5a5a5a]">{rating}</span>
            </div>
          </div>
          <div className="text-[#1a4037] font-semibold">₹{price}</div>
        </div>
        
        <p className="mt-3 text-sm text-[#5a5a5a]">{content}</p>
        
        {hasDessert && (
          <div className="mt-2 text-xs inline-block bg-[#f5f3f0] text-[#1a4037] px-2 py-1 rounded">
            Includes Dessert
          </div>
        )}
        
        <button 
          onClick={onSelect}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#1a4037] text-white py-2 rounded-md hover:bg-[#2d544c] transition-colors"
        >
          <Plus size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}