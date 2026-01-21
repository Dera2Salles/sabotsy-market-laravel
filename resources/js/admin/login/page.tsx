'use client';

import Background from '@/assets/login-bg.png';
import Logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Lock, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('ariel');
  const [password, setPassword] = useState('arielpasssecret');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await AuthService.login(username, password);
      toast.success('Connexion réussie ! Redirection...', {
        style: {
          background: '#112a41',
          color: '#fff',
          border: '1px solid #f3c66a'
        },
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Identifiants invalides ou erreur serveur.';
      toast.error(errorMsg, {
        style: {
          background: '#112a41',
          color: '#fff',
          border: '1px solid #ef4444'
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-primary-navy">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={Background}
          alt="Login Background"
          fill
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-primary-navy/80 via-transparent to-brand-primary-navy/90" />
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse" />
      
      {/* Additional Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px]" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-block p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-6"
          >
            <Image src={Logo} alt="Ariel Logo" width={120} height={40} className="h-10 w-auto" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Accès Administrateur</h1>
          <p className="text-brand-secondary/80 mt-2 font-medium">Gérez vos propriétés d'exception</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl font-bold text-white text-center">Connexion</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Saisissez vos identifiants pour accéder au tableau de bord
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-bold text-brand-gold uppercase tracking-widest ml-1">
                  Identifiant
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-gold transition-colors">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="ariel"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 h-12 bg-white/5 border-white/10 focus:border-brand-gold focus:ring-brand-gold/20 text-white placeholder:text-gray-600 rounded-xl transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                    Mot de passe
                  </Label>
                  <a href="#" className="text-xs font-medium text-brand-secondary hover:text-brand-gold transition-colors">
                    Oublié ?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-brand-gold transition-colors">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-12 bg-white/5 border-white/10 focus:border-brand-gold focus:ring-brand-gold/20 text-white placeholder:text-gray-600 rounded-xl transition-all"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2 ml-1">
                <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-brand-gold data-[state=checked]:text-brand-primary-navy" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-gray-400 cursor-pointer select-none"
                >
                  Rester connecté
                </label>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-brand-primary hover:bg-brand-primary-light text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Se Connecter <ArrowRight size={18} />
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-brand-gold" />
                Système de gestion sécurisé pour Ariel Hébergement
            </p>
        </div>
      </motion.div>
    </div>
  );
}
