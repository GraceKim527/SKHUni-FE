import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthInitializer from '@/components/auth/AuthInitializer';
export const metadata: Metadata = {
  title: 'SKHUni | 성공회대 IT 커뮤니티',
  description: '성공회대 IT 학우들과 함께 성장하는 커뮤니티 플랫폼',
  openGraph: {
    title: '스쿠니 | 성공회대 IT 커뮤니티',
    description: '성공회대 IT 학우들과 함께 성장하는 커뮤니티 플랫폼',
    images: ['https://skhuni.vercel.app/og-image.png'],
    url: 'https://skhuni.vercel.app/',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col pt-[64px]">
        <AuthInitializer />
        <Header />
        <main className="mt-[64px] min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
