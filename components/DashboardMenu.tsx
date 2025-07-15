"use client";

import React, { useContext, useState } from "react";
import { MyContext } from "@/context/MyContextProvider";
import CreateMenu from "@/components/CreateMenu";

const buttonList = [
  { label: "Create", emoji: "🆕" },
  { label: "Add", emoji: "➕" },
  { label: "Edit", emoji: "✏️" },
  { label: "Import", emoji: "📥" },
  { label: "Export", emoji: "📤" },
  { label: "Demo", emoji: "🧪" },
  { label: "Settings", emoji: "⚙️" },
  { label: "User Guide", emoji: "📘" },
  { label: "Contact", emoji: "📞" },
  { label: "About", emoji: "ℹ️" },
];

export default function DashboardMenu() {
  const context = useContext(MyContext);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const isLoggedIn = context?.value !== "Hello";

  const handleClick = (label: string) => {
    if (label === "Create" && !isLoggedIn) {
      alert(
        "You must login first, or if you want to quickly see how it works, please proceed with Demo Mode."
      );
      return;
    }

    const implemented = ["Create"];
    if (!implemented.includes(label)) {
      alert(`${label} feature will be available soon.`);
      return;
    }

    setActivePanel((prev) => (prev === label ? null : label));
  };

  return (
    <div className="relative w-full">
      {/* Toolbar */}
      <div className="bg-white h-16 shadow z-10 sticky top-[64px] w-full overflow-x-auto flex items-center">
        <div className="flex items-center justify-start gap-4 px-6 whitespace-nowrap min-w-max w-full">
          {buttonList.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn.label)}
              className={`px-4 py-2 rounded shadow text-sm font-medium transition
                ${
                  activePanel === btn.label
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-600 hover:text-white text-gray-700"
                }
              `}
            >
              {btn.emoji} {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Only "Create" renders a panel */}
      {activePanel === "Create" && isLoggedIn && (
        <div className="absolute left-0 w-full bg-black bg-opacity-70 p-6 z-20 max-w-6xl mx-auto">
          <CreateMenu onSaveComplete={() => setActivePanel(null)} />
        </div>
      )}
    </div>
  );
}
