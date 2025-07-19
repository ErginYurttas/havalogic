"use client";

import React from "react";

const systemList = [
  "Ahu", "Air Curtain", "Boiler", "Booster", "Chiller",
  "Clean Room", "Collector", "Cooling Tower", "Data Center", "Fan",
  "Fcu", "Generator", "Heat Exchanger", "Heat Reclaim", "Pump",
  "Surgery Room", "Unit Heater", "Ups", "Vav", "Water Tank",
  "Weather", "Other (manual entrance)"
];

export default function SystemDropdown({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto z-50">
      {systemList.map((item) => (
        <div
          key={item}
          className="px-4 py-2 text-gray-900 hover:bg-blue-100 cursor-pointer text-sm font-medium"
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
