import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, Mail, ShoppingBasket, User } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <GuestLayout>
            <Head title="S'inscrire" />

            <div className="flex flex-col items-center mb-8">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 dark:bg-green-500/20 mb-4 shadow-inner"
                >
                    <ShoppingBasket className="h-8 w-8 text-green-600 dark:text-green-400" />
                </motion.div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Créer un compte</h1>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                    Rejoignez Sabotsy Market et commencez votre voyage d'achat.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="space-y-1.5">
                        <InputLabel htmlFor="name" value="Nom Complet" className="ml-1 font-bold text-gray-700 dark:text-gray-300" />
                        <div className="relative group">
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full rounded-2xl border-gray-200 bg-white/50 py-3 pl-11 shadow-sm transition-all focus:border-green-500 focus:ring-green-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <User className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-green-500" />
                        </div>
                        <InputError message={errors.name} className="mt-1.5" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-4 space-y-1.5">
                        <InputLabel htmlFor="email" value="Adresse E-mail" className="ml-1 font-bold text-gray-700 dark:text-gray-300" />
                        <div className="relative group">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full rounded-2xl border-gray-200 bg-white/50 py-3 pl-11 shadow-sm transition-all focus:border-green-500 focus:ring-green-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <Mail className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-green-500" />
                        </div>
                        <InputError message={errors.email} className="mt-1.5" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-4 space-y-1.5">
                        <InputLabel htmlFor="password" value="Mot de passe" className="ml-1 font-bold text-gray-700 dark:text-gray-300" />
                        <div className="relative group">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full rounded-2xl border-gray-200 bg-white/50 py-3 pl-11 shadow-sm transition-all focus:border-green-500 focus:ring-green-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <Lock className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-green-500" />
                        </div>
                        <InputError message={errors.password} className="mt-1.5" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-4 space-y-1.5">
                        <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" className="ml-1 font-bold text-gray-700 dark:text-gray-300" />
                        <div className="relative group">
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full rounded-2xl border-gray-200 bg-white/50 py-3 pl-11 shadow-sm transition-all focus:border-green-500 focus:ring-green-500 dark:border-zinc-800 dark:bg-zinc-900/50"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <Lock className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-green-500" />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-1.5" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-8 flex flex-col space-y-4">
                        <PrimaryButton 
                            className="w-full justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-4 text-base font-black uppercase tracking-widest text-white shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] hover:shadow-green-500/30 active:scale-95 disabled:opacity-70" 
                            disabled={processing}
                        >
                            S'inscrire
                        </PrimaryButton>
                        
                        <p className="text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                            Déjà inscrit ?{' '}
                            <Link
                                href={route('login')}
                                className="text-green-600 hover:text-green-700 dark:text-green-500 transition-colors"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </form>
        </GuestLayout>
    );
}
