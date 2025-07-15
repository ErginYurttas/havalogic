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

  const [formData, setFormData] = useState({
    projectName: "",
    country: "",
    city: "",
    system: "",
    responsible: "",
  });

  if (!context || context.value === "Hello") return null;

  const menuItems = [
    "Airport", "Factory", "Hospital", "Mall",
    "Office", "Resident", "School", "Other",
  ].sort((a, b) => a.localeCompare(b));

  const handleItemClick = (item: string) => {
    setActiveItem((prev) => (prev === item ? null : item));
    setFormData({
      projectName: "",
      country: "",
      city: "",
      system: "",
      responsible: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    const queryParams = new URLSearchParams({
      category: activeItem,
      ...formData,
    }).toString();

    router.push(`/project?${queryParams}`);

    // Paneli kapatmak için callback çalıştır
    if (onSaveComplete) onSaveComplete();
  };

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
                  className="w-full px-2 py-1 border border-gray-300 rounded bg-blue-50"
                />
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full px-2 py-1 border border-gray-300 rounded bg-blue-50"
                />
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-2 py-1 border border-gray-300 rounded bg-blue-50"
                />
                <input
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                  placeholder="System"
                  className="w-full px-2 py-1 border border-gray-300 rounded bg-blue-50"
                />
                <input
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  placeholder="Responsible"
                  className="w-full px-2 py-1 border border-gray-300 rounded bg-blue-50"
                />
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
