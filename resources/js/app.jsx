import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob(['./Pages/**/*.tsx', './Pages/**/*.jsx']);
        const path = `./Pages/${name}`;
        if (pages[`${path}.tsx`]) {
            return resolvePageComponent(`${path}.tsx`, pages);
        }
        if (pages[`${path}.jsx`]) {
            return resolvePageComponent(`${path}.jsx`, pages);
        }
        throw new Error(`Page not found: ${path}`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
