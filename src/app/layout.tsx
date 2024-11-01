import { UserPreferencesProvider } from "@/providers/UserPreferencesProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import MainLayout from "@/components/MainLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="es">
      <body className={`${poppins.className} antialiased`}>
        <UserPreferencesProvider>
          <MainLayout>{children}</MainLayout>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
