import { Head, Link } from '@inertiajs/react';
import { Camera, Clock3, ShieldCheck } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';

type Props = {
    flash: {
        status?: string;
    };
};

export default function MemberHistory({ flash }: Props) {
    return (
        <>
            <Head title="Your photo history" />
            <main className="min-h-screen bg-surface-sunken px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
                    <header className="flex items-center justify-between gap-4">
                        <Link
                            href="/"
                            className="rounded-md focus-visible:outline-none"
                        >
                            <AppLogo subtitle="Your photo history" />
                        </Link>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/">Take new photos</Link>
                        </Button>
                    </header>

                    {flash.status && (
                        <div className="bg-info-soft rounded-xl px-4 py-3 text-center text-sm font-medium text-info ring-1 ring-info/20">
                            {flash.status}
                        </div>
                    )}

                    <section className="motion-panel-enter rounded-2xl bg-surface p-8 text-center ring-1 ring-border sm:p-12">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                            <Camera className="size-7" aria-hidden="true" />
                        </div>
                        <h1 className="mt-6 text-2xl font-semibold text-foreground">
                            Your private photo history
                        </h1>
                        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
                            Photo strips taken while signed in will appear here.
                            Your history remains private and every image is
                            automatically deleted after 30 days.
                        </p>
                    </section>

                    <section className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-surface p-5 ring-1 ring-border">
                            <Clock3
                                className="size-5 text-warning"
                                aria-hidden="true"
                            />
                            <h2 className="mt-3 font-medium text-foreground">
                                30-day history
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-muted">
                                Expired sessions are removed automatically from
                                your history and private storage.
                            </p>
                        </div>
                        <div className="rounded-xl bg-surface p-5 ring-1 ring-border">
                            <ShieldCheck
                                className="size-5 text-privacy"
                                aria-hidden="true"
                            />
                            <h2 className="mt-3 font-medium text-foreground">
                                Private by default
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-muted">
                                Only your account and the private QR link can
                                access a photo session.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
