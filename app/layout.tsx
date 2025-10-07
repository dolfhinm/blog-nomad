import './globals.css'

export const metadata = { title: 'PBN NeoStyle' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding:'16px 20px',borderBottom:'1px solid #e6e8ee'}}>PBN NeoStyle</header>
        <main style={{maxWidth:1100,margin:'0 auto',padding:'20px'}}>{children}</main>
      </body>
    </html>
  )
}
