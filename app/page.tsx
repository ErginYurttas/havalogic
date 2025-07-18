import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Light font + text-gray-300 */}
      <p className="text-xl font-light text-gray-300 mb-8">
        We're creating something amazing. Stay tuned!
      </p>

      {/* BMS Görseli */}
      <div className="w-full max-w-md mx-auto">
        <Image
          src="/images/bms-interface.jpg"
          alt="BMS Panel"
          width={300}
          height={188}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}