import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

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
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
