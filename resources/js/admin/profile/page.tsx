'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthService } from '@/services/auth.service';
import { Mail, Save, Shield, User } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const user = AuthService.getUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profil mis à jour (Simulation)');
  };

  return (
    <div className="p-10 space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-brand-primary-navy dark:text-white">Mes Informations</h1>
        <p className="text-gray-500 mt-2 text-lg">Gérez vos paramètres personnels et de sécurité.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-md rounded-3xl bg-white dark:bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-brand-primary-navy dark:text-white">Détails du Compte</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-brand-primary uppercase tracking-widest">Nom Public</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="pl-11 h-12 rounded-xl focus:ring-brand-gold" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-brand-primary uppercase tracking-widest">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                    <Input 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="pl-11 h-12 rounded-xl focus:ring-brand-gold" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold h-12 px-8 rounded-xl flex gap-2">
                   <Save size={18} /> Enregistrer les modifications
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md rounded-3xl bg-brand-primary-navy text-white p-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Shield className="text-brand-gold h-5 w-5" /> Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-400">Votre compte est protégé par un accès authentifié JWT.</p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
               <p className="text-xs font-bold text-brand-gold uppercase mb-1">Dernière connexion</p>
               <p className="text-sm">Aujourd'hui, 12:50</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
