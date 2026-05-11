import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageviewBeacon } from "@/components/PageviewBeacon";

export const metadata: Metadata = {
  title: "Neolevel | Business School para Jovens empreendedores e sucessores",
  description:
    "Formação de gestão empresarial para jovens líderes de 17 a 30 anos. Mentoria com grandes empresários, networking exclusivo e metodologia hands-on na estrutura da FIESC. Inscreva-se!",
  icons: {
    icon: "/neolevel-favicon.png",
    apple: "/neolevel-favicon.png",
  },
  openGraph: {
    title: "Neolevel | Business School para Jovens empreendedores e sucessores",
    description:
      "Formação de gestão empresarial para jovens líderes de 17 a 30 anos. Mentoria com grandes empresários, networking exclusivo e metodologia hands-on na estrutura da FIESC.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Neolevel Business School" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neolevel | Business School para Jovens empreendedores e sucessores",
    description:
      "Formação de gestão empresarial para jovens líderes de 17 a 30 anos. Mentoria com grandes empresários, networking exclusivo e metodologia hands-on na estrutura da FIESC.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <Script id="gtm" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WJR4VZQ3');`}</Script>
      </head>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJR4VZQ3" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}</Script>
            <noscript>
              <img height="1" width="1" style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <PageviewBeacon />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
