import { documentChecklist, stepsSeed } from '../data/demo';
import { GlassCard, IconCheck, PageHeader, PrototypeNotice, SecondaryButton, Tag } from '../components/Shared';
import { useState } from 'react';

export default function Steps() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (label: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconCheck className="w-6 h-6" />}
        title="خطوات التقديم والمتطلبات"
        subtitle="خطوات إرشادية وقائمة تحقق عامة — التقديم الفعلي يتم عبر القناة الرسمية المعلنة فقط."
      />
      <PrototypeNotice />

      {/* الخطوات */}
      <section aria-labelledby="steps-title">
        <h2 id="steps-title" className="mb-4 text-[20px] font-bold text-[#1d1d1f]">خطوات التقديم (إرشادية)</h2>
        <ol className="space-y-3">
          {stepsSeed.map((s, i) => (
            <li key={s.title}>
              <GlassCard className="p-5 flex items-start gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0071e3] text-white font-bold text-[14px] shrink-0" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-[16px] text-[#1d1d1f]">{s.title}</h3>
                  <p className="mt-1 text-[13px] text-[#6e6e73] leading-relaxed">{s.detail}</p>
                </div>
              </GlassCard>
            </li>
          ))}
        </ol>
      </section>

      {/* قائمة تحقق المستندات */}
      <section aria-labelledby="docs-title">
        <div className="flex items-end justify-between">
          <h2 id="docs-title" className="mb-4 text-[20px] font-bold text-[#1d1d1f]">قائمة تحقق المستندات (بصيغة عامة)</h2>
          <span className="text-[13px] text-[#86868b] mb-4">
            {checked.size}/{documentChecklist.length}
          </span>
        </div>
        <GlassCard className="p-5 sm:p-6">
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">
            فئات مستندات استرشادية من شكل الإعلانات العامة المنشورة. القائمة الرسمية المعتمدة تصدرها الجهة المختصة فقط،
            ولا يُرفع أي مستند داخل هذا النموذج — التحديد هنا يبقى في واجهة العرض فقط.
          </p>
          <ul className="mt-4 space-y-2">
            {documentChecklist.map((doc) => {
              const isOn = checked.has(doc.label);
              return (
                <li key={doc.label}>
                  <label
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer transition-all duration-200 active:scale-[0.99] ${
                      isOn ? 'border-green-200 bg-green-50/70' : 'border-black/10 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isOn}
                      onChange={() => toggle(doc.label)}
                      className="w-5 h-5 rounded-md accent-[#0071e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                    />
                    <span>
                      <span className={`block text-[14px] font-medium ${isOn ? 'text-green-800' : 'text-[#1d1d1f]'}`}>{doc.label}</span>
                      <span className="block text-[12px] text-[#86868b]">{doc.hint}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <SecondaryButton onClick={() => setChecked(new Set(documentChecklist.map((d) => d.label)))}>تحديد الكل (توضيحي)</SecondaryButton>
            <SecondaryButton onClick={() => setChecked(new Set())}>مسح التحديد</SecondaryButton>
          </div>
          <p className="mt-3 text-[12px] text-[#86868b]">لا يُرفع أي ملف هنا — وظيفة الرفع الحقيقية تُفعّل فقط عبر نظام معتمد ومؤمّن بعد الموافقات.</p>
        </GlassCard>
      </section>

      {/* الإرشاد للقناة الرسمية */}
      <section>
        <GlassCard className="p-5 sm:p-6">
          <Tag>بعد اعتماد التطبيق</Tag>
          <h3 className="mt-3 text-[17px] font-bold text-[#1d1d1f]">الوصول إلى قناة الاتصال الرسمية</h3>
          <p className="mt-2 text-[14px] text-[#6e6e73] leading-relaxed">
            عند اعتماد هذا النموذج من الجهة المسؤولة، ستُدرج هنا قناة الاتصال الرسمية المعتمدة (موقع رسمي، بريد معتمد، أو مقر معلن)
            مع تعليمات الوصول وإرشادات التقديم الرسمية. أي إطلاق فعلي يتطلب: مراجعة قانونية وأمنية، سياسة خصوصية معتمدة،
            موافقة الجهة المسؤولة، خادماً آمناً، صلاحيات محددة، وسجل تدقيق.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
