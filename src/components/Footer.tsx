export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-neutral-700 md:grid-cols-3">
        <div className="space-y-2">
          <div className="font-medium text-neutral-900">Phone</div>
          <div>TODO</div>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-neutral-900">Email</div>
          <div>TODO</div>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-neutral-900">Service area</div>
          <div>TODO</div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-neutral-600">
          © {year} Five Star Handyman. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

