import { DEMO_REFERENCE, formatDateAr, offsetToDate, trackStagesSeed } from '../data/demo';
import { GlassCard, IconTruck, PageHeader, PrototypeNotice, Tag } from '../components/Shared';

export default function Track() {
  const stages = trackStagesSeed.map((s) => ({ ...s, date: offsetToDate(s.offsetDays) }));
  const currentStageIndex = stages.findIndex((s) => !s.done);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconTruck className="w-6 h-6" />}
        title="متابعة الطلب (تجريبي)"
        subtitle="شاشة تتبع وهمية لعرض المراحل فقط — ليست حالة طلب حقيقي ولا تتصل بأي نظام."
      />
      <PrototypeNotice />

      {/* الرقم المرجعي الوهمي */}
      <GlassCard className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[13px] text-[#6e6e73]">الرقم المرجعي (وهمي)</p>
            <p className="mt-1 text-[24px] font-bold tracking-wide text-[#1d1d1f]" dir="ltr">
              {DEMO_REFERENCE}
            </p>
          </div>
          <Tag>للعرض فقط</Tag>
        </div>
      </GlassCard>

      {/* المراحل */}
      <section aria-label="مراحل الطلب التجريبي">
        <ol className="relative space-y-0">
          {stages.map((s, i) => {
            const isLast = i === stages.length - 1;
            const isActive = i === currentStageIndex;
            return (
              <li key={s.title} className="relative">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors ${
                        s.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                      aria-hidden="true"
                    >
                      {s.done ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </span>
                    {!isLast ? <span className={`w-0.5 flex-1 ${s.done ? 'bg-green-300' : 'bg-gray-200'}`} style={{ minHeight: '32px' }} /> : null}
                  </div>
                  <div className="pb-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`font-semibold text-[16px] ${s.done ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`}>{s.title}</h3>
                      {isActive ? <Tag>المرحلة الحالية (توضيحية)</Tag> : null}
                    </div>
                    <p className="mt-1 text-[13px] text-[#6e6e73] leading-relaxed">{s.detail}</p>
                    <p className="mt-1 text-[12px] text-[#86868b]">تاريخ تجريبي: {formatDateAr(s.date)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* تنبيه */}
      <GlassCard className="p-5">
        <p className="text-[13px] text-[#6e6e73] leading-relaxed">
          هذه الشاشة نموذج واجهة فقط. أي نظام تتبع فعلي يتطلب خادماً آمناً وربطاً معتمداً من الجهة المسؤولة،
          مع صلاحيات محددة وسجل تدقيق — ولا يخزّن هذا النموذج أي بيانات حقيقية.
        </p>
      </GlassCard>
    </div>
  );
}
