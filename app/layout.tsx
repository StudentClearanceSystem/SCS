import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

import { Providers } from './providers';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'STI-StudentClearance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
