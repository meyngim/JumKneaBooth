import { Form, Head } from '@inertiajs/react';
import { Chrome, Facebook, Send, ShieldCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    oauthError?: string;
    canResetPassword: boolean;
    oauthProviders: Record<string, string>;
};

const providerIcons = {
    google: Chrome,
    facebook: Facebook,
    telegram: Send,
};

export default function Login({
    status,
    oauthError,
    canResetPassword,
    oauthProviders,
}: Props) {
    return (
        <>
            <Head title="Sign in" />

            <div className="flex flex-col gap-6">
                <section className="space-y-3">
                    <div>
                        <h2 className="text-base font-semibold text-foreground">
                            Continue with an account
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-muted">
                            Sign in to keep your private photo history for up to
                            30 days. No JumKneaBooth password is required.
                        </p>
                    </div>

                    <div className="grid gap-3">
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
                                        <a href={`/auth/${provider}/redirect`}>
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
                </section>

                {Object.keys(oauthProviders).length > 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs tracking-[0.16em] uppercase">
                            <span className="bg-surface px-3 text-subtle">
                                Control Room
                            </span>
                        </div>
                    </div>
                )}

                <section className="rounded-xl bg-surface-elevated p-4 ring-1 ring-border">
                    <div className="flex gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                            <ShieldCheck
                                className="size-4"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-foreground">
                                Super Admin and Admin access
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-muted">
                                Seeded Control Room accounts sign in with their
                                password, then confirm an authenticator-app
                                code.
                            </p>
                        </div>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="mt-5 flex flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        placeholder="admin@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm"
                                            >
                                                Forgot your password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox id="remember" name="remember" />
                                    <Label htmlFor="remember">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Sign in to Control Room
                                </Button>
                            </>
                        )}
                    </Form>
                </section>

                {(status || oauthError) && (
                    <div
                        className={`text-center text-sm font-medium ${
                            oauthError ? 'text-error' : 'text-success'
                        }`}
                    >
                        {oauthError ?? status}
                    </div>
                )}
            </div>
        </>
    );
}

Login.layout = {
    title: 'Welcome to JumKneaBooth',
    description:
        'Continue with Google, Facebook, or Telegram. Control Room accounts use an additional authenticator-app check.',
};
