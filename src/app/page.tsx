'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Bus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else {
        router.push('/driver/dashboard')
      }
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* לוגו */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-8">
          <Bus className="w-12 h-12 text-background" />
        </div>

        {/* כותרת */}
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          פינטו הסעים
        </h1>
        
        <p className="text-xl text-secondary mb-12 max-w-lg mx-auto">
          מערכת ניהול מתקדמת לחברות הסעות - ניהול רכבים, נהגים ומסלולים במקום אחד
        </p>

        {/* כפתור כניסה */}
        <Link 
          href="/login"
          className="inline-flex items-center bg-primary hover:bg-primary-light text-background font-semibold py-4 px-8 rounded-lg transition duration-200 text-lg"
        >
          כניסה למערכת
          <ArrowLeft className="mr-3 w-5 h-5" />
        </Link>

        {/* מידע נוסף */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">ניהול רכבים</h3>
            <p className="text-secondary text-sm">
              מעקב ובקרה על כל הרכבים בצי
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 rounded-full bg-primary"></div>
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">ניהול נהגים</h3>
            <p className="text-secondary text-sm">
              רישום ומעקב אחר כל הנהגים
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 border-2 border-primary rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">תזמון מסלולים</h3>
            <p className="text-secondary text-sm">
              תכנון ותיאום מסלולי הסעה
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}