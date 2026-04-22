import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Neolevel | Business School para Jovens empreendedores e sucessores",
  description:
    "Formação de gestão empresarial para jovens líderes de 17 a 30 anos. Mentoria com grandes empresários, networking exclusivo e metodologia hands-on na estrutura da FIESC. Inscreva-se!",
  openGraph: {
    title: "Neolevel | Business School para Jovens empreendedores e sucessores",
    description:
      "Formação de gestão empresarial para jovens líderes de 17 a 30 anos. Mentoria com grandes empresários, networking exclusivo e metodologia hands-on na estrutura da FIESC.",
    type: "website",
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
