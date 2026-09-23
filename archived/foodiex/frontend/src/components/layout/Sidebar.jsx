// src/components/layout/Sidebar.jsx
import React, { useState } from 'react'
import { useFrappeAuth } from 'frappe-react-sdk'
import { getLocalizedNavigation } from '../../config/navigation'
import SidebarDropdown from '../ui/SidebarDropdown'
import Button from '../ui/Button'
import logo from '../../assets/images/logo.svg'


const Sidebar = () => {
  const { currentUser } = useFrappeAuth()
  const [activeItem, setActiveItem] = useState('Dashboard')

  const userRoles = window.frappe?.user_roles || ['All']
  
  // 1. جلب القائمة المترجمة
  const localizedMenu = getLocalizedNavigation()

  // 2. استخدام localizedMenu بدلاً من navigationConfig للتصفية
  const filteredNavigation = localizedMenu.filter(item => {
    if (item.requiredRole === 'All') return true
    return userRoles.includes(item.requiredRole)
  })

  return (
    <aside className="w-64 h-screen bg-[#F8F9FC] border-r border-gray-200 flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* اللوجو */}
        <div className="flex items-center px-4 mb-8">
          <img src={logo} alt="Nuvio Logo" className="h-10 w-auto" />
        </div>

        {/* عرض عناصر التصفح الديناميكية */}
        <div className="space-y-1.5">
          {filteredNavigation.map((item, index) => {
            if (item.isDropdown) {
              return (
                <SidebarDropdown 
                  key={index}
                  name={item.displayName}
                  icon={item.icon}
                  items={item.subItems}
                />
              )
            }

            // 3. استبدال item.name بـ item.displayName هنا أيضاً لتجنب crash الكائنات
            return (
              <Button
                key={index}
                icon={item.icon}
                variant={activeItem === item.displayName ? 'active' : 'ghost'}
                onClick={() => setActiveItem(item.displayName)}
              >
                {item.displayName}
              </Button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
