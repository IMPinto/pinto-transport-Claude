import { Calendar, Clock, Car, TrendingUp } from 'lucide-react'

// נתונים מדומים של סטטיסטיקות נהג
const driverStats = {
  totalRoutes: 24,
  thisWeek: 6,
  completedOnTime: 23,
  rating: 4.8
}

const recentRoutes = [
  {
    id: '1',
    date: '2024-07-28',
    time: '16:00',
    description: 'חיפה - תל אביב',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-07-27',
    time: '08:30',
    description: 'תל אביב - ירושלים',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-07-26',
    time: '14:15',
    description: 'ירושלים - באר שבע',
    status: 'completed'
  }
]

export function MyRoutes() {
  return (
    <div className="space-y-6">
      {/* סטטיסטיקות */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-text mb-4">הסטטיסטיקות שלי</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">סה״כ מסלולים</span>
            <span className="text-lg font-bold text-text">{driverStats.totalRoutes}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">השבוע</span>
            <span className="text-lg font-bold text-primary">{driverStats.thisWeek}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">בזמן</span>
            <span className="text-lg font-bold text-green-400">
              {Math.round((driverStats.completedOnTime / driverStats.totalRoutes) * 100)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">דירוג</span>
            <div className="flex items-center">
              <span className="text-lg font-bold text-yellow-400 ml-2">{driverStats.rating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${
                      star <= Math.floor(driverStats.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* מסלולים אחרונים */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text">מסלולים אחרונים</h3>
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>

        <div className="space-y-3">
          {recentRoutes.map((route) => (
            <div
              key={route.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{route.description}</p>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-400">
                    <span>{new Date(route.date).toLocaleDateString('he-IL')}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 ml-1" />
                      {route.time}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded-full">
                הושלם
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary-light transition-colors">
          צפה בכל המסלולים
        </button>
      </div>
    </div>
  )
}