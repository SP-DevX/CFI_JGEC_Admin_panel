import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
// import Sidebar from "@/Components/Sidebar";
// import TopBar from "@/Components/TopBar";
import { Toaster } from "react-hot-toast"

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
                    {children}
                    <Toaster />
                </ReduxProvider>
            </body>
        </html>
    );
}
