import type { ReactNode } from 'react';
import type { OppStatus } from '../data/demo';
import { OPP_STATUS_LABEL } from '../data/demo';

// ── أيقونات SVG داخلية (بدون تبعيات خارجية) ─────────────────────

export function IconHome({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

export function IconNews({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h13v14H6a2 2 0 0 1-2-2V5z" />
      <path d="M17 8h3v9a2 2 0 0 1-2 2" />
      <path d="M7 9h7M7 13h7" />
    </svg>
  );
}

export function IconSparkle({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

export function IconCalendar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function IconTruck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

export function IconCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconInfo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <path d="M12 7.5v.5" />
    </svg>
  );
}

// ── عناصر واجهة مشتركة (نمط Apple HIG) ─────────────────────────

// شريط تنبيه النموذج الأولي — يظهر أعلى الصفحات الداخلية
export function PrototypeNotice() {
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-amber-50/80 border border-amber-200/70 px-4 py-3 text-[13px] leading-relaxed text-amber-900">
      <IconInfo className="w-4 h-4 mt-0.5 shrink-0" />
      <p>
        <strong className="font-semibold">نموذج أولي غير رسمي.</strong> المحتوى والمواعيد والأرقام تجريبية للعرض فقط ولا تُعتمد لأي إجراء رسمي.
      </p>
    </div>
  );
}

// بطاقة زجاجية بحواف مستديرة ناعمة
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// عنوان قسم بأسلوب Apple: كبير عريض + وصف رمادي
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-[#1d1d1f]">{title}</h2>
      {subtitle ? <p className="mt-1 text-[15px] text-[#6e6e73]">{subtitle}</p> : null}
    </div>
  );
}

// شارة حالة الإعلان
export function StatusPill({ status }: { status: OppStatus }) {
  const styles: Record<OppStatus, string> = {
    open: 'bg-green-100 text-green-800 border-green-200',
    soon: 'bg-orange-100 text-orange-800 border-orange-200',
    closed: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const dots: Record<OppStatus, string> = {
    open: 'bg-green-500',
    soon: 'bg-orange-500',
    closed: 'bg-gray-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} aria-hidden="true" />
      {OPP_STATUS_LABEL[status]}
    </span>
  );
}

// شارة تصنيف عامة
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#0071e3]/10 text-[#0071e3] px-3 py-1 text-[12px] font-medium">
      {children}
    </span>
  );
}

// زر أساسي بأسلوب Apple (شكل حبة، لمس ≥ 44px)
export function PrimaryButton({ children, onClick, type = 'button', disabled = false }: { children: ReactNode; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] px-6 text-white font-medium text-[15px] transition-all duration-200 hover:bg-[#0077ed] hover:shadow-lg hover:shadow-[#0071e3]/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    >
      {children}
    </button>
  );
}

// زر ثانوي
export function SecondaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-white/80 backdrop-blur border border-black/10 px-6 text-[#1d1d1f] font-medium text-[15px] transition-all duration-200 hover:bg-white hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
    >
      {children}
    </button>
  );
}

// ترويسة صفحة داخلية
export function PageHeader({ icon, title, subtitle }: { icon?: ReactNode; title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0071e3]/10 text-[#0071e3]">{icon}</span>
        ) : null}
        <h1 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#1d1d1f]">{title}</h1>
      </div>
      {subtitle ? <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">{subtitle}</p> : null}
    </header>
  );
}

// سطر "آخر تحديث + المصدر"
export function MetaLine({ updatedAt, source }: { updatedAt: string; source: string }) {
  return (
    <p className="text-[12px] text-[#86868b] leading-relaxed">
      آخر تحديث: <time>{updatedAt}</time> · المصدر: {source}
    </p>
  );
}
