<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark', 'light' => ($appearance ?? 'system') == 'light'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Apply html.dark / html.light before first paint (no flash) --}}
        <script>
            (function () {
                try {
                    var stored = localStorage.getItem('bayoness-theme') || '{{ $appearance ?? "system" }}';
                    var theme = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var isDark = theme === 'dark' || (theme === 'system' && prefersDark);
                    var root = document.documentElement;
                    root.classList.toggle('dark', isDark);
                    root.classList.toggle('light', !isDark);
                    root.style.colorScheme = isDark ? 'dark' : 'light';
                } catch (e) {}
            })();
        </script>

        <style>
            html {
                background-color: #F7F3E9;
            }

            html.dark {
                background-color: #0A0A0A;
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'BAYONESS') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased bg-surface-sunken text-foreground">
        <x-inertia::app />
    </body>
</html>
