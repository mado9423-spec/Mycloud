import { useState } from 'react';
import { faqSeed } from '../data/demo';
import { GlassCard, IconInfo, PageHeader, PrototypeNotice } from '../components/Shared';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconInfo className="w-6 h-6" />}
        title="الأسئلة الشائعة"
        subtitle="إجابات توضيحية عن هذا النموذج الأولي وحدوده."
      />
      <PrototypeNotice />

      <div className="space-y-3">
        {faqSeed.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="w-full min-h-[56px] flex items-center justify-between gap-3 px-5 py-4 text-right transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded-3xl"
              >
                <span className="font-semibold text-[15px] text-[#1d1d1f]">{f.q}</span>
                <span
                  className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-black/5 text-[#1d1d1f] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[14px] text-[#6e6e73] leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <GlassCard className="p-5">
        <p className="text-[13px] text-[#6e6e73] leading-relaxed">
          لم تجد إجابتك؟ هذا النموذج لا يستقبل استفسارات رسمية — توجّه عند الإطلاق إلى قناة الاتصال الرسمية المعتمدة.
        </p>
      </GlassCard>
    </div>
  );
}
