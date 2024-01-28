import { type Metadata } from 'next';
import favicon from '~/assets/favicon.png';
import '~/assets/styles/globals.css';
import Document from './Document';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={favicon.src} sizes="any" />
      </head>
      <body>
        <Document>{children}</Document>
      </body>
    </html>
  );
}
