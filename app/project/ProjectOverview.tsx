"use client";

import React, { useState } from "react";

export default function ProjectOverview() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const systemList = [
    "Ahu", "Air Curtain", "Boiler", "Booster", "Chiller",
    "Clean Room", "Collector", "Cooling Tower", "Data Center", "Fan",
    "Fcu", "Generator", "Heat Exchanger", "Heat Reclaim", "Pump",
    "Surgery Room", "Unit Heater", "Ups", "Vav", "Water Tank",
    "Weather", "Other (manual entrance)"
  ];

  const handleSelectSystem = (system: string) => {
    setSelectedSystem(system);
    setShowDropdown(false);
    alert(`Selected system: ${system}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white">Project Overview</h2>

      {/* Butonlar */}
      <div className="flex flex-col items-start gap-4 mb-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Panel
        </button>

        {/* Add System dropdown */}
        <div className="relative w-full max-w-xs">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-left"
          >
            {selectedSystem ? `System: ${selectedSystem}` : "Add System"}
          </button>

          {showDropdown && (
            <ul className="absolute left-0 top-full mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50 text-sm scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
              {systemList.map((system) => (
                <li
                  key={system}
                  onClick={() => handleSelectSystem(system)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-800 border-b border-gray-200 last:border-b-0 font-medium"
                >
                  {system}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Material
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Software
        </button>
      </div>
    </div>
  );
}
