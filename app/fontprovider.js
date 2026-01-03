import localFont from 'next/font/local'

// Define each font separately
export const abrilFatface = localFont({
  src: '../public/fonts/AbrilFatface-Regular.ttf',
  variable: '--font-abril',
  display: 'swap',
})

export const hacenTunisia = localFont({
  src: '../public/fonts/HacenTunisiaBd.ttf',
  variable: '--font-hacen',
  display: 'swap',
})

export const hacenTunisialt = localFont({
  src: '../public/fonts/HacenTunisiaLt.ttf',
  variable: '--font-hacenlt',
  display: 'swap',
})

export const leagueGothic = localFont({
  src: '../public/fonts/LeagueGothic-Regular.otf',
  variable: '--font-league',
  display: 'swap',
})