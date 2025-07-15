"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function ProjectClient() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const projectName = searchParams.get("projectName");
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const system = searchParams.get("system");
  const responsible = searchParams.get("responsible");

  const actions = [
    "Create System",
    "Add Panel",
    "Add Material",
    "Add Module",
    "Add Software",
  ];

  const handleClick = (action: string) => {
    alert(`${action} feature is coming soon.`);
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
      <div className="flex flex-col items-start gap-4">
        {actions.map((action) => (
          <button
            key={action}
            onClick={() => handleClick(action)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
