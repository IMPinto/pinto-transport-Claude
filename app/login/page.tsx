'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Bus, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('שם משתמש או סיסמה שגויים')
      } else {
        // בדיקת תפקיד המשתמש וניתוב
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin/dashboard')
        } else {
          router.push('/driver/dashboard')
        }
      }
    } catch (error) {
      setError('שגיאה בהתחברות')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-xl p-8">
        {/* לוגו */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Bus className="w-8 h-8 text-background" />
          </div>
          <h1 className="text-2xl font-bold text-primary">פינטו הסעים</h1>
          <p className="text-secondary mt-2">מערכת ניהול הסעות</p>
        </div>

        {/* טופס התחברות */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              כתובת אימייל
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="example@pinto.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              סיסמה
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 w-5 h-5 text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-background font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'מתחבר...' : 'התחברות'}
          </button>
        </form>

        {/* הוראות לדוגמה */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-sm font-medium text-secondary mb-3">משתמשים לדוגמה:</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div>
              <strong>מנהל:</strong> admin@pinto.com / admin123
            </div>
            <div>
              <strong>נהג:</strong> driver@pinto.com / driver123
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}