import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daniels Portfolio | Developer & Designer',
  description: 'daniel chigozie obichere chigozie danielnifty Personal portfolio showcasing my skills, projects, and professional journey.',
  keywords: ['portfolio', 'developer', 'designer', 'web development', 'software engineering','obichere chigozie','obichere daniel', 'chigozie obichere'],
  authors: [{ name: 'Obichere Chigozie' }],
  creator: 'Obichere Chigozie',
  icons:'https://res.cloudinary.com/dhryqsuf8/image/upload/c_thumb,w_200,g_face/v1757093811/ProfilePicture/wogdi6szkes2anb0wkf6.png',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danielnifty.netlify.app',
    title: 'Portfolio | Developer & Designer',
    description: 'Personal portfolio showcasing my skills, projects, and professional journey.',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Developer & Designer',
    description: 'Personal portfolio showcasing my skills, projects, and professional journey.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
