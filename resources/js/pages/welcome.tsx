import { Head, Link, usePage } from '@inertiajs/react';
import {
    Camera,
    Chrome,
    Facebook,
    Image,
    Send,
    ShieldCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';

type Props = {
    oauthProviders: Record<string, string>;
};

const providerIcons = {
    google: Chrome,
    facebook: Facebook,
    telegram: Send,
};

export default function Welcome({ oauthProviders }: Props) {
    const { auth } = usePage().props;
    const isSignedIn = Boolean(auth.user);

    return (
        <>
            <Head title="Modern photo booth" />
            <main className="min-h-screen bg-surface-sunken text-foreground">
                <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
                    <Link
                        href="/"
                        className="rounded-md focus-visible:outline-none"
                    >
                        <AppLogo subtitle="Gather. Capture. Keep it private." />
                    </Link>
                    {isSignedIn ? (
                        <Button asChild variant="outline" size="sm">
                            <Link href="/history">Your photo history</Link>
                        </Button>
                    ) : (
                        <a
                            href="/admin/login"
                            className="text-sm font-medium text-muted transition-colors hover:text-brand"
                        >
                            Control Room sign in
                        </a>
                    )}
                </header>

                <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-10 pb-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20 lg:pb-20">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                            JumKneaBooth
                        </p>
                        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Four shots. One private memory.
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
                            Capture a photo strip with friends, choose a frame
                            or filter, and receive a private QR link in moments.
                            No account is needed to use the booth.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <a href="#save-your-photos">
                                    <Camera
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                    Save your next photo strip
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="#guest-access">Use as a guest</a>
                            </Button>
                        </div>

                        <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
                            <Feature icon={Camera} label="4-shot sequence" />
                            <Feature icon={Image} label="Frames and filters" />
                            <Feature
                                icon={ShieldCheck}
                                label="Private for 30 days"
                            />
                        </div>
                    </div>

                    <section
                        id="save-your-photos"
                        className="motion-panel-enter rounded-2xl bg-surface p-6 ring-1 ring-border sm:p-8"
                    >
                        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                            Member access
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-foreground">
                            Save and revisit your photo strips
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-muted">
                            Choose a provider below to create an account or sign
                            in. The same button handles both—there is no
                            JumKneaBooth password to remember.
                        </p>

                        <div className="mt-6 grid gap-3">
                            {Object.entries(oauthProviders).map(
                                ([provider, label]) => {
                                    const Icon =
                                        providerIcons[
                                            provider as keyof typeof providerIcons
                                        ];

                                    return (
                                        <Button
                                            key={provider}
                                            asChild
                                            variant="outline"
                                            className="w-full justify-center"
                                        >
                                            <a
                                                href={`/auth/${provider}/redirect`}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Continue with {label}
                                            </a>
                                        </Button>
                                    );
                                },
                            )}
                        </div>

                        {Object.keys(oauthProviders).length === 0 && (
                            <p className="bg-warning-soft mt-6 rounded-lg px-4 py-3 text-sm leading-6 text-warning ring-1 ring-warning/20">
                                Member sign-in will appear here once an OAuth
                                provider is configured.
                            </p>
                        )}

                        <div
                            id="guest-access"
                            className="mt-6 rounded-xl bg-surface-elevated p-4"
                        >
                            <h3 className="font-medium text-foreground">
                                Prefer not to sign in?
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-muted">
                                Use the booth as a guest and scan the private QR
                                code to download your strip. Guest photos have
                                no account history and are deleted after 30
                                days.
                            </p>
                        </div>
                    </section>
                </section>

                <footer className="border-t border-border px-5 py-6 text-center text-sm text-subtle sm:px-8">
                    <a href="/admin/login" className="hover:text-brand">
                        Control Room sign in for Super Admin and Admin
                    </a>
                </footer>
            </main>
        </>
    );
}

function Feature({
    icon: Icon,
    label,
}: {
    icon: typeof Camera;
    label: string;
}) {
    return (
        <div className="flex items-center gap-2 rounded-lg bg-surface-elevated px-3 py-2 text-sm text-muted">
            <Icon className="size-4 shrink-0 text-brand" aria-hidden="true" />
            {label}
        </div>
    );
}
