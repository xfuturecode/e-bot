"use client";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError || !data.user) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    // Récupérer le profil pour le rôle
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      // Créer le profil minimal si absent
      const { error: insertError } = await supabase.from('profiles').insert([
        { id: data.user.id, role: 'student' }
      ]);
      if (insertError) {
        setError('Unable to create user profile');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      router.push('/complete-profile');
      return;
    }

    setSuccess(true)
    setLoading(false)

    // Redirection selon le rôle
    if (profile.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-blue-500 to-blue-300 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>Sign In to your account</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="e.g. john@email.com" autoComplete="email" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} placeholder="Your password" autoComplete="current-password" className="bg-gray-100" />
          </div>
          <Button type="submit" className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold py-3 rounded-lg shadow" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">Login successful! Redirecting...</p>}
        </form>
        <p className="text-gray-500 text-center mt-6">Don't have an account?{' '}
          <Link href="/signup" className="text-violet-600 hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
