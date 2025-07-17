"use client";

import { useRouter } from "next/navigation";

export default function AhuPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/project"); // ← ProjectOverview sayfasına döner
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6 flex">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-lg shadow-md p-6">
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
        >
          ← Back
        </button>

        <h2 className="text-xl font-semibold text-blue-400 mb-2">AHU</h2>
        <p className="text-gray-300 mb-6">
          You are configuring an <span className="font-semibold text-white">AHU system</span>.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ahu Name"
            className="w-full border border-gray-600 rounded-md p-2 text-sm bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Ahu Description"
            className="w-full border border-gray-600 rounded-md p-2 text-sm bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
