import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/theme-provider"
import { I18nProvider } from "@/context/i18n-provider"
import { SupabaseProvider } from "@/context/supabase-provider"
import { LanguageProvider } from "@/context/language-provider"
import "./globals.css"
import { AuthProvider } from "@/context/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AuctionSphere - Property Auctioning Platform",
  description: "A scalable property auctioning web application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider>
            <LanguageProvider>
              <SupabaseProvider>
                <AuthProvider>
                {children}
                </AuthProvider>
                </SupabaseProvider>
            </LanguageProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
