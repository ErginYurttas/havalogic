import "./globals.css";
import Navbar from "@/components/Navbar";
import MyContextProvider from "@/context/MyContextProvider";
import DashboardMenu from "@/components/DashboardMenu";

export const metadata = {
  title: "HVAC Project Builder",
  description: "Otomatik proje oluşturucu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 text-gray-900">
        <MyContextProvider>
          <Navbar />
          <div className="pt-20"> {/* 🟡 Navbar yüksekliği kadar boşluk */}
            <DashboardMenu />
            <main className="max-w-6xl mx-auto p-4">{children}</main>
          </div>
        </MyContextProvider>
      </body>
    </html>
  );
}
