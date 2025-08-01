'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, User } from 'lucide-react'
import { DriversTable } from '@/components/admin/DriversTable'
import { DriverModal } from '@/components/admin/DriverModal'

export default function DriversPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddDriver = () => {
    setSelectedDriver(null)
    setIsModalOpen(true)
  }

  const handleEditDriver = (driver: any) => {
    setSelectedDriver(driver)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* כותרת וכפתורים */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">ניהול נהגים</h1>
          <p className="text-gray-400 mt-1">רישום ועריכת פרטי נהגים</p>
        </div>
        <button
          onClick={handleAddDriver}
          className="flex items-center bg-primary hover:bg-primary-light text-background font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          הוסף נהג חדש
        </button>
      </div>

      {/* חיפוש וסינון */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש לפי שם או אימייל..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text">
            <option value="">כל התפקידים</option>
            <option value="DRIVER">נהגים</option>
            <option value="ADMIN">מנהלים</option>
          </select>
        </div>
      </div>

      {/* טבלת נהגים */}
      <DriversTable 
        searchTerm={searchTerm}
        onEdit={handleEditDriver}
      />

      {/* מודל הוספה/עריכה */}
      <DriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        driver={selectedDriver}
      />
    </div>
  )
}