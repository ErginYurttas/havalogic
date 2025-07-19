"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AhuPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/project");
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6 flex flex-col md:flex-row gap-6">
      {/* Sol Taraf - Form Alanı */}
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-lg shadow-md p-6 h-fit">
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

      {/* Sağ Taraf - Görsel Alanı */}
      <div className="flex-1 bg-[#1e1e1e] rounded-lg shadow-md overflow-hidden">
        <Image
          src="/images/ahu-system.jpg" // Görsel yolunu güncelleyin
          alt="AHU System Diagram"
          width={800}
          height={600}
          className="w-full h-full object-contain p-4"
          priority
        />
      </div>
    </div>
  );
}