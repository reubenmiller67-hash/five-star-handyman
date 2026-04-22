import { Navigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { useAuth } from '../../contexts/AuthContext'

export function AdminLogin() {
  const { user, loading, isAdmin, signInWithGoogle, signOut } = useAuth()

  console.log('AuthContext rendering, loading:', loading, 'user:', user)

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-16">
        <Logo className="h-16 w-auto" />
        <h1 className="mt-8 text-center text-3xl font-bold tracking-tight">Admin Sign In</h1>
        <p className="mt-3 text-center text-brand-white/70">
          Sign in with an authorized Google account to manage photos.
        </p>

        <div className="mt-10 w-full">
          {loading ? (
            <div className="rounded-lg border border-brand-grayLt bg-brand-gray p-6 text-center">
              Loading…
            </div>
          ) : user && !isAdmin ? (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6">
              <p className="font-bold text-red-200">
                This account is not authorized. Sign out and try another.
              </p>
              <p className="mt-2 text-sm text-red-200/80">{user.email}</p>
              <button
                type="button"
                onClick={() => signOut()}
                className="mt-6 inline-flex w-full items-center justify-center rounded bg-brand-green px-6 py-4 text-lg font-bold text-brand-black transition hover:scale-[1.02] hover:bg-brand-greenDk"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="inline-flex w-full items-center justify-center rounded bg-brand-green px-6 py-4 text-lg font-bold text-brand-black transition hover:scale-[1.02] hover:bg-brand-greenDk"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

