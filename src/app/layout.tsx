import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Sidebar from "@/Components/Sidebar";
import { ToastContainer } from "react-toastify";
import TopBar from "@/Components/TopBar";

export const metadata: Metadata = {
  title: "CFI-Admin Panel",
  description: "Created by CFI Web Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-screen flex  bg-[rgb(241,245,249)]`}>
        <ReduxProvider>
          <div className="w-[20%] max-w-sm h-full">
            <Sidebar />
          </div>
          <div className="w-[80%] h-full overflow-y-scroll relative">
            <TopBar />
            {children}
            <ToastContainer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
