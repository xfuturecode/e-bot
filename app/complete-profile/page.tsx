"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function CompleteProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    postnom: '',
    prenom: '',
    date_naissance: '',
    phone: ''
  });

  useEffect(() => {
    // Optionnel : préremplir si déjà existant
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('nom, postnom, prenom, date_naissance, phone')
          .eq('id', user.id)
          .single();
        if (profile) {
          setForm({
            nom: profile.nom || '',
            postnom: profile.postnom || '',
            prenom: profile.prenom || '',
            date_naissance: profile.date_naissance || '',
            phone: profile.phone || ''
          });
        }
      }
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }
    const { nom, postnom, prenom, date_naissance, phone } = form;
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ nom, postnom, prenom, date_naissance, phone })
      .eq('id', user.id);
    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push('/dashboard'), 1200);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-blue-500 to-blue-300 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-extrabold text-center text-gray-900 mb-6 tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>Complete your profile</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="nom" className="text-gray-700">Last Name</Label>
            <Input id="nom" name="nom" type="text" required minLength={2} placeholder="e.g. Doe" className="bg-gray-100" value={form.nom} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="postnom" className="text-gray-700">Middle Name</Label>
            <Input id="postnom" name="postnom" type="text" required minLength={2} placeholder="e.g. Junior" className="bg-gray-100" value={form.postnom} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="prenom" className="text-gray-700">First Name</Label>
            <Input id="prenom" name="prenom" type="text" required minLength={2} placeholder="e.g. John" className="bg-gray-100" value={form.prenom} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="date_naissance" className="text-gray-700">Date of Birth</Label>
            <Input id="date_naissance" name="date_naissance" type="date" required className="bg-gray-100" value={form.date_naissance} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" required minLength={8} maxLength={20} placeholder="e.g. +243 900 000 000" className="bg-gray-100" value={form.phone} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold py-3 rounded-lg shadow" disabled={loading}>
            {loading ? 'Saving...' : 'Save & Continue'}
          </Button>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2">Profile updated! Redirecting...</p>}
        </form>
      </div>
    </div>
  )
} 