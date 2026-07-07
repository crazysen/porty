import { useEffect, useState } from 'react';
import type { Certificate } from '@/types';
import ScrollReveal from '@/components/UI/ScrollReveal';

interface CertificatesGridProps {
  certificates: Certificate[];
}

export default function CertificatesGrid({ certificates }: CertificatesGridProps) {
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    if (selected) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((cert, i) => (
          <ScrollReveal key={cert.id} delay={i * 0.1}>
            <button
              onClick={() => setSelected(cert)}
              className="focus-ring group glass w-full overflow-hidden rounded-2xl text-left transition-all duration-300 hover:scale-105 hover:border-accent-purple/30 hover:shadow-lg hover:shadow-accent-purple/10"
              aria-label={`View ${cert.title} certificate`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate preview`}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold leading-snug">{cert.title}</h3>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{cert.issuer}</p>
                <p className="mt-1 text-xs text-accent-cyan">{cert.date}</p>
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} certificate`}
        >
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            aria-label="Close modal"
          />
          <div className="glass relative z-10 max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl p-6">
            <button
              onClick={() => setSelected(null)}
              className="focus-ring absolute top-4 right-4 rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selected.image}
              alt={`${selected.title} certificate`}
              className="w-full rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{selected.title}</h3>
              <p className="mt-1 text-[var(--text-secondary)]">{selected.issuer}</p>
              <p className="mt-1 text-sm text-accent-cyan">{selected.date}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
