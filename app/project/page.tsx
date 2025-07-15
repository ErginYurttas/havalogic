"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ProjectPage() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const projectName = searchParams.get("projectName");
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const system = searchParams.get("system");
  const responsible = searchParams.get("responsible");

  const [showSystemList, setShowSystemList] = useState(false);

  const systems = [
    "Ahu", "Air Curtain", "Boiler", "Booster", "Chiller",
    "Clean Room", "Collector", "Cooling Tower", "Data Center", "Fan",
    "Fcu", "Generator", "Heat Exchanger", "Heat Reclaim", "Pump",
    "Surgery Room", "Unit Heater", "Ups", "Vav", "Water Tank",
    "Weather", "Other (manual entrance)"
  ];

  const handleSystemClick = (system: string) => {
    alert(`${system} system selected.`);
    setShowSystemList(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>

      <div className="mb-6 text-gray-700 space-y-1">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Project Name:</strong> {projectName}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>System:</strong> {system}</p>
        <p><strong>Responsible:</strong> {responsible}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Next Steps</h3>

      <div className="relative flex flex-col items-start gap-4">
        {/* Create System butonu */}
        <button
          onClick={() => setShowSystemList(!showSystemList)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create System
        </button>

        {/* Sistem listesi popup */}
        {showSystemList && (
          <div className="absolute top-14 left-0 z-50 bg-white border border-gray-300 rounded shadow-lg p-4 max-h-64 overflow-y-auto w-64">
            <p className="text-gray-700 font-medium mb-2">Select a system:</p>
            <ul className="space-y-1">
              {systems.map((item) => (
                <li
                  key={item}
                  onClick={() => handleSystemClick(item)}
                  className="cursor-pointer hover:text-blue-600 text-sm text-gray-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diğer butonlar */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Panel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Material
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Module
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Software
        </button>
      </div>
    </div>
  );
}
