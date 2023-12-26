import type { Metadata,Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'An app that provides information about weather services.',
  manifest: '/manifest.json',
  icons: { apple: '/icon512_rounded.png' },
  applicationName: 'Ben Weather App',

}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster richColors closeButton={true} />
        </body>
      </ThemeProvider>
    </html>
  )
}
