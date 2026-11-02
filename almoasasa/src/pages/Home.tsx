import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { NewsItem } from '../data/demo';
import { APP_NAME, APP_TAGLINE, CONTENT_SOURCE, LAST_UPDATED, PROTOTYPE_NOTICE, datesSeed, formatDateAr, newsSeed, opportunitiesSeed, offsetToDate } from '../data/demo';
import { GlassCard, IconCalendar, IconCheck, IconHome, IconNews, IconSparkle, IconTruck, MetaLine, PrototypeNotice, SectionHeader, Tag } from '../components/Shared';

interface HomeProps {
  news: NewsItem[];
}

// اختصار رئيسي بأسلوب Apple (بطاقة لمس كبيرة)
function Shortcut({ to, icon, label, hint }: { to: string; icon: ReactNode; label: string; hint: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 p-4 transition-all duration-200 hover:bg-white hover:shadow-lg hover:shadow-black/5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
    >
      <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] transition-transform duration-200 group-hover:scale-105">
        {icon}
      </span>
      <span>
        <span className="block font-semibold text-[15px] text-[#1d1d1f]">{label}</span>
        <span className="block text-[13px] text-[#6e6e73] mt-0.5">{hint}</span>
      </span>
    </Link>
  );
}

export default function Home({ news }: HomeProps) {
  const featured = news.find((n) => n.featured) ?? news[0];
  const latest = [...news].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)).slice(0, 3);
  const upcoming = datesSeed
    .map((d) => ({ ...d, date: offsetToDate(d.offsetDays) }))
    .filter((d) => d.offsetDays >= 0)
    .sort((a, b) => a.offsetDays - b.offsetDays)[0];
  const openCount = opportunitiesSeed.filter((o) => o.status === 'open').length;

  return (
    <div className="space-y-10">
      {/* التنبيه العام */}
      <PrototypeNotice />

      {/* البطل + الإعلان البارز */}
      <section aria-labelledby="hero-title">
        <div className="rounded-[2rem] bg-gradient-to-bl from-[#0071e3] via-[#0a84ff] to-[#0040dd] p-6 sm:p-10 text-white shadow-xl shadow-[#0071e3]/20">
          <p className="text-[13px] font-medium text-white/70">{APP_TAGLINE}</p>
          <h1 id="hero-title" className="mt-2 text-[30px] sm:text-[40px] font-bold tracking-tight">
            {APP_NAME}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-white/85">
            استعرض الأخبار العامة وإعلانات ومواعيد الالتحاق ومتطلبات التقديم في مكان واحد — واجهة إرشادية توضيحية تسبق أي إطلاق رسمي.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/opportunities"
              className="min-h-[44px] inline-flex items-center rounded-full bg-white text-[#0071e3] px-6 font-medium text-[15px] transition-all duration-200 hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              استكشف الفرص ({openCount} مفتوحة الآن — تجريبي)
            </Link>
            <Link
              to="/track"
              className="min-h-[44px] inline-flex items-center rounded-full bg-white/15 backdrop-blur border border-white/25 px-6 font-medium text-[15px] transition-all duration-200 hover:bg-white/25 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              متابعة طلب تجريبي
            </Link>
          </div>
        </div>

        {featured ? (
          <GlassCard className="mt-6 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Tag>إعلان بارز — تجريبي</Tag>
                <h2 className="mt-3 text-[18px] sm:text-[20px] font-bold text-[#1d1d1f] leading-snug">{featured.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73]">{featured.summary}</p>
              </div>
              <IconSparkle className="w-6 h-6 text-[#0071e3] shrink-0 hidden sm:block" />
            </div>
            <div className="mt-4">
              <MetaLine updatedAt={featured.publishedAt} source={featured.source} />
            </div>
          </GlassCard>
        ) : null}
      </section>

      {/* أقرب موعد تجريبي */}
      {upcoming ? (
        <section aria-label="أقرب موعد تجريبي">
          <GlassCard className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100 text-orange-600">
                <IconCalendar className="w-6 h-6" />
              </span>
              <div>
                <p className="text-[13px] text-[#6e6e73]">أقرب موعد تجريبي قادم</p>
                <p className="font-semibold text-[16px] text-[#1d1d1f] mt-0.5">{upcoming.title}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[18px] font-bold text-[#1d1d1f]">{formatDateAr(upcoming.date)}</p>
              <p className="text-[12px] text-[#86868b] mt-0.5">{upcoming.note}</p>
            </div>
          </GlassCard>
        </section>
      ) : null}

      {/* اختصارات */}
      <section aria-labelledby="shortcuts-title">
        <SectionHeader title="اختصارات" subtitle="وصول سريع إلى أقسام التطبيق" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Shortcut to="/opportunities" icon={<IconSparkle />} label="فرص الالتحاق" hint="تخصصات عامة وحالات الإعلانات" />
          <Shortcut to="/steps" icon={<IconCheck />} label="المتطلبات" hint="خطوات التقديم وقائمة تحقق عامة" />
          <Shortcut to="/faq" icon={<IconHome />} label="الأسئلة الشائعة" hint="إجابات عن النموذج وأهدافه" />
          <Shortcut to="/track" icon={<IconTruck />} label="متابعة الطلب" hint="شاشة تتبع تجريبية برقم مرجعي وهمي" />
        </div>
      </section>

      {/* أحدث الأخبار */}
      <section aria-labelledby="latest-news-title">
        <div className="flex items-end justify-between">
          <SectionHeader title="أحدث الأخبار" subtitle="بطاقات تجريبية — راجع دائماً المصدر الرسمي" />
          <Link to="/news" className="text-[#0071e3] text-[14px] font-medium hover:underline mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded">
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latest.map((n) => (
            <GlassCard key={n.id} className="p-5 flex flex-col">
              <Tag>{n.category}</Tag>
              <h3 className="mt-3 font-semibold text-[16px] text-[#1d1d1f] leading-snug">{n.title}</h3>
              <p className="mt-2 text-[13px] text-[#6e6e73] leading-relaxed line-clamp-3">{n.summary}</p>
              <div className="mt-4 pt-3 border-t border-black/5">
                <MetaLine updatedAt={n.publishedAt} source={n.source} />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* تذييل شفافية المحتوى */}
      <section>
        <GlassCard className="p-5">
          <div className="flex items-start gap-3">
            <IconNews className="w-5 h-5 text-[#6e6e73] mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-[13px] text-[#1d1d1f] font-medium">شفافية المحتوى</p>
              <p className="text-[12px] text-[#6e6e73] leading-relaxed">{CONTENT_SOURCE}</p>
              <p className="text-[12px] text-[#6e6e73]">آخر تحديث للتطبيق: {LAST_UPDATED}</p>
              <p className="text-[12px] text-[#86868b] leading-relaxed">{PROTOTYPE_NOTICE}</p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
