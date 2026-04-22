"use client";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const footerLinks = [
  { label: "Sobre", href: "#diferenciais" },
  { label: "Mentores", href: "#mentores" },
  { label: "Programa", href: "#estrutura" },
  { label: "Contato", href: "mailto:contato@neolevel.com.br" },
];

const socials = [
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer style={{ background: "rgba(18,32,58,0.88)" }}>
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(6,249,250,0.2), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span
              className="text-2xl font-bold tracking-widest"
              style={{ fontFamily: "Sora, sans-serif", color: "#FFFFFF" }}
            >
              NEO<span style={{ color: "#06F9FA" }}>LEVEL</span>
            </span>
            <p className="text-[#D9D9D9]/60 text-sm mt-4 leading-relaxed max-w-xs">
              Business School exclusiva para jovens empreendedores e sucessores.
              Formação hands-on com mentores que construíram grandes ecossistemas.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#D9D9D9",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(6,249,250,0.3)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(6,249,250,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
            >
              Links
            </div>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#D9D9D9]/60 text-sm hover:text-[#06F9FA] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-5"
              style={{ color: "#06F9FA", fontFamily: "Sora, sans-serif" }}
            >
              Parceria
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: "rgba(6,249,250,0.1)",
                  color: "#06F9FA",
                  fontFamily: "Sora, sans-serif",
                }}
              >
                F
              </div>
              <div>
                <div className="text-white text-xs font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>
                  FIESC
                </div>
                <div className="text-[#D9D9D9]/50 text-[10px]">Academia de Negócios</div>
              </div>
            </div>
            <p className="text-[#D9D9D9]/50 text-xs mt-4 leading-relaxed">
              Estrutura de excelência industrial de Santa Catarina ao seu alcance.
            </p>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[#D9D9D9]/40 text-xs">
            © {new Date().getFullYear()} Neolevel Business School. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#D9D9D9]/40 text-xs hover:text-[#D9D9D9]/70 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-[#D9D9D9]/40 text-xs hover:text-[#D9D9D9]/70 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
