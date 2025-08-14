import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retirement Planning Calculator | วางแผนเกษียณอายุ',
  description: 'Plan your retirement with our easy-to-use calculator. วางแผนเกษียณอายุด้วยเครื่องมือคำนวณที่ใช้งานง่าย',
  keywords: 'retirement planning, เกษียณอายุ, การวางแผนเกษียณ, financial planning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
