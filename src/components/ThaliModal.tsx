"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";

type ThaliItem = {
  name: string;
  price: number;
  rating: number;
  content: string;
  hasDessert: boolean;
};

interface ThaliModalProps {
  item: ThaliItem | null;
  open: boolean;
  onClose: () => void;
  onOrder: (item: ThaliItem, quantity: number, extras: string[], note: string) => void;
}

export default function ThaliModal({ 
  item, 
  open, 
  onClose, 
  onOrder 
}: ThaliModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [note, setNote] = useState("");
  
  // Reset state when modal opens with a new item
  useEffect(() => {
    if (open) {
      setQuantity(1);
      setSelectedExtras([]);
      setNote("");
    }
  }, [open, item]);

  const handleExtraToggle = (extra: string) => {
    setSelectedExtras(prev => 
      prev.includes(extra)
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  const calculateTotal = () => {
    if (!item) return 0;
    
    const itemTotal = item.price * quantity;
    
    // Extract price from extras (format: "Extra Item (₹50)")
    const extrasTotal = selectedExtras.reduce((sum, extra) => {
      const priceMatch = extra.match(/₹(\d+)/);
      return sum + (priceMatch ? parseInt(priceMatch[1], 10) : 0);
    }, 0);
    
    return itemTotal + extrasTotal;
  };

  return (
    <AnimatePresence>
      {open && item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-auto shadow-xl"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-[#1a4037]">{item.name}</h2>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-[#f5f3f0] transition-colors"
              >
                <X size={20} className="text-[#5a5a5a]" />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-[#5a5a5a]">{item.content}</p>
              
              <div className="mt-6">
                <h3 className="font-medium text-[#1a4037] mb-3">Special Instructions</h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special requests?"
                  className="w-full p-3 border rounded-lg resize-none h-24 focus:outline-none focus:ring-1 focus:ring-[#1a4037]"
                />
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-[#1a4037] mb-3">Quantity</h3>
                <div className="flex items-center gap-3 border rounded-lg p-2 w-fit">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-1 rounded-full hover:bg-[#f5f3f0] transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} className={`${quantity <= 1 ? 'text-gray-300' : 'text-[#5a5a5a]'}`} />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-1 rounded-full hover:bg-[#f5f3f0] transition-colors"
                  >
                    <Plus size={16} className="text-[#5a5a5a]" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-[#1a4037] mb-3">Add Extras</h3>
                <div className="space-y-2">
                  {["Extra Chapati (₹20)", "Extra Sweet (₹30)", "Extra Salad (₹15)"].map((extra, index) => (
                      <label 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-[#f5f3f0] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedExtras.includes(extra)}
                          onChange={() => handleExtraToggle(extra)}
                          className="h-4 w-4 rounded border-gray-300 text-[#1a4037] focus:ring-[#1a4037]"
                        />
                        <span className="text-[#2c2c2c]">{extra}</span>
                      </label>
                    ))}
                  </div>
                </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-[#1a4037] mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="p-2 rounded-full bg-[#f5f3f0] text-[#1a4037] disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2 rounded-full bg-[#f5f3f0] text-[#1a4037]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-lg">₹{calculateTotal()}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onOrder(item, quantity, selectedExtras, note);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#1a4037] text-white font-medium rounded-lg hover:bg-[#2d544c] transition-colors"
                >
                  Place Order
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}