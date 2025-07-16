"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProjectClient() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const projectName = searchParams.get("projectName");
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const system = searchParams.get("system");
  const responsible = searchParams.get("responsible");

  const [showSystemOptions, setShowSystemOptions] = useState(false);

  const systemList = [
    "Ahu",
    "Air Curtain",
    "Boiler",
    "Booster",
    "Chiller",
    "Clean Room",
    "Collector",
    "Cooling Tower",
    "Data Center",
    "Fan",
    "Fcu",
    "Generator",
    "Heat Exchanger",
    "Heat Reclaim",
    "Pump",
    "Surgery Room",
    "Unit Heater",
    "Ups",
    "Vav",
    "Water Tank",
    "Weather",
    "Other (manual entrance)",
  ];

  const actions = [
    {
      label: "Add System",
      onClick: () => setShowSystemOptions((prev) => !prev),
    },
    {
      label: "Add Panel",
      onClick: () => alert("Panel ekleme özelliği yakında eklenecek."),
    },
    {
      label: "Add Material",
      onClick: () => alert("Malzeme girişi özelliği yakında eklenecek."),
    },
    {
      label: "Add Module",
      onClick: () => alert("Modül girişi özelliği yakında eklenecek."),
    },
    {
      label: "Add Software",
      onClick: () => alert("Yazılım girişi özelliği yakında eklenecek."),
    },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>

      <div className="mb-6 text-gray-700 space-y-1 text-[15px] leading-tight">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Project Name:</strong> {projectName}</p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>System:</strong> {system}</p>
        <p><strong>Responsible:</strong> {responsible}</p>
      </div>

      <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
      <div className="flex flex-col items-start gap-4">
        {actions.map((action) => (
          <div key={action.label} className="w-full">
            <button
              onClick={action.onClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
            >
              {action.label}
            </button>

            {action.label === "Add System" && showSystemOptions && (
              <div className="mt-2 p-4 bg-white border border-gray-300 rounded shadow w-full">
                <h4 className="text-md font-semibold mb-2 text-gray-800">
                  Select a system
                </h4>
                <ul className="grid grid-cols-1 gap-2 text-sm max-h-[300px] overflow-y-auto">
                  {systemList.map((sys) => (
                    <li
                      key={sys}
                      className="cursor-pointer px-3 py-1 border border-gray-200 rounded hover:bg-blue-100 font-medium text-gray-700"
                      onClick={() => alert(`Selected system: ${sys}`)}
                    >
                      {sys}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
