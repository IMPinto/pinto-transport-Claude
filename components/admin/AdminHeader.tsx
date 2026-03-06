"use client";

import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* חיפוש */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
                    type="text"
                    placeholder="חיפוש..."
                    className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text text-sm"
            />
          </div>
        </div>

        {/* פרטי משתמש */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* התראות */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* פרופיל */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-background font-semibold text-sm">
                {session?.user?.name?.charAt(0) || "M"}
              </span>
            </div>
            <div className="text-sm">
              <p className="text-text font-medium">
                {session?.user?.name || "מנהל"}
              </p>
              <p className="text-gray-400">מנהל מערכת</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
