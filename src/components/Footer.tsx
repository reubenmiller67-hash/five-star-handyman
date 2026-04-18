import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-grayLt bg-brand-black">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-brand-white">
        <div className="mb-6 flex justify-center">
          <Logo className="h-20 w-20" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="font-medium text-brand-white">Phone</div>
            <a href="tel:+12696896102" className="font-medium text-brand-green hover:text-brand-greenLt">
              (269) 689-6102
            </a>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-brand-white">Email</div>
            <div className="text-brand-muted">TODO</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-brand-white">Service area</div>
            <div className="text-brand-muted">TODO</div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-grayLt">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-brand-muted">
          © {year} 5-Star Handyman. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
