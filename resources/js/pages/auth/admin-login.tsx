import { Form, Head, Link } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
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
    canResetPassword: boolean;
};

export default function AdminLogin({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Control Room sign in" />

            <div className="flex flex-col gap-6">
                <section className="rounded-xl bg-surface-elevated p-5 ring-1 ring-border">
                    <div className="flex gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                            <ShieldCheck
                                className="size-5"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Control Room access
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-muted">
                                This area is only for the seeded Super Admin and
                                Admin accounts. After password sign-in, an
                                authenticator-app check is required.
                            </p>
                        </div>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="mt-6 flex flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Admin email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="admin@jumkneabooth.com"
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
                                    Continue to Control Room
                                </Button>
                            </>
                        )}
                    </Form>
                </section>

                {status && (
                    <div className="bg-info-soft rounded-lg px-4 py-3 text-center text-sm font-medium text-info ring-1 ring-info/20">
                        {status}
                    </div>
                )}

                <p className="text-center text-sm text-muted">
                    Looking for your photo history?{' '}
                    <Link
                        href="/"
                        className="text-brand hover:text-brand-hover"
                    >
                        Return to JumKneaBooth
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}

AdminLogin.layout = {
    title: 'Control Room sign in',
    description:
        'Use your seeded administrator account. Member sign-in is available from the JumKneaBooth homepage.',
};
