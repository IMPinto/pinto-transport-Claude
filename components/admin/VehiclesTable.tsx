import { Edit, Trash2, Car, Bus } from "lucide-react";

// נתונים מדומים (אותם נתונים כמו ב-VehiclesGrid)
const vehiclesData = [
  {
    id: "vehicle-1",
    name: "מיניבוס פינטו 1",
    type: "MINIBUS",
    plateNumber: "123-45-678",
    createdAt: "2024-01-15",
    routesCount: 5,
    status: "פעיל",
  },
  {
    id: "vehicle-2",
    name: "אוטובוס פינטו 2",
    type: "BUS",
    plateNumber: "987-65-432",
    createdAt: "2024-01-20",
    routesCount: 8,
    status: "פעיל",
  },
  {
    id: "vehicle-3",
    name: "מיניבוס פינטו 3",
    type: "MINIBUS",
    plateNumber: "555-66-777",
    createdAt: "2024-02-01",
    routesCount: 3,
    status: "בתחזוקה",
  },
];

interface VehiclesTableProps {
  searchTerm: string;
  onEdit: (vehicle: any) => void;
}

export function VehiclesTable({ searchTerm, onEdit }: VehiclesTableProps) {
  const filteredVehicles = vehiclesData.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plateNumber.includes(searchTerm),
  );

  const handleDelete = (vehicleId: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק את הרכב?")) {
      console.log("Delete vehicle:", vehicleId);
    }
  };

  const getVehicleIcon = (type: string) => {
    return type === "BUS" ? Bus : Car;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "פעיל":
        return "bg-green-900/50 text-green-400";
      case "בתחזוקה":
        return "bg-yellow-900/50 text-yellow-400";
      case "לא פעיל":
        return "bg-red-900/50 text-red-400";
      default:
        return "bg-gray-900/50 text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                רכב
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                מספר רישוי
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                סוג
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                מסלולים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                תאריך רישום
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredVehicles.map((vehicle) => {
              const VehicleIcon = getVehicleIcon(vehicle.type);

              return (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center ml-3">
                        <VehicleIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-text">
                        {vehicle.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 font-mono">
                      {vehicle.plateNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300">
                      {vehicle.type === "BUS" ? "אוטובוס" : "מיניבוס"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {vehicle.routesCount} מסלולים
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(vehicle.createdAt).toLocaleDateString("he-IL")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">לא נמצאו רכבים</p>
        </div>
      )}
    </div>
  );
}
