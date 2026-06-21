'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Bell, MapPin, Settings, CreditCard } from 'lucide-react';

// Mock pre-bookings
const mockPreBookings = [
  {
    id: '1',
    productName: 'Royal Oak Perpetual',
    productImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    depositPaid: 4500,
    totalPrice: 45000,
    estimatedDelivery: '2024-08-15',
    status: 'Processing',
  },
  {
    id: '2',
    productName: 'Submariner Date',
    productImage: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80',
    depositPaid: 1250,
    totalPrice: 12500,
    estimatedDelivery: '2024-07-20',
    status: 'Confirmed',
  },
];

export default function DashboardPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
        <p className="text-gray-400">Manage your account and pre-bookings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <User size={40} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">John Doe</h2>
              <p className="text-gray-400">john@example.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 text-left text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
              <User size={20} />
              Edit Profile
            </button>
            <button className="w-full flex items-center gap-3 text-left text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
              <Package size={20} />
              My Orders
            </button>
            <button className="w-full flex items-center gap-3 text-left text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
              <CreditCard size={20} />
              Payment Methods
            </button>
            <button className="w-full flex items-center gap-3 text-left text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5">
              <Settings size={20} />
              Settings
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pre-bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Package size={24} />
              My Pre-bookings
            </h3>
            
            <div className="space-y-4">
              {mockPreBookings.map((booking) => (
                <div key={booking.id} className="bg-white/5 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={booking.productImage} 
                      alt={booking.productName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{booking.productName}</h4>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                      <span>Deposit: ${booking.depositPaid.toLocaleString()}</span>
                      <span>Total: ${booking.totalPrice.toLocaleString()}</span>
                      <span>Delivery: {booking.estimatedDelivery}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Address & Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Delivery Address */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Delivery Address
              </h3>
              <div className="text-gray-300 space-y-2">
                <p>123 Luxury Lane</p>
                <p>Beverly Hills, CA 90210</p>
                <p>United States</p>
              </div>
              <button className="mt-4 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                Edit Address
              </button>
            </div>

            {/* Notifications */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Bell size={20} />
                Notifications
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email notifications for product launches</span>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    emailNotifications ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full mt-1 ml-1 transition-transform ${
                    emailNotifications ? 'translate-x-7' : ''
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
