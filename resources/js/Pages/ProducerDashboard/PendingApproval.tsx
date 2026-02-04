import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ShieldAlert } from 'lucide-react';

export default function PendingApproval() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
            <Head title="Compte en Attente d'Approbation" />
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-yellow-500/10 p-6 ring-1 ring-yellow-500/20">
                        <ShieldAlert className="h-12 w-12 text-yellow-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Compte en Attente d'Approbation
                    </h1>
                    <p className="text-zinc-400">
                        Votre compte producteur est actuellement en cours de révision par nos administrateurs. 
                        Vous serez informé dès que votre compte sera approuvé et que vous pourrez commencer à gérer vos produits.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-zinc-500">
                        Ce processus prend généralement moins de 24 heures. 
                        Merci de votre patience !
                    </p>
                    <Link href="/">
                        <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            Retour à l'Accueil
                        </Button>
                    </Link>
                    <Link href={route('logout')} method="post" as="button" className="text-sm text-emerald-500 hover:text-emerald-400">
                        Déconnexion
                    </Link>
                </div>
            </div>
        </div>
    );
}
