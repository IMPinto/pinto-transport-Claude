'use client'

import { useState, useEffect } from 'react'
import { X, User, Mail, Lock, Shield } from 'lucide-react'

interface DriverModalProps {
  isOpen: boolean
  onClose: () => void
  driver?: any
}

export function DriverModal({ isOpen, onClose, driver }: DriverModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'DRIVER'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || '',
        email: driver.email || '',
        password: '',
        role: driver.role || 'DRIVER'
      })
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'DRIVER'
      })
    }
  }, [driver])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // כאן יהיה קוד שמירה למסד הנתונים
      console.log('Save driver:', formData)
      
      // סימולציה של שמירה
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onClose()
    } catch (error) {
      console.error('Error saving driver:', error)
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
          {driver ? 'עריכת נהג' : 'הוספת נהג חדש'}
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
        {/* שם */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            שם מלא
          </label>
          <div className="relative">
            <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              placeholder="הכנס שם מלא"
              required
            />
          </div>
        </div>

        {/* אימייל */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            כתובת אימייל
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              placeholder="example@pinto.com"
              required
            />
          </div>
        </div>

        {/* סיסמה */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            {driver ? 'סיסמה חדשה (אופציונלי)' : 'סיסמה'}
          </label>
          <div className="relative">
            <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              placeholder="••••••••"
              required={!driver}
            />
          </div>
        </div>

        {/* תפקיד */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            תפקיד
          </label>
          <div className="relative">
            <Shield className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
            >
              <option value="DRIVER">נהג</option>
              <option value="ADMIN">מנהל</option>
            </select>
          </div>
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
            {loading ? 'שומר...' : driver ? 'עדכן' : 'הוסף'}
          </button>
        </div>
      </form>
    </div>