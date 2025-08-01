import { Edit, Trash2, Car, Bus, Settings } from 'lucide-react'

// נתונים מדומים
const vehiclesData = [
  {
    id: 'vehicle-1',
    name: 'מיניבוס פינטו 1',
    type: 'MINIBUS',
    plateNumber: '123-45-678',
    createdAt: '2024-01-15',
    routesCount: 5,
    status: 'פעיל'
  },
  {
    id: 'vehicle-2',
    name: 'אוטובוס פינטו 2',
    type: 'BUS',
    plateNumber: '987-65-432',
    createdAt: '2024-01-20',
    routesCount: 8,
    status: 'פעיל'
  },
  {
    id: 'vehicle-3',
    name: 'מיניבוס פינטו 3',
    type: 'MINIBUS',
    plateNumber: '555-66-777',
    createdAt: '2024-02-01',
    routesCount: 3,
    status: 'בתחזוקה'
  }
]

interface VehiclesGridProps {
  searchTerm: string
  onEdit: (vehicle: any) => void
}

export function VehiclesGrid({ searchTerm, onEdit }: VehiclesGridProps) {
  const filteredVehicles = vehiclesData.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.plateNumber.includes(searchTerm)
  )

  const handleDelete = (vehicleId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הרכב?')) {
      console.log('Delete vehicle:', vehicleId)
    }
  }

  const getVehicleIcon = (type: string) => {
    return type === 'BUS' ? Bus : Car
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'פעיל':
        return 'bg-green-900/50 text-green-400'
      case 'בתחזוקה':
        return 'bg-yellow-900/50 text-yellow-400'
      case 'לא פעיל':
        return 'bg-red-900/50 text-red-400'
      default:
        return 'bg-gray-900/50 text-gray-400'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVehicles.map((vehicle) => {
        const VehicleIcon = getVehicleIcon(vehicle.type)
        
        return (
          <div
            key={vehicle.id}
            className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:border-primary/50 transition-colors"
          >
            {/* כותרת הרכב */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center ml-3">
                  <VehicleIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text">{vehicle.name}</h3>
                  <p className="text-sm text-gray-400">{vehicle.plateNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => onEdit(vehicle)}
                  className="text-primary hover:text-primary-light transition-colors p-1"
                  title="עריכה"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                  title="מחיקה"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* פרטי הרכב */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">סוג רכב:</span>
                <span className="text-sm text-text">
                  {vehicle.type === 'BUS' ? 'אוטובוס' : 'מיניבוס'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">מסלולים:</span>
                <span className="text-sm text-text">{vehicle.routesCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">סטטוס:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">תאריך רישום:</span>
                <span className="text-sm text-text">
                  {new Date(vehicle.createdAt).toLocaleDateString('he-IL')}
                </span>
              </div>
            </div>

            {/* כפתור פעולות */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors">
                <Settings className="w-4 h-4 ml-2" />
                פרטים נוספים
              </button>
            </div>
          </div>
        )
      })}
      
      {filteredVehicles.length === 0 && (
        <div className="col-span-full text-center py-12">
          <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">לא נמצאו רכבים</p>
        </div>
      )}
    </div>
  )
}