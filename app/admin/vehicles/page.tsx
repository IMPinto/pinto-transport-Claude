"use client";

import { useState } from "react";
import { Plus, Search, Car } from "lucide-react";
import { VehiclesTable } from "../../../components/admin/VehiclesTable";
import { VehiclesGrid } from "../../../components/admin/VehiclesGrid";
import { VehicleModal } from "../../../components/admin/VehicleModal";

export default function VehiclesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* כותרת וכפתורים */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">ניהול רכבים</h1>
          <p className="text-gray-400 mt-1">רישום ועריכת פרטי רכבי הצי</p>
        </div>
        <button
          onClick={handleAddVehicle}
          className="flex items-center bg-primary hover:bg-primary-light text-background font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          הוסף רכב חדש
        </button>
      </div>

      {/* חיפוש וסינון */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש לפי שם רכב או מספר רישוי..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text">
              <option value="">כל הסוגים</option>
              <option value="MINIBUS">מיניבוס</option>
              <option value="BUS">אוטובוס</option>
            </select>
            <div className="flex rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 text-sm rounded ${
                  viewMode === "grid"
                    ? "bg-primary text-background"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                רשת
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 text-sm rounded ${
                  viewMode === "table"
                    ? "bg-primary text-background"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                טבלה
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* תוכן הרכבים */}
      {viewMode === "grid" ? (
        <VehiclesGrid searchTerm={searchTerm} onEdit={handleEditVehicle} />
      ) : (
        <VehiclesTable searchTerm={searchTerm} onEdit={handleEditVehicle} />
      )}

      {/* מודל הוספה/עריכה */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
