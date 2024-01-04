import "./globals.css";
import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { SocketProvider } from "@/components/contexts/SocketContext";
import { AuthProvider } from "@/components/contexts/AuthContext";

const source_Code_Pro = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Real Time Chat Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-pattern ${source_Code_Pro.className}`}>
        <AuthProvider>
          <SocketProvider>{children}</SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
