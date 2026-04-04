import React from 'react'
import { UtensilsCrossed } from 'lucide-react' // Run: npm install lucide-react

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      {/* The "Icon" part of the logo */}
      <div className="flex items-center justify-center w-10 h-10
       bg-linear-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
        <UtensilsCrossed className="text-white w-6 h-6" />
      </div>

      {/* The "Text" part of the logo */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-black tracking-tighter text-gray-800">
          FOOD<span className="text-orange-600">SERVICE</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
          Premium Delivery
        </span>
      </div>
    </div>
  )
}

export default Logo