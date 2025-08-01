'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Calendar, Clock, User, Car } from 'lucide-react'

// נתונים מדומים של נהגים ורכבים
const mockDrivers = [
  { id: 'driver1', name: 'נהג דוגמה' },
  { id: 'driver2', name: 'משה כהן' },
  { id: 'driver3', name: 'דני אברהם' }
]

const mockVehicles = [
  { id: 'vehicle1', name: 'מיניבוס פינטו 1', plateNumber: '123-45-678' },
  { id: 'vehicle2', name: 'אוטובוס פינטו 2', plateNumber: '987-65-432' },
  { id: 'vehicle3', name: 'מיניבוס פינטו 3', plateNumber: '555-66-777' }
]

interface RouteModalProps {
  isOpen: boolean
  onClose: () => void
  route?: any
}

export function RouteModal({ isOpen, onClose, route }: RouteModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    time: '',
    driverId: '',
    vehicleId: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (route) {
      setFormData({
        description: route.description || '',
        date: route.date || '',
        time: route.time || '',
        driverId: route.driver?.id || '',
        vehicleId: route.vehicle?.id || ''
      })
    } else {
      setFormData({
        description: '',
        date: '',
        time: '',
        driverId: '',
        vehicleId: ''
      })
    }
  }, [route])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // כאן יהיה קוד שמירה למסד הנתונים
      console.log('Save route:', formData)
      
      // סימולציה של שמירה
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onClose()
    } catch (error) {
      console.error('Error saving route:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-lg w-full border border-gray-800">
        {/* כותרת */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-text">
            {route ? 'עריכת מסלול' : 'הוספת מסלול חדש'}
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
          {/* תיאור המסלול */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              תיאור המסלול
            </label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="למשל: תל אביב - ירושלים"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* תאריך */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                תאריך
              </label>
              <div className="relative">
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                  required
                />
              </div>
            </div>

            {/* שעה */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                שעה
              </label>
              <div className="relative">
                <Clock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                  required
                />
              </div>
            </div>
          </div>

          {/* נהג */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              נהג
            </label>
            <div className="relative">
              <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <select
                value={formData.driverId}
                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                required
              >
                <option value="">בחר נהג</option>
                {mockDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* רכב */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              רכב
            </label>
            <div className="relative">
              <Car className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <select
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                required
              >
                <option value="">בחר רכב</option>
                {mockVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.plateNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* הערות נוספות */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              הערות (אופציונלי)
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text resize-none"
              placeholder="הערות נוספות על המסלול..."
            />
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
              {loading ? 'שומר...' : route ? 'עדכן מסלול' : 'צור מסלול'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}