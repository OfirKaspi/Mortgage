import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import AccessibilityWidget from "@/components/legal/AccessibilityWidget";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { CONFIG } from "@/config/config";
import Script from "next/script";
import GAListener from "@/components/common/GAListener";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { cookies, headers } from 'next/headers';

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
        <title>בשביל המשכנתא | ייעוץ משכנתאות מקצועי - משכנתא חדשה, מחזור, משכנתא הפוכה</title>
        <meta
          name="description"
          content="ייעוץ משכנתאות מקצועי שיחסוך לכם עשרות אלפי שקלים. משכנתא חדשה, מחזור משכנתא, משכנתא הפוכה. ללא עלות וללא התחייבות."
        />
        <meta
          name="keywords"
          content="ייעוץ משכנתאות, משכנתא חדשה, מחזור משכנתא, משכנתא הפוכה, יועץ משכנתאות, תמהיל משכנתא, חיסכון במשכנתא"
        />
        <meta property="og:title" content="בשביל המשכנתא | ייעוץ משכנתאות מקצועי" />
        <meta
          property="og:description"
          content="ייעוץ משכנתאות מקצועי שיחסוך לכם עשרות אלפי שקלים. משכנתא חדשה, מחזור משכנתא, משכנתא הפוכה. ללא עלות וללא התחייבות."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourdomain.com/mortgage-og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourdomain.com" />
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