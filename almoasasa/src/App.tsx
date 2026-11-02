import { useState } from 'react';
import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import type { NewsItem } from './data/demo';
import { APP_NAME, LAST_UPDATED, PROTOTYPE_NOTICE, newsSeed } from './data/demo';
import { IconCalendar, IconHome, IconNews, IconSparkle, IconTruck } from './components/Shared';
import Home from './pages/Home';
import News from './pages/News';
import Opportunities from './pages/Opportunities';
import Dates from './pages/Dates';
import Steps from './pages/Steps';
import Track from './pages/Track';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const NAV_MAIN = [
  { to: '/', label: 'الرئيسية', icon: IconHome },
  { to: '/news', label: 'الأخبار', icon: IconNews },
  { to: '/opportunities', label: 'الفرص', icon: IconSparkle },
  { to: '/dates', label: 'المواعيد', icon: IconCalendar },
  { to: '/track', label: 'المتابعة', icon: IconTruck },
];

const NAV_SECONDARY = [
  { to: '/steps', label: 'خطوات التقديم' },
  { to: '/faq', label: 'الأسئلة الشائعة' },
  { to: '/contact', label: 'تواصل' },
  { to: '/admin', label: 'لوحة الإدارة (شكلية)' },
];

export default function App() {
  const [news, setNews] = useState<NewsItem[]>(newsSeed);

  return (
    <HashRouter>
      <div dir="rtl" className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
        {/* شريط علوي زجاجي */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-black/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded-xl">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-bl from-[#0a84ff] to-[#0040dd] text-white font-bold text-[15px] shadow-md shadow-[#0071e3]/25">
                م
              </span>
              <span className="font-bold text-[17px] tracking-tight">{APP_NAME}</span>
              <span className="hidden sm:inline text-[11px] text-[#86868b] font-medium">نموذج أولي</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1" aria-label="التنقل الرئيسي">
              {NAV_MAIN.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] ${
                      isActive ? 'bg-black/5 text-[#1d1d1f]' : 'text-[#6e6e73] hover:bg-black/5 hover:text-[#1d1d1f]'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        {/* المحتوى */}
        <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 pb-28 md:pb-12" id="main">
          <Routes>
            <Route path="/" element={<Home news={news} />} />
            <Route path="/news" element={<News news={news} />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/dates" element={<Dates />} />
            <Route path="/steps" element={<Steps />} />
            <Route path="/track" element={<Track />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin news={news} setNews={setNews} />} />
            <Route path="*" element={<Home news={news} />} />
          </Routes>
        </main>

        {/* التذييل */}
        <footer className="border-t border-black/5 bg-white/50 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-4">
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="روابط إضافية">
              {NAV_SECONDARY.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-[13px] font-medium text-[#0071e3] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <p className="text-[12px] text-[#86868b] leading-relaxed max-w-3xl">{PROTOTYPE_NOTICE}</p>
            <p className="text-[12px] text-[#86868b]">
              آخر تحديث: {LAST_UPDATED} · تطبيق معلوماتي مدني الاستخدام · أي إطلاق فعلي يتطلب مراجعة قانونية وأمنية وسياسة خصوصية معتمدة وموافقة الجهة المسؤولة.
            </p>
          </div>
        </footer>

        {/* شريط تبويب سفلي للهاتف */}
        <nav
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur-xl border-t border-black/5"
          aria-label="التنقل السفلي"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="grid grid-cols-5">
            {NAV_MAIN.map((n) => {
              const Icon = n.icon;
              return (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 min-h-[56px] transition-colors duration-200 focus-visible:outline-none ${
                      isActive ? 'text-[#0071e3]' : 'text-[#86868b]'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px] font-medium">{n.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </HashRouter>
  );
}
