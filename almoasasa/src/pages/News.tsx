import { useMemo, useState } from 'react';
import type { NewsCategory, NewsItem } from '../data/demo';
import { LAST_UPDATED } from '../data/demo';
import { GlassCard, IconNews, MetaLine, PageHeader, PrototypeNotice, Tag } from '../components/Shared';

interface NewsProps {
  news: NewsItem[];
}

const CATEGORIES: (NewsCategory | 'الكل')[] = ['الكل', 'إعلانات', 'فرص تدريبية', 'أخبار عامة', 'تعليمات'];

export default function News({ news }: NewsProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('الكل');

  const filtered = useMemo(() => {
    const q = query.trim();
    return [...news]
      .filter((n) => (category === 'الكل' ? true : n.category === category))
      .filter((n) => (q === '' ? true : n.title.includes(q) || n.summary.includes(q)))
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  }, [news, query, category]);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconNews className="w-6 h-6" />}
        title="الأخبار والإعلانات"
        subtitle="بطاقات إخبارية تجريبية بتصنيفات وبحث وتاريخ نشر — ليست أخباراً رسمية."
      />
      <PrototypeNotice />

      {/* بحث + تصنيفات */}
      <div className="space-y-3">
        <label className="block">
          <span className="sr-only">بحث في الأخبار</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في الأخبار التجريبية…"
            className="w-full min-h-[44px] rounded-2xl bg-white/80 backdrop-blur-xl border border-black/10 px-4 text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-shadow"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب التصنيف">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`min-h-[36px] rounded-full px-4 text-[13px] font-medium transition-all duration-200 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] ${
                category === c
                  ? 'bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/25'
                  : 'bg-white/80 backdrop-blur border border-black/10 text-[#1d1d1f] hover:bg-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[12px] text-[#86868b]">آخر تحديث للقسم: {LAST_UPDATED} · جميع البطاقات تجريبية</p>

      {/* البطاقات */}
      {filtered.length === 0 ? (
        <GlassCard className="p-10 text-center text-[#6e6e73]">لا توجد نتائج مطابقة (تجريبي).</GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((n) => (
            <article key={n.id} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 p-5 shadow-sm transition-shadow duration-200 hover:shadow-md flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <Tag>{n.category}</Tag>
                {n.featured ? <span className="text-[11px] font-medium text-[#0071e3]">إعلان بارز</span> : null}
              </div>
              <h2 className="mt-3 font-semibold text-[16px] text-[#1d1d1f] leading-snug">{n.title}</h2>
              <p className="mt-2 text-[13px] text-[#6e6e73] leading-relaxed flex-1">{n.summary}</p>
              <div className="mt-4 pt-3 border-t border-black/5">
                <MetaLine updatedAt={n.publishedAt} source={n.source} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
