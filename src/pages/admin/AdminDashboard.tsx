import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db, storage } from '../../firebase'

type PhotoCategory = 'Bathroom' | 'Deck' | 'Window' | 'Other'

type PhotoDoc = {
  id: string
  url: string
  caption: string
  category: PhotoCategory
}

type SiteContent = {
  heroPhotoUrl?: string
  aboutPhotoUrl?: string
}

const categories: PhotoCategory[] = ['Bathroom', 'Deck', 'Window', 'Other']

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded px-4 py-2 text-sm font-bold transition',
        active
          ? 'bg-brand-green text-brand-black'
          : 'border border-brand-grayLt bg-brand-black text-brand-white hover:border-brand-green/60 hover:text-brand-green',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function AdminDashboard() {
  const { user, loading, isAdmin, signOut } = useAuth()

  const [tab, setTab] = useState<'hero' | 'about' | 'gallery'>('hero')
  const [siteContent, setSiteContent] = useState<SiteContent>({})
  const [siteLoading, setSiteLoading] = useState(true)

  const [photos, setPhotos] = useState<PhotoDoc[]>([])
  const [photosLoading, setPhotosLoading] = useState(true)

  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingCaption, setPendingCaption] = useState('')
  const [pendingCategory, setPendingCategory] = useState<PhotoCategory>('Other')
  const [uploading, setUploading] = useState(false)

  const heroInputRef = useRef<HTMLInputElement | null>(null)
  const aboutInputRef = useRef<HTMLInputElement | null>(null)
  const galleryInputRef = useRef<HTMLInputElement | null>(null)

  const siteDocRef = useMemo(() => doc(db, 'siteContent', 'main'), [])

  async function refreshSiteContent() {
    setSiteLoading(true)
    const snap = await getDoc(siteDocRef)
    setSiteContent((snap.data() as SiteContent | undefined) ?? {})
    setSiteLoading(false)
  }

  async function refreshPhotos() {
    setPhotosLoading(true)
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'))
    const snaps = await getDocs(q)
    setPhotos(
      snaps.docs.map((d) => {
        const data = d.data() as Partial<PhotoDoc>
        return {
          id: d.id,
          url: data.url ?? '',
          caption: data.caption ?? '',
          category: (data.category as PhotoCategory) ?? 'Other',
        }
      }),
    )
    setPhotosLoading(false)
  }

  useEffect(() => {
    if (loading) return
    if (!isAdmin) return
    void refreshSiteContent()
    void refreshPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAdmin])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black text-brand-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-brand-white/70">Loading…</div>
      </div>
    )
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />

  async function replaceSitePhoto(kind: 'hero' | 'about', file: File) {
    const storagePath = kind === 'hero' ? 'site/hero.jpg' : 'site/about.jpg'
    const storageRef = ref(storage, storagePath)

    await uploadBytes(storageRef, file, { contentType: file.type || 'image/jpeg' })
    const url = await getDownloadURL(storageRef)

    await setDoc(siteDocRef, kind === 'hero' ? { heroPhotoUrl: url } : { aboutPhotoUrl: url }, { merge: true })
    await refreshSiteContent()
  }

  async function uploadNewPhoto() {
    if (!pendingFile) return
    setUploading(true)
    try {
      const id = Date.now().toString()
      const storagePath = `gallery/${id}.jpg`
      const storageRef = ref(storage, storagePath)

      await uploadBytes(storageRef, pendingFile, { contentType: pendingFile.type || 'image/jpeg' })
      const url = await getDownloadURL(storageRef)

      await setDoc(doc(db, 'photos', id), {
        url,
        caption: pendingCaption.trim(),
        category: pendingCategory,
        createdAt: serverTimestamp(),
      })

      setPendingFile(null)
      setPendingCaption('')
      setPendingCategory('Other')
      await refreshPhotos()
    } finally {
      setUploading(false)
    }
  }

  async function deletePhoto(photo: PhotoDoc) {
    const ok = window.confirm('Delete this photo? This cannot be undone.')
    if (!ok) return

    await deleteObject(ref(storage, `gallery/${photo.id}.jpg`))
    await deleteDoc(doc(db, 'photos', photo.id))
    await refreshPhotos()
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <header className="border-b border-brand-grayLt bg-brand-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">5-Star Handyman Admin</p>
            <p className="mt-1 text-sm text-brand-white/70">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded border border-brand-grayLt bg-brand-black px-4 py-2 text-sm font-bold text-brand-white transition hover:border-brand-green/60 hover:text-brand-green"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-3">
          <TabButton active={tab === 'hero'} onClick={() => setTab('hero')}>
            HERO PHOTO
          </TabButton>
          <TabButton active={tab === 'about'} onClick={() => setTab('about')}>
            ABOUT PHOTO
          </TabButton>
          <TabButton active={tab === 'gallery'} onClick={() => setTab('gallery')}>
            GALLERY
          </TabButton>
        </div>

        <section className="mt-8">
          {tab === 'hero' ? (
            <div className="rounded-xl border border-brand-grayLt bg-brand-gray p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Hero Photo</h2>
                  <p className="mt-1 text-sm text-brand-white/70">Shown on the Home page hero section.</p>
                </div>
                <div>
                  <input
                    ref={heroInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      void replaceSitePhoto('hero', f)
                      e.currentTarget.value = ''
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => heroInputRef.current?.click()}
                    className="rounded bg-brand-green px-4 py-2 text-sm font-bold text-brand-black transition hover:bg-brand-greenDk"
                  >
                    Replace
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-brand-black/40 bg-brand-black">
                {siteLoading ? (
                  <div className="p-10 text-center text-brand-white/70">Loading…</div>
                ) : (
                  <img
                    src={siteContent.heroPhotoUrl || '/tim-portrait.png'}
                    alt="Hero"
                    className="block h-auto w-full max-h-[520px] object-contain"
                  />
                )}
              </div>
            </div>
          ) : null}

          {tab === 'about' ? (
            <div className="rounded-xl border border-brand-grayLt bg-brand-gray p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">About Photo</h2>
                  <p className="mt-1 text-sm text-brand-white/70">Shown on the Home page “Meet Tim” teaser.</p>
                </div>
                <div>
                  <input
                    ref={aboutInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      void replaceSitePhoto('about', f)
                      e.currentTarget.value = ''
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => aboutInputRef.current?.click()}
                    className="rounded bg-brand-green px-4 py-2 text-sm font-bold text-brand-black transition hover:bg-brand-greenDk"
                  >
                    Replace
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-brand-black/40 bg-brand-black">
                {siteLoading ? (
                  <div className="p-10 text-center text-brand-white/70">Loading…</div>
                ) : (
                  <img
                    src={siteContent.aboutPhotoUrl || '/tim-portrait.png'}
                    alt="About"
                    className="block h-auto w-full max-h-[520px] object-contain"
                  />
                )}
              </div>
            </div>
          ) : null}

          {tab === 'gallery' ? (
            <div className="rounded-xl border border-brand-grayLt bg-brand-gray p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Gallery</h2>
                  <p className="mt-1 text-sm text-brand-white/70">
                    Upload and manage photos shown on the public site.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      setPendingFile(f)
                      setPendingCaption('')
                      setPendingCategory('Other')
                      e.currentTarget.value = ''
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="rounded bg-brand-green px-4 py-2 text-sm font-bold text-brand-black transition hover:bg-brand-greenDk"
                  >
                    + Upload New Photo
                  </button>
                </div>
              </div>

              {pendingFile ? (
                <div className="mt-6 rounded-lg border border-brand-black/40 bg-brand-black p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[160px_1fr] md:items-start">
                    <img
                      src={URL.createObjectURL(pendingFile)}
                      alt="New upload preview"
                      className="h-40 w-full rounded object-cover"
                    />
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-semibold text-brand-white">
                        Caption
                        <input
                          value={pendingCaption}
                          onChange={(e) => setPendingCaption(e.target.value)}
                          className="mt-2 w-full rounded border border-brand-grayLt bg-brand-gray px-3 py-2 text-sm text-brand-white outline-none focus:border-brand-green"
                          placeholder="Optional caption"
                        />
                      </label>
                      <label className="text-sm font-semibold text-brand-white">
                        Category
                        <select
                          value={pendingCategory}
                          onChange={(e) => setPendingCategory(e.target.value as PhotoCategory)}
                          className="mt-2 w-full rounded border border-brand-grayLt bg-brand-gray px-3 py-2 text-sm text-brand-white outline-none focus:border-brand-green"
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          disabled={uploading}
                          onClick={() => void uploadNewPhoto()}
                          className="rounded bg-brand-green px-4 py-2 text-sm font-bold text-brand-black transition hover:bg-brand-greenDk disabled:opacity-60"
                        >
                          {uploading ? 'Uploading…' : 'Upload'}
                        </button>
                        <button
                          type="button"
                          disabled={uploading}
                          onClick={() => setPendingFile(null)}
                          className="rounded border border-brand-grayLt bg-brand-black px-4 py-2 text-sm font-bold text-brand-white transition hover:border-brand-green/60 hover:text-brand-green disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-8">
                {photosLoading ? (
                  <div className="rounded-lg border border-brand-black/40 bg-brand-black p-10 text-center text-brand-white/70">
                    Loading…
                  </div>
                ) : photos.length === 0 ? (
                  <div className="rounded-lg border border-brand-black/40 bg-brand-black p-10 text-center text-brand-white/70">
                    No gallery photos yet. Upload your first one above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {photos.map((p) => (
                      <div key={p.id} className="overflow-hidden rounded-lg border border-brand-black/40 bg-brand-black">
                        <div className="aspect-square overflow-hidden">
                          <img src={p.url} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-3 p-4">
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-widest text-brand-white/70">
                              Caption
                            </label>
                            <input
                              defaultValue={p.caption}
                              placeholder="(optional)"
                              onBlur={(e) => {
                                const next = e.currentTarget.value
                                if (next === p.caption) return
                                void updateDoc(doc(db, 'photos', p.id), { caption: next })
                                setPhotos((prev) =>
                                  prev.map((x) => (x.id === p.id ? { ...x, caption: next } : x)),
                                )
                              }}
                              className="mt-2 w-full rounded border border-brand-grayLt bg-brand-gray px-3 py-2 text-sm text-brand-white outline-none focus:border-brand-green"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold uppercase tracking-widest text-brand-white/70">
                              Category
                            </label>
                            <select
                              value={p.category}
                              onChange={(e) => {
                                const next = e.currentTarget.value as PhotoCategory
                                void updateDoc(doc(db, 'photos', p.id), { category: next })
                                setPhotos((prev) =>
                                  prev.map((x) => (x.id === p.id ? { ...x, category: next } : x)),
                                )
                              }}
                              className="mt-2 w-full rounded border border-brand-grayLt bg-brand-gray px-3 py-2 text-sm text-brand-white outline-none focus:border-brand-green"
                            >
                              {categories.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => void deletePhoto(p)}
                            className="w-full rounded border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200 transition hover:bg-red-500/15"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  )
}

