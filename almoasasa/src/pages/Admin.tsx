import { useState } from 'react';
import type { NewsItem } from '../data/demo';
import { GlassCard, IconNews, PageHeader, PrimaryButton, PrototypeNotice, SecondaryButton, Tag } from '../components/Shared';

interface AdminProps {
  news: NewsItem[];
  setNews: (updater: (prev: NewsItem[]) => NewsItem[]) => void;
}

// لوحة إدارة شكلية: تعديل في واجهة العرض فقط، بلا نشر فعلي
export default function Admin({ news, setNews }: AdminProps) {
  const [mode, setMode] = useState<'edit-announcement' | 'add-news'>('edit-announcement');
  const [title, setTitle] = useState(news.find((n) => n.featured)?.title ?? '');
  const [summary, setSummary] = useState(news.find((n) => n.featured)?.summary ?? '');
  const [saved, setSaved] = useState<string | null>(null);

  const saveAnnouncement = () => {
    setNews((prev) => {
      const idx = prev.findIndex((n) => n.featured);
      const updated = { ...prev[idx === -1 ? 0 : idx], title: title.trim() || 'إعلان تجريبي', summary: summary.trim() || 'وصف تجريبي.' };
      const copy = [...prev];
      if (idx === -1) copy[0] = updated;
      else copy[idx] = updated;
      return copy;
    });
    setSaved('تم حفظ التعديل في واجهة العرض فقط (بدون أي نشر فعلي).');
  };

  const addNews = () => {
    setNews((prev) => [
      {
        id: `n-admin-${Date.now()}`,
        title: title.trim() || 'خبر تجريبي جديد',
        summary: summary.trim() || 'وصف توضيحي للخبر التجريبي المضاف من لوحة الإدارة الشكلية.',
        category: 'أخبار عامة',
        publishedAt: new Date().toISOString().slice(0, 10),
        source: 'أُضيف من لوحة الإدارة الشكلية — تجريبي',
      },
      ...prev,
    ]);
    setSaved('تمت إضافة الخبر التجريبي في واجهة العرض فقط (بدون أي نشر فعلي).');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconNews className="w-6 h-6" />}
        title="لوحة الإدارة (شكلية)"
        subtitle="واجهة توضيحية لمحرر محتوى مخوّل — لا مصادقة حقيقية ولا نشر حقيقياً."
      />
      <PrototypeNotice />

      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[17px] font-bold text-[#1d1d1f]">دور محرر المحتوى (افتراضي)</h2>
          <Tag>دخول توضيحي بدون مصادقة</Tag>
        </div>
        <p className="mt-2 text-[13px] text-[#6e6e73] leading-relaxed">
          تعرض هذه اللوحة شكل أدوات التحرير المستقبلية فقط. الربط الفعلي يتطلب موافقة الجهة المالكة، نظام مصادقة آمن،
          خادماً مؤمّناً، صلاحيات محددة، وسجل تدقيق — وأي زر «نشر» يبقى توضيحياً هنا.
        </p>
      </GlassCard>

      {/* تبويب العملية */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="اختيار العملية">
        {(
          [
            { k: 'edit-announcement', t: 'تعديل الإعلان البارز' },
            { k: 'add-news', t: 'إضافة خبر تجريبي' },
          ] as const
        ).map((o) => (
          <button
            key={o.k}
            type="button"
            onClick={() => { setMode(o.k); setSaved(null); }}
            aria-pressed={mode === o.k}
            className={`min-h-[36px] rounded-full px-4 text-[13px] font-medium transition-all duration-200 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] ${
              mode === o.k
                ? 'bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/25'
                : 'bg-white/80 backdrop-blur border border-black/10 text-[#1d1d1f] hover:bg-white'
            }`}
          >
            {o.t}
          </button>
        ))}
      </div>

      {/* نموذج التحرير */}
      <GlassCard className="p-5 sm:p-6 space-y-4">
        <div>
          <label htmlFor="admin-title" className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
            {mode === 'edit-announcement' ? 'عنوان الإعلان البارز (تجريبي)' : 'عنوان الخبر التجريبي'}
          </label>
          <input
            id="admin-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full min-h-[44px] rounded-2xl bg-white border border-black/10 px-4 text-[14px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="admin-summary" className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
            الوصف المختصر
          </label>
          <textarea
            id="admin-summary"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-2xl bg-white border border-black/10 px-4 py-3 text-[14px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-shadow"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {mode === 'edit-announcement' ? (
            <PrimaryButton onClick={saveAnnouncement}>حفظ التعديل (توضيحي)</PrimaryButton>
          ) : (
            <PrimaryButton onClick={addNews}>إضافة الخبر (توضيحي)</PrimaryButton>
          )}
          <SecondaryButton
            onClick={() => {
              const f = news.find((n) => n.featured);
              setTitle(f?.title ?? '');
              setSummary(f?.summary ?? '');
              setSaved(null);
            }}
          >
            استعادة النص الأصلي
          </SecondaryButton>
        </div>
        {saved ? (
          <p role="status" className="rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-[13px] leading-relaxed text-green-800">
            {saved}
          </p>
        ) : null}
      </GlassCard>

      {/* معاينة قائمة الأخبار الحالية في الواجهة */}
      <section aria-label="الأخبار الحالية في واجهة العرض">
        <h2 className="mb-3 text-[16px] font-bold text-[#1d1d1f]">الأخبار الحالية (حالة العرض الحالية)</h2>
        <ul className="space-y-2">
          {news.slice(0, 8).map((n) => (
            <li key={n.id} className="rounded-2xl bg-white/80 border border-black/5 px-4 py-3 text-[13px] text-[#1d1d1f] flex items-center justify-between gap-3">
              <span className="leading-snug">{n.title}</span>
              <span className="text-[11px] text-[#86868b] shrink-0">{n.publishedAt}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
