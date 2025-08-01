import { StatsCard } from '../../../components/admin/StatsCard'
import { RecentRoutes } from '../../../components/admin/RecentRoutes'
import { Car, Users, Router, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* כותרת */}
      <div>
        <h1 className="text-2xl font-bold text-text">לוח בקרה</h1>
        <p className="text-gray-400 mt-1">סקירה כללית של מערכת ההסעות</p>
      </div>

      {/* סטטיסטיקות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="סה״כ רכבים"
          value="12"
          change="+2 החודש"
          changeType="positive"
          icon={Car}
        />
        <StatsCard
          title="נהגים פעילים"
          value="8"
          change="+1 השבוע"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="מסלולים היום"
          value="24"
          change="+3 מאתמול"
          changeType="positive"
          icon={Router}
        />
        <StatsCard
          title="הזמנות החודש"
          value="156"
          change="-5 מהחודש הקודם"
          changeType="negative"
          icon={Calendar}
        />
      </div>

      {/* תוכן נוסף */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* מסלולים אחרונים */}
        <RecentRoutes />

        {/* גרף או מידע נוסף */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-text mb-4">פעילות שבועית</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>גרף פעילות יוצג כאן</p>
            </div>
          </div>
        </div>
      </div>

      {/* פעולות מהירות */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-text mb-4">פעולות מהירות</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Users className="w-5 h-5 text-primary ml-3" />
            <span className="text-text">הוסף נהג חדש</span>
          </button>
          <button className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Car className="w-5 h-5 text-primary ml-3" />
            <span className="text-text">רשום רכב חדש</span>
          </button>
          <button className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Router className="w-5 h-5 text-primary ml-3" />
            <span className="text-text">צור מסלול חדש</span>
          </button>
        </div>
      </div>
    </div>
  )
}