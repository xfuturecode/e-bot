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

    // Fetch user role and redirect accordingly
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    let redirectPath = '/dashboard';
    if (profile?.role === 'admin') {
      redirectPath = '/dashboard/admin';
    } else if (profile?.role === 'user') {
      redirectPath = '/dashboard/users';
    } else {
      redirectPath = '/dashboard/students';
    }

    setTimeout(() => router.push(redirectPath), 1200);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-blue-500 to-blue-300 px-4 font-sans relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-violet-400 opacity-30 rounded-full animate-blob1 z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-300 opacity-20 rounded-full animate-blob2 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-blue-500 opacity-10 rounded-full animate-blob3 z-0"></div>
      <style jsx global>{`
        @keyframes blob1 {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.1) translateY(30px); }
        }
        @keyframes blob2 {
          0%, 100% { transform: scale(1) translateX(0px); }
          50% { transform: scale(1.15) translateX(-40px); }
        }
        @keyframes blob3 {
          0%, 100% { transform: scale(1) translate(-50%, -50%); }
          50% { transform: scale(1.08) translate(-60%, -60%); }
        }
        .animate-blob1 { animation: blob1 8s infinite ease-in-out; }
        .animate-blob2 { animation: blob2 10s infinite ease-in-out; }
        .animate-blob3 { animation: blob3 12s infinite ease-in-out; }
      `}</style>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 z-10 animate-fadeInUp">
        {/* Welcome animation */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center shadow-lg mb-2 animate-bounce-slow">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="text-white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-center text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Bienvenue! <span className="wave inline-block animate-wave">👋</span>
          </h1>
          <p className="text-gray-500 text-center mt-1 text-base">Complétez votre profil pour commencer</p>
        </div>
        <form className="flex flex-col gap-5 animate-fadeInDelay" onSubmit={handleSubmit}>
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
          <Button type="submit" className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold py-3 rounded-lg shadow transition-all duration-200 hover:scale-105" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Saving...
              </span>
            ) : 'Save & Continue'}
          </Button>
          {error && <p className="text-red-600 text-center mt-2 animate-fadeIn">{error}</p>}
          {success && <p className="text-green-600 text-center mt-2 animate-fadeIn">Profile updated! Redirecting...</p>}
        </form>
      </div>
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-fadeInDelay {
          animation: fadeIn 1.2s 0.3s both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s both;
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        .wave {
          display: inline-block;
          transform-origin: 70% 70%;
        }
        .animate-wave {
          animation: wave 2s infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeIn {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg);}
          10% { transform: rotate(14deg);}
          20% { transform: rotate(-8deg);}
          30% { transform: rotate(14deg);}
          40% { transform: rotate(-4deg);}
          50% { transform: rotate(10deg);}
        }
      `}</style>
    </div>
  )
}