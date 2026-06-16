import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata = {
    title: 'Jahnawi Tripathi — Full-Stack Developer',
    description: 'Portfolio of Jahnawi Tripathi, a Full-Stack Developer crafting scalable web applications with React, Next.js, Node.js, Express, Python, Django, Java, and TypeScript. Turning complex problems into elegant digital solutions.',
    keywords: [
        'full-stack developer',
        'web developer',
        'react',
        'next.js',
        'node.js',
        'express',
        'python',
        'django',
        'typescript',
        'java',
        'javascript',
        'portfolio',
        'Jahnawi Tripathi',
    ],
    authors: [{ name: 'Jahnawi Tripathi' }],
    openGraph: {
        title: 'Jahnawi Tripathi — Full-Stack Developer',
        description: 'Full-Stack Developer specializing in React, Next.js, Node.js, Python & more — building powerful, scalable web experiences.',
        type: 'website',
    },
};


export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr">
            <head>
                {/* DNS prefetch for faster font domain resolution */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/*
                  Next.js App Router automatically optimizes Google Fonts at build time.
                  Using raw `<link rel="stylesheet">` allows Next.js to inline the CSS,
                  completely eliminating FCP/LCP network delays natively.
                */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <LanguageProvider>
                            <GlobalStyles />
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}