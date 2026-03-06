"use client";

import { useSession } from "next-auth/react";
import { Calendar, Clock, Car, MapPin, CheckCircle } from "lucide-react";
import { MyRoutes } from "../../../components/driver/MyRoutes";
import { TodaySchedule } from "../../../components/driver/TodaySchedule";

export default function DriverDashboard() {
  const { data: session } = useSession();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ברכה */}
      <div className="bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-lg p-6 border border-primary/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text">
              שלום {session?.user?.name || "נהג"}!
            </h1>
            <p className="text-gray-400 mt-1">
              ברוך הבא ללוח הבקרה שלך - כאן תוכל לראות את כל המסלולים המיועדים
              לך
            </p>
          </div>
          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
            <Car className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* סטטיסטיקות מהירות */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">מסלולים היום</p>
              <p className="text-2xl font-bold text-text">3</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">הושלמו</p>
              <p className="text-2xl font-bold text-green-400">1</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">הבא בתור</p>
              <p className="text-lg font-bold text-yellow-400">14:30</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">סה״כ השבוע</p>
              <p className="text-2xl font-bold text-text">12</p>
            </div>
            <MapPin className="w-8 h-8 text-secondary" />
          </div>
        </div>
      </div>

      {/* תוכן ראשי */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* לוח זמנים היום */}
        <div className="lg:col-span-2">
          <TodaySchedule />
        </div>

        {/* המסלולים שלי */}
        <div>
          <MyRoutes />
        </div>
      </div>

      {/* הודעות והתראות */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-text mb-4">
          הודעות ועדכונים
        </h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-blue-400 font-medium">עדכון מסלול</p>
              <p className="text-sm text-gray-300 mt-1">
                מסלול 14:30 עודכן - נקודת איסוף חדשה נוספה
              </p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-green-900/20 border border-green-800 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-green-400 font-medium">משוב חיובי</p>
              <p className="text-sm text-gray-300 mt-1">
                קיבלת ציון 5 כзвезд על המסלול של אתמול - כל הכבוד!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
