import './globals.css'

export const metadata = { title: 'PBN NeoBank' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="container navwrap">
            <a className="brand" href="/">PBN NeoBank</a>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">© 2025 PBN NeoBank</div>
        </footer>
      </body>
    </html>
  )
}
