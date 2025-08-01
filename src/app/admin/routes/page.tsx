'use client'

import { useState } from 'react'
import { Plus, Search, Calendar, Clock, Filter } from 'lucide-react'
import { RoutesTable } from '@/components/admin/RoutesTable'
import { RouteModal } from '@/components/admin/RouteModal'

export default function RoutesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleAddRoute = () => {
    setSelectedRoute(null)
    setIsModalOpen(true)
  }

  const handleEditRoute = (route: any) => {
    setSelectedRoute(route)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* כותרת וכפתורים */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">ניהול מסלולים</h1>
          <p className="text-gray-400 mt-1">תכנון ותיאום מסלולי הסעה</p>
        </div>
        <button
          onClick={handleAddRoute}
          className="flex items-center bg-primary hover:bg-primary-light text-background font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          הוסף מסלול חדש
        </button>
      </div>

      {/* סטטיסטיקות מהירות */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">מסלולים היום</p>
              <p className="text-2xl font-bold text-text">12</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">פעילים כעת</p>
              <p className="text-2xl font-bold text-green-400">5</p>
            </div>
            <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">מתוכננים</p>
              <p className="text-2xl font-bold text-blue-400">18</p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">הושלמו</p>
              <p className="text-2xl font-bold text-secondary">7</p>
            </div>
            <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-secondary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* חיפוש וסינון */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* חיפוש */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש לפי תיאור או נהג..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
          </div>

          {/* סינון לפי תאריך */}
          <div>
            <div className="relative">
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
          </div>

          {/* סינון לפי סטטוס */}
          <div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              >
                <option value="">כל הסטטוסים</option>
                <option value="scheduled">מתוכנן</option>
                <option value="active">פעיל</option>
                <option value="completed">הושלם</option>
                <option value="cancelled">בוטל</option>
              </select>
            </div>
          </div>
        </div>

        {/* מעבר מהיר */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-primary/20 text-primary text-sm rounded-lg hover:bg-primary/30 transition-colors">
            היום
          </button>
          <button className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            מחר
          </button>
          <button className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            השבוע
          </button>
          <button className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            החודש
          </button>
        </div>
      </div>

      {/* טבלת מסלולים */}
      <RoutesTable 
        searchTerm={searchTerm}
        dateFilter={dateFilter}
        statusFilter={statusFilter}
        onEdit={handleEditRoute}
      />

      {/* מודל הוספה/עריכה */}
      <RouteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        route={selectedRoute}
      />
    </div>
  )
}