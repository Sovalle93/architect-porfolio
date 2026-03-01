import './globals.css'
import { abrilFatface, hacenTunisia, leagueGothic } from './fontprovider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Denise Subercaseaux Arquitecta',
  description: 'Portafolio de Denise Subercaseaux, arquitecta especializada en diseño de interiores y mobiliario. Explora sus proyectos, objetos y contacto para colaboraciones.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${abrilFatface.variable} ${hacenTunisia.variable} ${leagueGothic.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen pt-16 bg-sky-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}