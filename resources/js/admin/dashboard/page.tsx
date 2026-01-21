'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthService } from '@/services/auth.service';
import {
    Clock,
    FileText,
    LayoutDashboard,
    Sparkles,
    TrendingUp,
    User,
    Users
} from 'lucide-react';
import { ProfileSection } from './components/ProfileSection';

export default function DashboardPage() {
  const user = AuthService.getUser();

  const STATS = [
    { title: 'Articles Publiés', value: '12', icon: FileText, color: 'text-brand-primary' },
    { title: 'Visiteurs Mensuels', value: '2,845', icon: Users, color: 'text-brand-gold' },
    { title: 'Taux de Lecture', value: '+14%', icon: TrendingUp, color: 'text-brand-teal' },
    { title: 'Temps de Gestion', value: '45h', icon: Clock, color: 'text-brand-sand' },
  ];

  return (
    <div className="p-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-brand-primary-navy dark:text-white flex items-center gap-3">
          Bienvenue, {user?.name || 'Ariel'} <Sparkles className="text-brand-gold h-8 w-8" />
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Voici un aperçu de votre activité Ariel Hébergement.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 p-1 bg-white/50 dark:bg-card border border-white/20 rounded-2xl h-auto">
            <TabsTrigger 
                value="overview" 
                className="rounded-xl px-6 py-3 data-[state=active]:bg-brand-primary-navy data-[state=active]:text-white font-bold transition-all"
            >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger 
                value="profile" 
                className="rounded-xl px-6 py-3 data-[state=active]:bg-brand-primary-navy data-[state=active]:text-white font-bold transition-all"
            >
                <User className="w-4 h-4 mr-2" />
                Mon Profil
            </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all rounded-3xl overflow-hidden bg-white dark:bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-extrabold text-brand-primary-navy dark:text-white">
                        {stat.value}
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none shadow-md rounded-3xl min-h-[400px] flex items-center justify-center p-12 text-center bg-white dark:bg-card border-2 border-dashed border-gray-100 dark:border-gray-800">
                <div>
                    <div className="bg-brand-primary/10 p-6 rounded-full inline-block mb-6">
                        <FileText className="h-10 w-10 text-brand-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary-navy dark:text-white mb-3">Prêt à raconter une nouvelle histoire ?</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">Partagez les dernières nouveautés de vos propriétés d'exception avec votre communauté.</p>
                    <button className="bg-brand-primary-navy hover:bg-brand-primary text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg hover:shadow-brand-primary/20">
                    Nouvel Article
                    </button>
                </div>
                </Card>

                <Card className="border-none shadow-md rounded-3xl bg-white dark:bg-card">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-brand-primary-navy dark:text-white">Activité Récente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                            <Clock size={16} className="text-brand-secondary" />
                        </div>
                        <div>
                        <p className="text-sm font-bold text-brand-primary-navy dark:text-white">Publication de l'article #{i}</p>
                        <p className="text-xs text-gray-500">Il y a {i * 2} heures</p>
                        </div>
                    </div>
                    ))}
                </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProfileSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
