import { Edit, Trash2, User, Car, Clock, MapPin, Play, Square } from 'lucide-react'

// נתונים מדומים של מסלולים
const routesData = [
  {
    id: '1',
    date: '2024-07-29',
    time: '08:00',
    description: 'מסלול תל אביב - ירושלים',
    driver: { name: 'נהג דוגמה', id: 'driver1' },
    vehicle: { name: 'מיניבוס פינטו 1', plateNumber: '123-45-678' },
    status: 'active',
    passengers: 12
  },
  {
    id: '2',
    date: '2024-07-29',
    time: '14:30',
    description: 'מסלול ירושלים - תל אביב',
    driver: { name: 'משה כהן', id: 'driver2' },
    vehicle: { name: 'אוטובוס פינטו 2', plateNumber: '987-65-432' },
    status: 'scheduled',
    passengers: 8
  },
  {
    id: '3',
    date: '2024-07-29',
    time: '18:00',
    description: 'מסלול תל אביב - חיפה',
    driver: { name: 'נהג דוגמה', id: 'driver1' },
    vehicle: { name: 'מיניבוס פינטו 3', plateNumber: '555-66-777' },
    status: 'scheduled',
    passengers: 15
  },
  {
    id: '4',
    date: '2024-07-28',
    time: '16:00',
    description: 'מסלול חיפה - תל אביב',
    driver: { name: 'דני אברהם', id: 'driver3' },
    vehicle: { name: 'מיניבוס פינטו 1', plateNumber: '123-45-678' },
    status: 'completed',
    passengers: 10
  }
]

interface RoutesTableProps {
  searchTerm: string
  dateFilter: string
  statusFilter: string
  onEdit: (route: any) => void
}

export function RoutesTable({ searchTerm, dateFilter, statusFilter, onEdit }: RoutesTableProps) {
  const filteredRoutes = routesData.filter(route => {
    const matchesSearch = 
      route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDate = !dateFilter || route.date === dateFilter
    const matchesStatus = !statusFilter || route.status === statusFilter

    return matchesSearch && matchesDate && matchesStatus
  })

  const handleDelete = (routeId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את המסלול?')) {
      console.log('Delete route:', routeId)
    }
  }

  const handleToggleStatus = (routeId: string, currentStatus: string) => {
    console.log('Toggle status for route:', routeId, currentStatus)
    // כאן יהיה לוגיקה להפעלה/עצירה של מסלול
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/50 text-green-400'
      case 'scheduled':
        return 'bg-blue-900/50 text-blue-400'
      case 'completed':
        return 'bg-gray-600/50 text-gray-400'
      case 'cancelled':
        return 'bg-red-900/50 text-red-400'
      default:
        return 'bg-gray-900/50 text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'פעיל'
      case 'scheduled':
        return 'מתוכנן'
      case 'completed':
        return 'הושלם'
      case 'cancelled':
        return 'בוטל'
      default:
        return 'לא ידוע'
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                מסלול
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                נהג ורכב
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                תאריך ושעה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                נוסעים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredRoutes.map((route) => (
              <tr key={route.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center ml-3">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-sm font-medium text-text">{route.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    <div className="flex items-center mb-1">
                      <User className="w-3 h-3 ml-1" />
                      {route.driver.name}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Car className="w-3 h-3 ml-1" />
                      {route.vehicle.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    <div className="font-medium">{new Date(route.date).toLocaleDateString('he-IL')}</div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-3 h-3 ml-1" />
                      {route.time}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                    {route.passengers} נוסעים
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(route.status)}`}>
                    {getStatusText(route.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {/* כפתור הפעלה/עצירה */}
                    {route.status === 'scheduled' && (
                      <button
                        onClick={() => handleToggleStatus(route.id, route.status)}
                        className="text-green-400 hover:text-green-300 transition-colors p-1"
                        title="התחל מסלול"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {route.status === 'active' && (
                      <button
                        onClick={() => handleToggleStatus(route.id, route.status)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors p-1"
                        title="עצור מסלול"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* כפתור עריכה */}
                    <button
                      onClick={() => onEdit(route)}
                      className="text-primary hover:text-primary-light transition-colors p-1"
                      title="עריכה"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {/* כפתור מחיקה */}
                    <button
                      onClick={() => handleDelete(route.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                      title="מחיקה"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredRoutes.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">לא נמצאו מסלולים</p>
        </div>
      )}
    </div>
  )
}