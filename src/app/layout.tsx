import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Artistly - Connect with Performing Artists",
  description: "The premier platform for event planners to discover and book talented performing artists. Find singers, dancers, speakers, DJs, and more for your next event.",
  keywords: "performing artists, event planning, booking platform, singers, dancers, speakers, DJs, entertainment",
  openGraph: {
    title: "Artistly - Connect with Performing Artists",
    description: "Discover and book talented performing artists for your events",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistly - Connect with Performing Artists",
    description: "Discover and book talented performing artists for your events",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen text-gray-900 dark:text-gray-100 relative`}>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow relative">
              {children}
            </main>
            <footer className="bg-gradient-to-r from-gray-100 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900 border-t border-gray-200/50 dark:border-gray-800/50 py-12 geometric-pattern">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gradient">Artistly</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      The premier platform connecting event planners with talented performing artists.
                    </p>
                  </div>
                  
                  {/* Quick Links */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Quick Links</h4>
                    <div className="flex flex-col space-y-2">
                      <a href="/artists" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Browse Artists
                      </a>
                      <a href="/onboard" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Join as Artist
                      </a>
                      <a href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Dashboard
                      </a>
                    </div>
                  </div>
                  
                  {/* Contact */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Contact</h4>
                    <div className="flex flex-col space-y-2 text-gray-600 dark:text-gray-400">
                      <span>📧 support@artistly.in</span>
                      <span>📞 +91 98765 xxxxx</span>
                      <span>📍 Mumbai, Maharashtra, India</span>
                      <span>🕐 Mon-Sat: 9:00 AM - 6:00 PM IST</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      © 2024 Artistly. All rights reserved.
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
                      <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Privacy Policy
                      </a>
                      <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Terms of Service
                      </a>
                      <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
