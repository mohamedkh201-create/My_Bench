// src/components/ui/Button.jsx
import React from 'react'

const Button = ({ 
  children, 
  icon, 
  onClick, 
  variant = 'ghost', // ghost, primary, active
  className = '', 
  ...props 
}) => {
  
  // تعريف الاستايلات لكل نوع من الأزرار بناءً على Tailwind
  const baseStyles = 'w-full flex items-center justify-between px-2 mb-2  py-2 rounded-sm text-sm font-medium transition-all duration-150 cursor-pointer outline-none'
  
  const variants = {
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    active: 'bg-[#209EDE] text-white   ',
    primary: 'bg-[#5025D1] text-white hover:bg-[#401cb0]'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  )
}

export default Button
