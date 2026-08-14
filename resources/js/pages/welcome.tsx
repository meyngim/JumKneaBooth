import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center bg-surface-sunken p-6 text-foreground lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                    <nav className="flex items-center justify-between gap-4">
                        <AppLogo />
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex rounded-md bg-brand-solid px-5 py-1.5 text-sm font-medium text-brand-solid-foreground hover:bg-brand-hover dark:hover:bg-brand-solid/90"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="inline-flex rounded-md px-5 py-1.5 text-sm text-brand hover:text-brand-hover"
                                >
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </nav>
                </header>
                <main className="w-full max-w-[335px] rounded-xl bg-surface p-8 ring-1 ring-border lg:max-w-xl lg:p-12">
                    <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                        Gather. Capture. Keep it private.
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        JUMKNEA BOOTH
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        A private, sponsor-supported photo-booth experience with
                        no account required to get started.
                    </p>
                </main>
            </div>
        </>
    );
}
