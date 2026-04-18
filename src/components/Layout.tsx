import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-black text-brand-white">
      <Navbar />
      <main className="flex-1 bg-brand-black pb-14 text-brand-white md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <a
        href="tel:+12696896102"
        className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center justify-center bg-brand-green font-bold text-brand-black md:hidden"
      >
        Call Tim: (269) 689-6102
      </a>
    </div>
  )
}
