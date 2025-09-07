"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function BillingContent() {
  const params = useSearchParams();
  const name = params.get("name") || "Thali";
  const price = Number(params.get("price") || 0);
  const weeks = Number(params.get("weeks") || 1);

  const thaliCount = 12 * weeks;
  const thaliCost = price * thaliCount;
  const gst = thaliCost * 0.05;
  const [tip, setTip] = useState(0);
  const [coupon, setCoupon] = useState("");

  const discount = useMemo(() => (coupon.trim().toUpperCase() === "THALI10" ? thaliCost * 0.1 : 0), [coupon, thaliCost]);
  const total = useMemo(() => thaliCost + gst + tip - discount, [thaliCost, gst, tip, discount]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 animate-slide-in">
      <h1 className="text-3xl font-bold text-[#1a4037] mb-2">Complete Your Order</h1>
      <p className="text-[#5a5a5a] mb-6">Review your order details and select payment method</p>

      <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb]">
        <div className="p-5 border-b border-[#e5e7eb] bg-[#f5f3f0]">
          <h2 className="font-semibold text-[#1a4037] text-lg">Order Summary</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-[#2c2c2c]">Thali</div>
            <div className="text-right font-medium text-[#1a4037]">{name}</div>
            <div className="text-[#2c2c2c]">Quantity</div>
            <div className="text-right font-medium text-[#1a4037]">{thaliCount} (12/week × {weeks} weeks)</div>
            <div className="text-[#2c2c2c]">Thali cost</div>
            <div className="text-right font-medium text-[#1a4037]">₹{thaliCost.toFixed(2)}</div>
            <div className="text-[#5a5a5a]">GST (5%)</div>
            <div className="text-right font-medium text-[#5a5a5a]">₹{gst.toFixed(2)}</div>
            <div className="text-[#5a5a5a]">Discount</div>
            <div className="text-right font-medium text-green-600">{discount > 0 ? `-₹${discount.toFixed(2)}` : '₹0.00'}</div>
            <div className="text-[#5a5a5a]">Tip</div>
            <div className="text-right font-medium text-[#5a5a5a]">₹{tip.toFixed(2)}</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm mb-1.5 text-[#5a5a5a]">Coupon Code</label>
              <div className="flex">
                <input
                  placeholder="Enter coupon (e.g., THALI10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 rounded-l-md border px-4 py-2.5 bg-white border-[#d0d0d0] focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
                />
                <button className="bg-[#2d544c] text-white px-4 py-2.5 rounded-r-md hover:bg-[#1a4037] transition-colors">
                  Apply
                </button>
              </div>
              {coupon.trim().toUpperCase() === "THALI10" && (
                <p className="mt-1 text-xs text-green-600">THALI10 applied! 10% discount</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1.5 text-[#5a5a5a]">Add Tip</label>
              <input
                type="number"
                min={0}
                placeholder="Enter tip amount"
                value={tip}
                onChange={(e) => setTip(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-md border px-4 py-2.5 bg-white border-[#d0d0d0] focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
              />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#e5e7eb]">
            <div className="flex items-center justify-between text-lg font-bold">
              <div className="text-[#2c2c2c]">Total Amount</div>
              <div className="text-xl font-bold text-[#1a4037]">₹{total.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-8">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-md bg-[#f5f3f0] px-4 py-3 text-[#1a4037] border border-[#1a4037]">
                <span className="font-medium">Payment Methods</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 rounded-md border border-[#d0d0d0] p-3 cursor-pointer hover:bg-[#f0f9ff] transition-colors">
                  <input type="radio" name="payment" className="h-4 w-4 accent-[#1a4037]" defaultChecked />
                  <span className="text-[#2c2c2c]">Credit Card</span>
                </label>
                <label className="flex items-center gap-3 rounded-md border border-[#d0d0d0] p-3 cursor-pointer hover:bg-[#f0f9ff] transition-colors">
                  <input type="radio" name="payment" className="h-4 w-4 accent-[#1a4037]" />
                  <span className="text-[#2c2c2c]">UPI</span>
                </label>
                <label className="flex items-center gap-3 rounded-md border border-[#d0d0d0] p-3 cursor-pointer hover:bg-[#f0f9ff] transition-colors">
                  <input type="radio" name="payment" className="h-4 w-4 accent-[#1a4037]" />
                  <span className="text-[#2c2c2c]">Net Banking</span>
                </label>
              </div>
            </details>
            <button 
              className="mt-6 w-full rounded-md px-6 py-3 text-white font-bold text-lg hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #1a4037, #2d544c)' }}
            >
              Pay ₹{total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}



