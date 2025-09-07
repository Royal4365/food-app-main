import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-[#1a4037] mb-2">Your Orders</h1>
      <p className="text-[#5a5a5a] mb-8">Track and manage your recent orders</p>
      
      <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f5f3f0] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5a5a5a]">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-[#2c2c2c] mb-3">Your recent orders will appear here.</h2>
        <p className="text-[#5a5a5a] max-w-md mx-auto mb-8">Start ordering to see your order history!</p>
        
        <Link 
          href="/all-thalis" 
          className="inline-block px-6 py-3 bg-[#1a4037] text-white font-medium rounded-lg hover:bg-[#0f2b21] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          Browse Thalis
        </Link>
      </div>
    </div>
  );
}



