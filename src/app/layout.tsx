import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast"
import Loading from "@/Components/common/LoadingProvider";

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
            <body className={`w-full h-screen flex  bg-[#F1F1F1]`}>
                <ReduxProvider>
                    <Loading />
                    {children}
                    <Toaster />
                </ReduxProvider>
            </body>
        </html>
    );
}
