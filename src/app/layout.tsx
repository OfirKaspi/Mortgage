import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import AccessibilityWidget from "@/components/legal/AccessibilityWidget";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CONFIG } from "@/config/config";
import Script from "next/script";
import GAListener from "@/components/common/GAListener";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { cookies, headers } from 'next/headers';
import { pageContent } from "@/config/pageContent";

// MUST CHANGE DETAILS, IMAGES, OR ANYTHING RELEVANT + FONTS
const RootLayout = async ({ children, }: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('theme')?.value as 'light' | 'dark' | undefined;

  // If no cookie, fall back to user agent hint once
  const prefersDark = (await headers()).get('sec-ch-prefers-color-scheme') === 'dark';
  const serverTheme: 'light' | 'dark' = cookieTheme ?? (prefersDark ? 'dark' : 'light');

  return (
    <html
      lang="he"
      dir="rtl"
      className={serverTheme === 'dark' ? 'dark' : ''}
      suppressHydrationWarning
      style={{ backgroundColor: serverTheme === 'dark' ? '#0b0d12' : '#ffffff' }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageContent.metadata.title}</title>
        <meta
          name="description"
          content={pageContent.metadata.description}
        />
        <meta
          name="keywords"
          content={pageContent.metadata.keywords}
        />
        <meta property="og:title" content={pageContent.metadata.og.title} />
        <meta
          property="og:description"
          content={pageContent.metadata.og.description}
        />
        <meta property="og:type" content={pageContent.metadata.og.type} />
        <meta property="og:image" content={pageContent.metadata.og.image.url} />
        <meta property="og:image:width" content={pageContent.metadata.og.image.width} />
        <meta property="og:image:height" content={pageContent.metadata.og.image.height} />
        <meta property="og:image:alt" content={pageContent.metadata.og.image.alt} />
        <meta property="og:locale" content={pageContent.metadata.og.locale} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || "https://www.ezmashcanta.com"} />
        <meta name="twitter:card" content={pageContent.metadata.twitter.card} />
        <meta name="twitter:title" content={pageContent.metadata.twitter.title} />
        <meta name="twitter:description" content={pageContent.metadata.twitter.description} />
        <meta name="twitter:image" content={pageContent.metadata.twitter.image.url} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://www.ezmashcanta.com"} />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&display=swap"
          rel="stylesheet"
        /> */}
        {CONFIG.GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${CONFIG.GOOGLE_ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider initialTheme={serverTheme}>
          {children}
          <WhatsAppButton />
          <AccessibilityWidget />
        </ThemeProvider>

        <GAListener />
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;