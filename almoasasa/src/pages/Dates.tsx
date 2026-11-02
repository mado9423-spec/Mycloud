import { useMemo } from 'react';
import { datesSeed, formatDateAr, offsetToDate } from '../data/demo';
import { GlassCard, IconCalendar, PageHeader, PrototypeNotice, Tag } from '../components/Shared';

interface DateEntry {
  id: string;
  title: string;
  note: string;
  date: Date;
  passed: boolean;
  daysAway: number;
}

export default function Dates() {
  const items = useMemo<DateEntry[]>(
    () =>
      datesSeed
        .map((d) => ({
          id: d.id,
          title: d.title,
          note: d.note,
          date: offsetToDate(d.offsetDays),
          passed: d.offsetDays < 0,
          daysAway: d.offsetDays,
        }))
        .sort((a, b) => a.daysAway - b.daysAway),
    []
  );

  const upcoming = items.filter((i) => !i.passed);
  const past = items.filter((i) => i.passed);

  const row = (d: DateEntry) => (
    <GlassCard key={d.id} className={`p-5 flex flex-wrap items-center justify-between gap-4 ${d.passed ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-4">
        <span className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${d.passed ? 'bg-gray-100 text-gray-400' : 'bg-orange-100 text-orange-600'}`}>
          <IconCalendar className="w-6 h-6" />
        </span>
        <div>
          <p className="font-semibold text-[15px] text-[#1d1d1f] leading-snug">{d.title}</p>
          <p className="text-[12px] text-[#86868b] mt-0.5">{d.note}</p>
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1.5">
        <Tag>{d.passed ? 'منتهٍ (تجريبي)' : 'قادم (تجريبي)'}</Tag>
        <time className="text-[14px] font-medium text-[#1d1d1f]">{formatDateAr(d.date)}</time>
        {!d.passed ? (
          <span className="text-[12px] text-[#0071e3] font-medium">بعد {d.daysAway} يوماً — توضيحي</span>
        ) : null}
      </div>
    </GlassCard>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconCalendar className="w-6 h-6" />}
        title="مواعيد الالتحاق (تجريبية)"
        subtitle="قائمة مواعيد افتراضية للعرض فقط — لا يُعتمد أي تاريخ هنا رسمياً."
      />
      <PrototypeNotice />

      <section aria-labelledby="upcoming-title">
        <h2 id="upcoming-title" className="mb-3 text-[18px] font-bold text-[#1d1d1f]">المواعيد القادمة</h2>
        <div className="space-y-3">{upcoming.length > 0 ? upcoming.map(row) : <GlassCard className="p-6 text-center text-[#6e6e73] text-[14px]">لا مواعيد قادمة (تجريبي).</GlassCard>}</div>
      </section>

      <section aria-labelledby="past-title">
        <h2 id="past-title" className="mb-3 text-[18px] font-bold text-[#1d1d1f]">المواعيد المنتهية</h2>
        <div className="space-y-3">{past.length > 0 ? past.map(row) : <GlassCard className="p-6 text-center text-[#6e6e73] text-[14px]">لا مواعيد منتهية (تجريبي).</GlassCard>}</div>
      </section>
    </div>
  );
}
