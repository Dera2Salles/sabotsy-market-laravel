import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ShieldAlert } from 'lucide-react';

export default function PendingApproval() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
            <Head title="Account Pending Approval" />
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-yellow-500/10 p-6 ring-1 ring-yellow-500/20">
                        <ShieldAlert className="h-12 w-12 text-yellow-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Account Pending Approval
                    </h1>
                    <p className="text-zinc-400">
                        Your producer account is currently under review by our administrators. 
                        You will be notified once your account is approved and you can start managing your products.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-zinc-500">
                        This process usually takes less than 24 hours. 
                        Thank you for your patience!
                    </p>
                    <Link href="/">
                        <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href={route('logout')} method="post" as="button" className="text-sm text-emerald-500 hover:text-emerald-400">
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
