import { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: "Best Restaurants",
  description: "Discover the best restaurants in your area",
  openGraph: {
    title: 'Best Restaurants',
    description: 'Discover the best restaurants in your area',
    url: 'https://yourwebsite.com',
    siteName: 'Best Restaurants',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Best Restaurants',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    title: 'Best Restaurants',
    description: 'Discover the best restaurants in your area',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Best Restaurants',
      },
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}