import './globals.css'

export const metadata = {
  title: 'Simple Weather',
  description: 'A simple React weather workshop app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
