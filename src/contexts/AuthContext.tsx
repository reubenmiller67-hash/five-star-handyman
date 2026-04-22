import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, googleProvider, isAdmin as isAdminEmail } from '../firebase'

type AuthContextValue = {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      loading,
      isAdmin: isAdminEmail(user?.email),
      signInWithGoogle: async () => {
        googleProvider.setCustomParameters({ prompt: 'select_account' })
        // Ensures scopes are Google-auth compatible if expanded later.
        const provider = googleProvider as GoogleAuthProvider
        await signInWithPopup(auth, provider)
      },
      signOut: async () => {
        await signOut(auth)
      },
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

