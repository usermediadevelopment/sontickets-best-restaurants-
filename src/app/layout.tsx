import { UserPreferencesProvider } from "@/providers/UserPreferencesProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import MainLayout from "@/components/MainLayout";
import { GoogleTagManager } from "@next/third-parties/google";

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
      <GoogleTagManager gtmId="GTM-MV333992" />
      <body className={`${poppins.className} antialiased`}>
        <UserPreferencesProvider>
          <MainLayout>{children}</MainLayout>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
