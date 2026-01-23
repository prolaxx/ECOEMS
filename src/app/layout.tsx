import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";

// DM Sans: Limpia, moderna y muy legible.
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-body',
  weight: ['400', '500', '700']
});

// Playfair Display: Elegante, académica, perfecta para títulos institucionales.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-heading',
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: "Simulador de Examen Diagnóstico - Bachillerato",
  description: "Plataforma de preparación inteligente para el ingreso a bachillerato. Diagnóstico preciso, métricas avanzadas y diseño cognitivo.",
  keywords: ["examen", "bachillerato", "ingreso", "simulador", "inteligencia", "preparación", "COMIPEMS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${playfair.variable} antialiased bg-slate-50 text-slate-900 selection:bg-[#002B7A] selection:text-white`}>
        {/* Background Pattern Global */}
        <div className="fixed inset-0 -z-10 bg-slate-50">
           <div className="absolute inset-0 bg-grid-pattern opacity-60" />
           {/* UNAM Gold subtle orb */}
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#C59D5F]/5 blur-[100px]" />
           {/* UNAM Blue subtle orb */}
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#002B7A]/5 blur-[100px]" />
        </div>
        
        <Header />
        
        <div className="relative z-10 pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
