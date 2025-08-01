'use client'

import { useSession, signOut } from 'next-auth/react'
import { Bus, Bell, LogOut, User } from 'lucide-react'

export function DriverHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* לוגו ושם המערכת */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center ml-3">
            <Bus className="w-5 h-5 text-background" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">פינטו הסעים</h1>
            <p className="text-xs text-gray-400">פאנל נהג</p>
          </div>
        </div>

        {/* פרטי נהג ופעולות */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* התראות */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* פרופיל נהג */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-background" />
            </div>
            <div className="text-sm">
              <p className="text-text font-medium">{session?.user?.name || 'נהג'}</p>
              <p className="text-gray-400">נהג פעיל</p>
            </div>
          </div>

          {/* כפתור יציאה */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
            title="יציאה"
          >
            <LogOut className="w-4 h-4 ml-1" />
            יציאה
          </button>
        </div>
      </div>
    </header>
  )
}