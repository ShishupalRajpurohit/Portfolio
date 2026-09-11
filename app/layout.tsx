import './globals.css';
import type { Metadata } from 'next';
import data from '../src/data/portfolio.json';

export const metadata: Metadata = {
  title: data.site.title,
  description: data.site.description,
  metadataBase: data.site.url ? new URL(data.site.url) : undefined,
  alternates: data.site.url ? { canonical: data.site.url } : undefined,
  openGraph: { title: data.site.title, description: data.site.description, ...(data.site.ogImage ? { images: [data.site.ogImage] } : {}) },
  twitter: { card: 'summary_large_image', title: data.site.title, description: data.site.description, ...(data.site.ogImage ? { images: [data.site.ogImage] } : {}) },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={data.site.language || 'en'}><body>{children}</body></html>;
}
