import './globals.css'
import { abrilFatface, hacenTunisia, leagueGothic } from './fontprovider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Denise Subercaseaux Arquitecta',
  description: 'Portafolio de Denise Subercaseaux, arquitecta especializada en diseño de interiores y mobiliario. Explora sus proyectos, objetos y contacto para colaboraciones.',
  icons: {
    icon: '/favicon.ico',      // Traditional favicon
    shortcut: '/icon.png',      // Shortcut icon
    apple: '/apple-icon.png',   // Apple touch icon
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${abrilFatface.variable} ${hacenTunisia.variable} ${leagueGothic.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen pt-26 bg-sky-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}