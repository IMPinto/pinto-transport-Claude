'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Route, 
  LogOut, 
  Bus 
} from 'lucide-react'

const menuItems = [
  {
    name: 'לוח בקרה',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'נהגים',
    href: '/admin/drivers',
    icon: Users,
  },
  {
    name: 'רכבים',
    href: '/admin/vehicles',
    icon: Car,
  },
  {
    name: 'מסלולים',
    href: '/admin/routes',
    icon: Route,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-64 bg-gray-900 border-l border-gray-800 lg:translate-x-0">
      <div className="flex flex-col h-full">
        {/* לוגו */}
        <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center ml-3">
              <Bus className="w-5 h-5 text-background" />
            </div>
            <h1 className="text-lg font-bold text-primary">פינטו הסעים</h1>
          </div>
        </div>

        {/* תפריט */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 ml-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* כפתור יציאה */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 ml-3" />
            יציאה
          </button>
        </div>
      </div>
    </div>
  )
}