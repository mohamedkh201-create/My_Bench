// src/components/ui/SidebarDropdown.jsx
import React, { useState } from 'react'

const SidebarDropdown = ({ name, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer outline-none text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
          <span>{name}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-1 pl-10 pr-2 space-y-1">
          {items?.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center justify-between text-left py-2 px-3 text-xs font-medium text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span>{item.displayName}</span>
              {item.badge && (
                <span className="bg-emerald-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarDropdown
