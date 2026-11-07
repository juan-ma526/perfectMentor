import { Toaster } from "sonner";
import AuthProvider from "./auth-Provider";
import { NotificationListener } from "./components/match/NotificationListener";
// @ts-ignore Next.js processes global CSS imports at build time.
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const inter = Roboto({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Perfect Mentor",
  description: "Aplicacion de mentor y mentee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <NotificationListener />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
