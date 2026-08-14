import { useAppearance } from '@/hooks/use-appearance';

const SITE_LOGO_DARK = '/brand-images/logo-site/app-logo-dark-mode.png';
const SITE_LOGO_LIGHT = '/brand-images/logo-site/app-logo-light-mode.png';

export default function AppLogo({ subtitle }: { subtitle?: string }) {
    const { resolvedAppearance } = useAppearance();
    const logoSrc =
        resolvedAppearance === 'dark' ? SITE_LOGO_DARK : SITE_LOGO_LIGHT;

    return (
        <>
            <img
                src={logoSrc}
                alt="Bayoness"
                className="size-8 rounded-md object-contain"
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate font-bold tracking-wide text-brand">
                    BAYONESS
                </span>
                {subtitle && (
                    <span className="truncate text-xs text-muted">
                        {subtitle}
                    </span>
                )}
            </div>
        </>
    );
}
