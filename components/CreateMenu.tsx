"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/MyContextProvider";

interface CreateMenuProps {
  onSaveComplete?: () => void;
}

export default function CreateMenu({ onSaveComplete }: CreateMenuProps) {
  const context = useContext(MyContext);
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showSystemOptions, setShowSystemOptions] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    country: "",
    city: "",
    system: "",
    responsible: "",
  });

  const menuItems = [
    "Airport", "Factory", "Hospital", "Mall",
    "Office", "Resident", "School", "Other",
  ].sort((a, b) => a.localeCompare(b));

  const systemOptions = [
    "Ahu", "Air Curtain", "Boiler", "Booster", "Chiller",
    "Clean Room", "Collector", "Cooling Tower", "Data Center",
    "Fan", "Fcu", "Generator", "Heat Exchanger", "Heat Reclaim",
    "Pump", "Surgery Room", "Unit Heater", "Ups", "Vav",
    "Water Tank", "Weather", "Other (manual entrance)",
  ];

  if (!context || context.value === "Hello") return null;

  const handleItemClick = (item: string) => {
    setActiveItem((prev) => (prev === item ? null : item));
    setFormData({
      projectName: "",
      country: "",
      city: "",
      system: "",
      responsible: "",
    });
    setShowSystemOptions(false);
    setSelectedSystem("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { projectName, country, city, system, responsible } = formData;

    if (!activeItem) {
      alert("Please select a project category.");
      return;
    }

    if (!projectName || !country || !city || !system || !responsible) {
      alert("Please fill in all the fields.");
      return;
    }

    const query = new URLSearchParams({
      category: activeItem,
      projectName,
      country,
      city,
      system,
      responsible,
    }).toString();

    // Menü kapatma callback'i (örneğin Dashboard'da paneli kapatmak için)
    if (onSaveComplete) {
      onSaveComplete();
    }

    router.push(`/project?${query}`);
  };

  return (
    <div className="pt-4 flex flex-col items-start max-w-3xl">
      <ul className="bg-white text-black rounded shadow-lg p-4 w-full space-y-4">
        {menuItems.map((item) => (
          <li key={item} className="cursor-pointer">
            <p
              onClick={() => handleItemClick(item)}
              className="hover:text-blue-600 font-medium"
            >
              {item}
            </p>

            {activeItem === item && (
              <div className="mt-2 space-y-2 text-sm">
                <p className="text-gray-600">
                  You are creating a project for a <strong>{item}</strong>.
                </p>
                <input
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Project Name"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  placeholder="Responsible Person"
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />

                <button
                  onClick={() => setShowSystemOptions(!showSystemOptions)}
                  className="bg-gray-100 px-3 py-1 rounded border text-sm"
                >
                  Create System
                </button>

                {showSystemOptions && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {systemOptions.map((sys) => (
                      <button
                        key={sys}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            system: sys,
                          }));
                          setSelectedSystem(sys);
                        }}
                        className={`px-2 py-1 rounded border text-xs ${
                          selectedSystem === sys
                            ? "bg-blue-600 text-white"
                            : "bg-white hover:bg-blue-100"
                        }`}
                      >
                        {sys}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
                >
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
