"use client";

import React, { useContext, useState } from "react";
import { MyContext } from "@/context/MyContextProvider";
import { useRouter } from "next/navigation";

interface CreateMenuProps {
  onSaveComplete: () => void;
}

export default function CreateMenu({ onSaveComplete }: CreateMenuProps) {
  const context = useContext(MyContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    projectName: "",
    country: "",
    city: "",
    system: "",
    responsible: "",
  });

  if (!context || context.value === "Hello") return null;

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

    if (!projectName || !country || !city || !system || !responsible) {
      alert("Please fill in all the fields.");
      return;
    }

    const query = new URLSearchParams({
      ...formData,
    }).toString();

    // Sayfayı yönlendir
    router.push(`/project?${query}`);

    // Menü panelini kapat
    onSaveComplete();
  };

  return (
    <div className="bg-white text-black rounded shadow-lg p-6 max-w-md mx-auto space-y-4">
      <input
        name="projectName"
        value={formData.projectName}
        onChange={handleInputChange}
        placeholder="Project Name"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <input
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder="Country"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <input
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder="City"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <input
        name="system"
        value={formData.system}
        onChange={handleInputChange}
        placeholder="System (e.g. HVAC, KNX, CCTV)"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <input
        name="responsible"
        value={formData.responsible}
        onChange={handleInputChange}
        placeholder="Responsible Person"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
