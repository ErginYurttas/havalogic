"use client";
import React, { useState } from "react";

const systems = ["Ahu", "Boiler", "Fan", "Pump", "Chiller", "UPS", "VAV"];

export default function AddSystemTest() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-20 flex justify-center">
      <div className="relative w-64">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add System
        </button>
        {open && (
          <div className="absolute top-full mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto z-50">
            {systems.map((s) => (
              <div
                key={s}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => alert(s)}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
