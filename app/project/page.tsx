"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const [showSystems, setShowSystems] = useState(false);

  const systemOptions = [
    "Ahu", "Air Curtain", "Boiler", "Booster", "Chiller", "Clean Room", "Collector", "Cooling Tower",
    "Data Center", "Fan", "Fcu", "Generator", "Heat Exchanger", "Heat Reclaim", "Office", "Pump", "Surgery Room", 
    "Unit Heater", "Ups", "Vav", "Manual Entry"
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* PROJE BİLGİLERİ (ORİJİNAL YAPINIZ AYNEN KORUNDU) */}
      <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
      <div className="mb-6 text-gray-700 space-y-1">
        <p><strong>Category:</strong> {searchParams.get("category")}</p>
        <p><strong>Project Name:</strong> {searchParams.get("projectName")}</p>
        <p><strong>Country:</strong> {searchParams.get("country")}</p>
        <p><strong>City:</strong> {searchParams.get("city")}</p>
        <p><strong>System:</strong> {searchParams.get("system")}</p>
        <p><strong>Responsible:</strong> {searchParams.get("responsible")}</p>
      </div>

      {/* Butonlar */}
      <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
      <div className="flex flex-col items-start gap-4">
        {/* Add System Butonu */}
        <div className="relative">
          <button
            onClick={() => setShowSystems(!showSystems)}
            className="w-[150px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-left" // 🔴 Genişlik 150px
          >
            Add System
          </button>
          
          {showSystems && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow max-h-[300px] overflow-y-auto z-50">
              {systemOptions.map((sys) => (
                <div
                  key={sys}
                  className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer border-b border-gray-200 last:border-b-0" // 🔴 text-gray-800 eklendi
                  onClick={() => alert(`Selected: ${sys}`)}
                >
                  {sys}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Diğer Butonlar (Aynı Genişlikte) */}
        <button className="w-[150px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-left">
          Add Panel
        </button>
        <button className="w-[150px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-left">
          Add Material
        </button>
      </div>
    </div>
  );
}