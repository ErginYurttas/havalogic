"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/MyContextProvider";

export default function CreateMenu() {
  const context = useContext(MyContext);
  const router = useRouter();

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
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

  const systems = [
    "Ahu", "Air Curtain", "Boiler", "Booster", "Chiller", "Clean Room", "Collector",
    "Cooling Tower", "Data Center", "Fan", "Fcu", "Generator", "Heat Exchanger",
    "Heat Reclaim", "Pump", "Surgery Room", "Unit Heater", "Ups", "Vav",
    "Water Tank", "Weather", "Other (manual entrance)"
  ];

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setFormData({
      projectName: "",
      country: "",
      city: "",
      system: "",
      responsible: "",
    });
    setSaved(false);
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

    setSaved(true); // Kaydedildi olarak işaretle
  };

  const handleProceed = () => {
    router.push(
      `/project?category=${activeItem}&projectName=${formData.projectName}&country=${formData.country}&city=${formData.city}&system=${selectedSystem}&responsible=${formData.responsible}`
    );
  };

  if (!context || context.value === "Hello") return null;

  return (
    <div className="pt-4 flex flex-col items-start max-w-md">
      <ul className="bg-white text-black rounded shadow-lg p-4 w-72 space-y-4">
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
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                  placeholder="System (optional)"
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
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
                >
                  Save
                </button>

                {saved && (
                  <div className="mt-4">
                    <label className="block mb-1 font-medium text-sm">
                      Select System
                    </label>
                    <select
                      value={selectedSystem}
                      onChange={(e) => setSelectedSystem(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="">-- Choose a system --</option>
                      {systems.map((sys) => (
                        <option key={sys} value={sys}>
                          {sys}
                        </option>
                      ))}
                    </select>

                    {selectedSystem && (
                      <button
                        onClick={handleProceed}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-3"
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
