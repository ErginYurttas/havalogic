import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Küçültülmüş BMS Görseli */}
      <div className="w-full max-w-md mx-auto">
        <Image
          src="/images/bms-interface.jpg"
          alt="BMS Panel"
          width={300}
          height={188}
          className="w-full h-auto object-contain shadow-lg rounded-lg"
          priority
        />
      </div>
    </div>
  );
}