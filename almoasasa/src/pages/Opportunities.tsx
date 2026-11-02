import { useMemo, useState } from 'react';
import type { OppStatus } from '../data/demo';
import { OPP_STATUS_LABEL, opportunitiesSeed } from '../data/demo';
import { GlassCard, IconSparkle, PageHeader, PrimaryButton, PrototypeNotice, SecondaryButton, StatusPill, Tag } from '../components/Shared';

type FilterStatus = OppStatus | 'all';
const FILTERS: FilterStatus[] = ['all', 'open', 'soon', 'closed'];
const FILTER_LABEL: Record<FilterStatus, string> = { all: 'الكل', ...OPP_STATUS_LABEL };

// مدقق الأهلية التجريبي: أسئلة عامة فقط، لا يُخزّن أي بيانات
function EligibilityCheck() {
  const [answers, setAnswers] = useState<{ age: string; education: string }>({ age: '', education: '' });
  const [result, setResult] = useState<string | null>(null);

  const check = () => {
    const ageOk = answers.age === 'yes';
    const eduOk = answers.education === 'yes';
    if (ageOk && eduOk) {
      setResult('وفق الفئات العامة الاسترشادية فقط: قد تؤهلك الفرص «المفتوحة» للاطلاع — تحقق دائماً من الإعلان الرسمي. (نتيجة توضيحية لا تُعتمد)');
    } else if (ageOk || eduOk) {
      setResult('وفق الفئات العامة الاسترشادية: بعض الفرص قد لا تناسب مؤهلك الحالي — استعرض شروط كل فرصة في إعلانها الرسمي. (نتيجة توضيحية)');
    } else {
      setResult('وفق الفئات العامة الاسترشادية: يُفضل مراجعة الإعلانات الرسمية الأخرى المناسبة لمستواك الدراسي. (نتيجة توضيحية)');
    }
  };

  const radio = (current: string, set: (v: string) => void, labelYes: string) => (
    <div className="flex gap-2">
      {[
        { v: 'yes', t: labelYes },
        { v: 'no', t: 'لا' },
      ].map((opt) => (
        <button
          key={opt.v}
          type="button"
          role="radio"
          aria-checked={current === opt.v}
          onClick={() => set(opt.v)}
          className={`min-h-[44px] flex-1 rounded-2xl border text-[14px] font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] ${
            current === opt.v
              ? 'border-[#0071e3] bg-[#0071e3]/10 text-[#0071e3]'
              : 'border-black/10 bg-white/70 text-[#1d1d1f] hover:bg-white'
          }`}
        >
          {opt.t}
        </button>
      ))}
    </div>
  );

  return (
    <GlassCard className="p-5 sm:p-6">
      <Tag>إضافة تجريبية — مدقق أهلية</Tag>
      <h3 className="mt-3 text-[18px] font-bold text-[#1d1d1f]">مدقق أهلية سريع (توضيحي)</h3>
      <p className="mt-1 text-[13px] text-[#6e6e73] leading-relaxed">
        أجوبة عامة تُستخدم داخل الواجهة فقط ولا تُخزَّن ولا تُرسل — للعرض التوضيحي فقط.
      </p>
      <div className="mt-4 space-y-4">
        <div>
          <p className="text-[14px] font-medium text-[#1d1d1f] mb-2">هل عمرك ضمن الفئة العمرية المعتادة في إعلانات القبول العامة (18–23 سنة)؟</p>
          {radio(answers.age, (v) => setAnswers((s) => ({ ...s, age: v })), 'نعم')}
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#1d1d1f] mb-2">هل تحمل شهادة الثانوية العامة؟</p>
          {radio(answers.education, (v) => setAnswers((s) => ({ ...s, education: v })), 'نعم')}
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={check} disabled={answers.age === '' || answers.education === ''}>
            اعرض النتيجة التوضيحية
          </PrimaryButton>
          <SecondaryButton onClick={() => { setAnswers({ age: '', education: '' }); setResult(null); }}>إعادة تعيين</SecondaryButton>
        </div>
        {result ? (
          <p role="status" className="rounded-2xl bg-[#0071e3]/5 border border-[#0071e3]/15 px-4 py-3 text-[13px] leading-relaxed text-[#1d1d1f]">
            {result}
          </p>
        ) : null}
      </div>
    </GlassCard>
  );
}

export default function Opportunities() {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const list = useMemo(() => opportunitiesSeed.filter((o) => (filter === 'all' ? true : o.status === filter)), [filter]);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconSparkle className="w-6 h-6" />}
        title="فرص الالتحاق والتخصصات"
        subtitle="فرص تعليمية عامة افتراضية بحالات إعلان توضيحية — ليست إعلانات رسمية."
      />
      <PrototypeNotice />

      <EligibilityCheck />

      <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب الحالة">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`min-h-[36px] rounded-full px-4 text-[13px] font-medium transition-all duration-200 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] ${
              filter === f
                ? 'bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/25'
                : 'bg-white/80 backdrop-blur border border-black/10 text-[#1d1d1f] hover:bg-white'
            }`}
          >
            {FILTER_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {list.map((o) => (
          <GlassCard key={o.id} className="p-5 sm:p-6 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Tag>{o.field}</Tag>
                <h2 className="mt-3 text-[17px] font-bold text-[#1d1d1f] leading-snug">{o.title}</h2>
              </div>
              <StatusPill status={o.status} />
            </div>
            <p className="mt-2 text-[14px] text-[#6e6e73] leading-relaxed">{o.description}</p>

            <dl className="mt-3 space-y-1 text-[13px] text-[#1d1d1f]">
              <div className="flex gap-2">
                <dt className="text-[#86868b]">المؤهل:</dt>
                <dd>{o.education}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#86868b]">المدة:</dt>
                <dd>{o.durationLabel}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setExpanded(expanded === o.id ? null : o.id)}
              aria-expanded={expanded === o.id}
              className="mt-4 self-start text-[#0071e3] text-[14px] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] rounded"
            >
              {expanded === o.id ? 'إخفاء المتطلبات' : 'عرض المتطلبات التجريبية'}
            </button>

            {expanded === o.id ? (
              <ul className="mt-3 space-y-2 border-t border-black/5 pt-3">
                {o.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#1d1d1f] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2 shrink-0" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            ) : null}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
