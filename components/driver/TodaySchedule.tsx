import { Clock, MapPin, Car, CheckCircle, AlertCircle } from "lucide-react";

// נתונים מדומים של מסלולים לנהג
const todayRoutes = [
  {
    id: "1",
    time: "08:00",
    vehicle: "מיניבוס פינטו 1",
    description: "מסלול תל אביב - ירושלים",
    status: "completed",
    passengers: 12,
  },
  {
    id: "2",
    time: "14:30",
    vehicle: "מיניבוס פינטו 1",
    description: "מסלול ירושלים - תל אביב",
    status: "upcoming",
    passengers: 8,
  },
  {
    id: "3",
    time: "18:00",
    vehicle: "מיניבוס פינטו 1",
    description: "מסלול תל אביב - חיפה",
    status: "scheduled",
    passengers: 15,
  },
];

export function TodaySchedule() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-900/50 text-green-400 border-green-800";
      case "upcoming":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-800";
      case "scheduled":
        return "bg-blue-900/50 text-blue-400 border-blue-800";
      default:
        return "bg-gray-900/50 text-gray-400 border-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "upcoming":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "הושלם";
      case "upcoming":
        return "הבא בתור";
      case "scheduled":
        return "מתוכנן";
      default:
        return "לא ידוע";
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text">לוח זמנים היום</h2>
        <div className="text-sm text-gray-400">
          {new Date().toLocaleDateString("he-IL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="space-y-4">
        {todayRoutes.map((route, index) => (
          <div
            key={route.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-lg ${
              route.status === "upcoming"
                ? "bg-yellow-900/10 border-yellow-600 ring-1 ring-yellow-600"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                {/* זמן */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {route.time}
                  </div>
                  {index < todayRoutes.length - 1 && (
                    <div className="w-px h-8 bg-gray-700 mx-auto mt-2"></div>
                  )}
                </div>

                {/* פרטי המסלול */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-text mb-1">
                    {route.description}
                  </h3>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
                    <span className="flex items-center">
                      <Car className="w-4 h-4 ml-1" />
                      {route.vehicle}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 ml-1" />
                      {route.passengers} נוסעים
                    </span>
                  </div>
                </div>
              </div>

              {/* סטטוס */}
              <div
                className={`flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(route.status)}`}
              >
                {getStatusIcon(route.status)}
                <span className="mr-1">{getStatusText(route.status)}</span>
              </div>
            </div>

            {/* פעולות למסלול הבא */}
            {route.status === "upcoming" && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex space-x-3 space-x-reverse">
                  <button className="flex-1 bg-primary hover:bg-primary-light text-background font-semibold py-2 px-4 rounded-lg transition-colors">
                    התחל מסלול
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors">
                    פרטים
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {todayRoutes.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">אין מסלולים מתוכננים להיום</p>
        </div>
      )}
    </div>
  );
}
