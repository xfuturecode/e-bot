"use client";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Signup() {
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

    // 1. Création du compte Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError || !data.user) {
      setError(signUpError?.message || 'Registration failed')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    form.reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-blue-500 to-blue-300 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>Student Registration</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="nom" className="text-gray-700">Last Name</Label>
            <Input id="nom" name="nom" type="text" required minLength={2} placeholder="e.g. Doe" autoComplete="family-name" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="postnom" className="text-gray-700">Middle Name</Label>
            <Input id="postnom" name="postnom" type="text" required minLength={2} placeholder="e.g. Junior" autoComplete="additional-name" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="prenom" className="text-gray-700">First Name</Label>
            <Input id="prenom" name="prenom" type="text" required minLength={2} placeholder="e.g. John" autoComplete="given-name" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="date_naissance" className="text-gray-700">Date of Birth</Label>
            <Input id="date_naissance" name="date_naissance" type="date" required autoComplete="bday" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required minLength={8} maxLength={20} placeholder="e.g. +243 900 000 000" autoComplete="tel" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="e.g. john@email.com" autoComplete="email" className="bg-gray-100" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} placeholder="Create a password" autoComplete="new-password" className="bg-gray-100" />
            <span className="text-xs text-gray-500 mt-1">At least 6 characters</span>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-700 mb-1">Are you an existing student?</Label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="existing" value="yes" className="accent-violet-600" /> Yes
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="existing" value="no" className="accent-violet-600" /> No
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold py-3 rounded-lg shadow" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">Registration successful! Please log in to complete your profile.</p>}
        </form>
        <p className="text-gray-500 text-center mt-6">Already have an account?{' '}
          <Link href="/login" className="text-violet-600 hover:underline font-medium">Log In</Link>
        </p>
      </div>
    </div>
  )
}
