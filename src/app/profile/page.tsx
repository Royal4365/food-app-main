"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Clock, Edit, Save, X, LogOut, ShoppingBag, Heart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'settings'>('profile');
  const router = useRouter();

  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditForm({
        first_name: parsedUser.first_name || '',
        last_name: parsedUser.last_name || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || ''
      });
    }
    setLoading(false);
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setEditForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // In a real app, you would make an API call to update the user
    // For now, we'll just update localStorage
    if (user) {
      const updatedUser = { ...user, ...editForm };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    setIsEditing(false);
    setSaving(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4037]"></div>
          <p className="mt-4 text-[#5a5a5a]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#5a5a5a]">No user data found. Please log in again.</p>
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-[#1a4037] text-white rounded-lg hover:bg-[#0f2b21] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#1a4037] mb-2">My Profile</h1>
          <p className="text-[#5a5a5a]">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6">
              {/* Profile Overview */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#1a4037] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a4037]">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-[#5a5a5a] text-sm">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-[#1a4037] text-white' 
                      : 'text-[#5a5a5a] hover:bg-[#f5f3f0]'
                  }`}
                >
                  <User size={18} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-[#1a4037] text-white' 
                      : 'text-[#5a5a5a] hover:bg-[#f5f3f0]'
                  }`}
                >
                  <ShoppingBag size={18} />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'favorites' 
                      ? 'bg-[#1a4037] text-white' 
                      : 'text-[#5a5a5a] hover:bg-[#f5f3f0]'
                  }`}
                >
                  <Heart size={18} />
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-[#1a4037] text-white' 
                      : 'text-[#5a5a5a] hover:bg-[#f5f3f0]'
                  }`}
                >
                  <Settings size={18} />
                  Settings
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1a4037]">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a4037] text-white rounded-lg hover:bg-[#0f2b21] transition-colors"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#5a5a5a] mb-2">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.first_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#d0d0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f3f0] rounded-lg">
                        <User size={16} className="text-[#5a5a5a]" />
                        <span>{user.first_name}</span>
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#5a5a5a] mb-2">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.last_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#d0d0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f3f0] rounded-lg">
                        <User size={16} className="text-[#5a5a5a]" />
                        <span>{user.last_name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#5a5a5a] mb-2">Email</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f3f0] rounded-lg">
                      <Mail size={16} className="text-[#5a5a5a]" />
                      <span>{user.email}</span>
                    </div>
                    <p className="text-xs text-[#5a5a5a] mt-1">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#5a5a5a] mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#d0d0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f3f0] rounded-lg">
                        <Phone size={16} className="text-[#5a5a5a]" />
                        <span>{user.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#5a5a5a] mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-[#d0d0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4037] focus:border-[#1a4037]"
                      />
                    ) : (
                      <div className="flex items-start gap-2 px-3 py-2 bg-[#f5f3f0] rounded-lg">
                        <MapPin size={16} className="text-[#5a5a5a] mt-1" />
                        <span>{user.address || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Member Since */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#5a5a5a] mb-2">Member Since</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f3f0] rounded-lg">
                      <Clock size={16} className="text-[#5a5a5a]" />
                      <span>{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6">
                <h2 className="text-2xl font-bold text-[#1a4037] mb-6">Order History</h2>
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="text-[#5a5a5a] mx-auto mb-4" />
                  <p className="text-[#5a5a5a]">No orders yet</p>
                  <p className="text-sm text-[#5a5a5a] mt-2">Start ordering delicious Maharashtrian thalis!</p>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6">
                <h2 className="text-2xl font-bold text-[#1a4037] mb-6">Favorite Restaurants</h2>
                <div className="text-center py-12">
                  <Heart size={48} className="text-[#5a5a5a] mx-auto mb-4" />
                  <p className="text-[#5a5a5a]">No favorites yet</p>
                  <p className="text-sm text-[#5a5a5a] mt-2">Add restaurants to your favorites while browsing!</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#e5e7eb] p-6">
                <h2 className="text-2xl font-bold text-[#1a4037] mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a4037] mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Email notifications for new orders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Promotional offers and discounts</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>SMS notifications</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a4037] mb-3">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Allow restaurants to contact me</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>Share my data with partners</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


