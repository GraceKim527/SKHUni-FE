import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthInitializer from '@/components/auth/AuthInitializer';
export const metadata: Metadata = {
  title: 'SKHUni',
  description: '성공회대 IT 커뮤니티를 책임지는 SKHUni',
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
