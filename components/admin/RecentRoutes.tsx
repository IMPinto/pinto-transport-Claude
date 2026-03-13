import { Clock, User, Car } from "lucide-react";

// נתונים מדומים
const recentRoutes = [
  {
    id: 1,
    time: "08:00",
    driver: "נהג דוגמה",
    vehicle: "מיניבוס פינטו 1",
    description: "מסלול תל אביב - ירושלים",
    status: "פעיל",
  },
  {
    id: 2,
    time: "09:30",
    driver: "משה כהן",
    vehicle: "אוטובוס פינטו 2",
    description: "מסלול חיפה - נתניה",
    status: "הושלם",
  },
  {
    id: 3,
    time: "11:00",
    driver: "יוסי לוי",
    vehicle: "מיניבוס פינטו 3",
    description: "מסלול באר שבע - אשדוד",
    status: "בדרך",
  },
];

export function RecentRoutes() {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-lg font-semibold text-text mb-4">מסלולים אחרונים</h3>
      <div className="space-y-4">
        {recentRoutes.map((route) => (
          <div
            key={route.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text">
                  {route.description}
                </h4>
                <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-400 mt-1">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 ml-1" />
                    {route.time}
                  </span>
                  <span className="flex items-center">
                    <User className="w-3 h-3 ml-1" />
                    {route.driver}
                  </span>
                  <span className="flex items-center">
                    <Car className="w-3 h-3 ml-1" />
                    {route.vehicle}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  route.status === "פעיל"
                    ? "bg-green-900/50 text-green-400"
                    : route.status === "הושלם"
                      ? "bg-blue-900/50 text-blue-400"
                      : "bg-yellow-900/50 text-yellow-400"
                }`}
              >
                {route.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
