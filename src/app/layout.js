import { Inter } from 'next/font/google';
import './globals.css';  // ← ต้องมี!

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Todo List - Beautiful Task Manager',
  description: 'A modern and beautiful todo application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}