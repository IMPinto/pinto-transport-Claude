'use client'

import { useState, useEffect } from 'react'
import { X, Car, Hash, Tag } from 'lucide-react'

interface VehicleModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle?: any
}

export function VehicleModal({ isOpen, onClose, vehicle }: VehicleModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'MINIBUS',
    plateNumber: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || '',
        type: vehicle.type || 'MINIBUS',
        plateNumber: vehicle.plateNumber || ''
      })
    } else {
      setFormData({
        name: '',
        type: 'MINIBUS',
        plateNumber: ''
      })
    }
  }, [vehicle])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // כאן יהיה קוד שמירה למסד הנתונים
      console.log('Save vehicle:', formData)
      
      // סימולציה של שמירה
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onClose()
    } catch (error) {
      console.error('Error saving vehicle:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
        {/* כותרת */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-text">
            {vehicle ? 'עריכת רכב' : 'הוספת רכב חדש'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* טופס */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* שם הרכב */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              שם הרכב
            </label>
            <div className="relative">
              <Tag className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="למשל: מיניבוס פינטו 1"
                required
              />
            </div>
          </div>

          {/* סוג רכב */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              סוג רכב
            </label>
            <div className="relative">
              <Car className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              >
                <option value="MINIBUS">מיניבוס</option>
                <option value="BUS">אוטובוס</option>
              </select>
            </div>
          </div>

          {/* מספר רישוי */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              מספר רישוי
            </label>
            <div className="relative">
              <Hash className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="123-45-678"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              הכנס בפורמט: XXX-XX-XXX
            </p>
          </div>

          {/* כפתורים */}
          <div className="flex space-x-3 space-x-reverse pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-primary hover:bg-primary-light text-background font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'שומר...' : vehicle ? 'עדכן' : 'הוסף'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}