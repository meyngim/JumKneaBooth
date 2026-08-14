import { Camera } from 'lucide-react';

export default function AppLogo({ subtitle }: { subtitle?: string }) {
    return (
        <>
            <div className="motion-interactive flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-solid text-brand-solid-foreground shadow-sm">
                <Camera className="size-4" aria-hidden="true" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate font-bold tracking-wide text-brand">
                    JUMKNEA BOOTH
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
