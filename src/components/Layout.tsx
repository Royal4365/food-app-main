"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Phone, User, ShoppingBag, ChevronDown, LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

  // Check auth state on component mount
  useEffect(() => {
    const checkAuthState = () => {
      const authState = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(authState === 'true');
    };
    
    checkAuthState();
    
    // Listen for storage changes (for cross-tab sync)
    window.addEventListener('storage', checkAuthState);
    return () => window.removeEventListener('storage', checkAuthState);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('.user-menu-dropdown')) {
          setIsUserMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Menu", path: "/all-thalis" },
    { name: "About Us", path: "/about" },
    { name: "Locations", path: "/locations" },
    { name: "Contact", path: "/contact" },
    { name: "Track Order", path: "/orders" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 bg-[#1a4037] text-[#ffffff] shadow-[0_2px_8px_rgba(26,64,55,0.15)] transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <nav className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-bold tracking-wide text-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#1a4037">
                <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
                <path d="M14,10a2,2,0,1,1-2-2A2,2,0,0,1,14,10Z"/>
                <path d="M6,10a2,2,0,1,1,2,2A2,2,0,0,1,6,10Z"/>
                <path d="M16,14a2,2,0,1,1,2,2A2,2,0,0,1,16,14Z"/>
                <path d="M8,14a2,2,0,1,1-2,2A2,2,0,0,1,8,14Z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold">TradiFeast</span>
              <span className="text-xs font-light -mt-1">Authentic Maharashtrian Cuisine</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`px-2 py-1 rounded transition-all hover:scale-105 hover:bg-[rgba(255,255,255,0.1)] ${pathname === item.path ? 'bg-[rgba(255,255,255,0.15)]' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="hidden lg:flex items-center ml-2">
              <div className="flex items-center mr-4">
                <Phone size={16} className="mr-1" />
                <span>+91 98765-43210</span>
              </div>
              
              {/* User Menu Dropdown */}
              <div className="relative user-menu-dropdown">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1 text-sm hover:bg-[rgba(255,255,255,0.1)] rounded-md transition-colors"
                >
                  <User size={16} />
                  <span>{isLoggedIn ? "My Account" : "Account"}</span>
                  <ChevronDown size={14} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e5e7eb] py-2 z-50"
                  >
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#f5f3f0] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} />
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#f5f3f0] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ShoppingBag size={16} />
                          My Orders
                        </Link>
                        <hr className="my-2 border-[#e5e7eb]" />
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setIsUserMenuOpen(false);
                            localStorage.removeItem('isLoggedIn');
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#f5f3f0] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} />
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#f5f3f0] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} />
                          Sign Up
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
            <Link 
              href="/all-thalis" 
              className="ml-2 px-4 py-2 bg-[#1a4037] text-white font-medium rounded-full border-2 border-white hover:bg-[#2d544c] transition-colors"
            >
              Order Now
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded-full">
              <ShoppingBag size={20} />
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.1)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </>
                )}
              </svg>
            </motion.button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a4037] border-t border-[rgba(255,255,255,0.1)] px-4 py-2"
          >
            <div className="flex flex-col space-y-2 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded ${pathname === item.path ? 'bg-[rgba(255,255,255,0.15)]' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center py-2 px-4">
                <Phone size={16} className="mr-2" />
                <span>+91 98765-43210</span>
              </div>
              
              {/* Mobile User Menu */}
              <div className="px-4 py-2">
                <div className="text-white text-sm font-medium mb-2">Account</div>
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link 
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.1)] rounded-md text-center"
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.1)] rounded-md text-center"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                        localStorage.removeItem('isLoggedIn');
                      }}
                      className="block w-full px-4 py-2 text-red-300 hover:bg-red-900/20 rounded-md text-center"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.1)] rounded-md text-center"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.1)] rounded-md text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
              <Link 
                href="/all-thalis"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-white text-[#1a4037] font-medium rounded-md text-center mt-2"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-[#1a4037] text-[#ffffff] text-sm">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#1a4037">
                    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
                    <path d="M14,10a2,2,0,1,1-2-2A2,2,0,0,1,14,10Z"/>
                    <path d="M6,10a2,2,0,1,1,2,2A2,2,0,0,1,6,10Z"/>
                    <path d="M16,14a2,2,0,1,1,2,2A2,2,0,0,1,16,14Z"/>
                    <path d="M8,14a2,2,0,1,1-2,2A2,2,0,0,1,8,14Z"/>
                  </svg>
                </div>
                TradiFeast
              </h3>
              <p className="mb-4">Authentic Maharashtrian cuisine delivered fresh to your doorstep.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="hover:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="hover:text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/restaurants" className="hover:underline">Restaurants</Link></li>
                <li><Link href="/all-thalis" className="hover:underline">Menu</Link></li>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/orders" className="hover:underline">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>123 Food Street, Pune, Maharashtra 411001</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>+91 98765-43210</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>info@tradifeast.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.1)] mt-6 pt-6 text-center">
            © {new Date().getFullYear()} TradiFeast. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}