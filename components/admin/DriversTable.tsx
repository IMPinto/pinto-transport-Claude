import { Edit, Trash2, User, Mail, Shield } from "lucide-react";

// נתונים מדומים
const driversData = [
  {
    id: "1",
    name: "נהג דוגמה",
    email: "driver@pinto.com",
    role: "DRIVER",
    createdAt: "2024-01-15",
    routesCount: 12,
  },
  {
    id: "2",
    name: "מנהל המערכת",
    email: "admin@pinto.com",
    role: "ADMIN",
    createdAt: "2024-01-10",
    routesCount: 0,
  },
  {
    id: "3",
    name: "משה כהן",
    email: "moshe@pinto.com",
    role: "DRIVER",
    createdAt: "2024-02-01",
    routesCount: 8,
  },
];

interface DriversTableProps {
  searchTerm: string;
  onEdit: (driver: any) => void;
}

export function DriversTable({ searchTerm, onEdit }: DriversTableProps) {
  const filteredDrivers = driversData.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (driverId: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק את הנהג?")) {
      // כאן יהיה קוד מחיקה
      console.log("Delete driver:", driverId);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                נהג
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                תפקיד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                מסלולים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                תאריך הצטרפות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredDrivers.map((driver) => (
              <tr
                key={driver.id}
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center ml-3">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text">
                        {driver.name}
                      </div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Mail className="w-3 h-3 ml-1" />
                        {driver.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      driver.role === "ADMIN"
                        ? "bg-purple-900/50 text-purple-400"
                        : "bg-green-900/50 text-green-400"
                    }`}
                  >
                    <Shield className="w-3 h-3 ml-1" />
                    {driver.role === "ADMIN" ? "מנהל" : "נהג"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {driver.routesCount} מסלולים
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(driver.createdAt).toLocaleDateString("he-IL")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => onEdit(driver)}
                      className="text-primary hover:text-primary-light transition-colors p-1"
                      title="עריכה"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(driver.id)}
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

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">לא נמצאו נהגים</p>
        </div>
      )}
    </div>
  );
}
