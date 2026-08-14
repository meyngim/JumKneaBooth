import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';

type Props = {
    title: string;
    group: string;
    description: string;
};

export default function AdminPage({ title, group, description }: Props) {
    return (
        <>
            <Head title={title} />
            <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                <div>
                    <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
                        {group}
                    </p>
                    <Heading title={title} description={description} />
                </div>
                <div className="flex min-h-[16rem] flex-1 flex-col items-center justify-center rounded-xl bg-surface px-6 py-16 text-center ring-1 ring-border">
                    <p className="max-w-md text-sm text-muted">
                        This workspace is ready. Tables, filters, and actions
                        for {title.toLowerCase()} will live here.
                    </p>
                </div>
            </div>
        </>
    );
}
