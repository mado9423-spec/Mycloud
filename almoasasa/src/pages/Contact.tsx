import { contactPlaceholders } from '../data/demo';
import { GlassCard, IconInfo, PageHeader, PrototypeNotice, Tag } from '../components/Shared';

export default function Contact() {
  const { email, phone, address, note } = contactPlaceholders;

  const rows = [
    { label: 'البريد الإلكتروني', value: email, dir: 'ltr' as const },
    { label: 'الهاتف', value: phone, dir: 'ltr' as const },
    { label: 'العنوان', value: address, dir: 'rtl' as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<IconInfo className="w-6 h-6" />}
        title="تواصل"
        subtitle="بيانات توضيحية (placeholder) — لا تُستخدم للتواصل الفعلي."
      />
      <PrototypeNotice />

      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1d1d1f]">بيانات الاتصال</h2>
          <Tag>بيانات وهمية</Tag>
        </div>
        <dl className="mt-4 divide-y divide-black/5">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-wrap items-center justify-between gap-2 py-4">
              <dt className="text-[14px] text-[#6e6e73]">{r.label}</dt>
              <dd className="text-[14px] font-medium text-[#1d1d1f]" dir={r.dir}>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 px-4 py-3 text-[12px] leading-relaxed text-amber-900">
          {note}
        </p>
      </GlassCard>

      <GlassCard className="p-5 sm:p-6">
        <h2 className="text-[18px] font-bold text-[#1d1d1f]">نموذج مراسلة توضيحي (معطّل)</h2>
        <p className="mt-1 text-[13px] text-[#6e6e73] leading-relaxed">
          يعرض هذا النموذج شكل واجهة مراسلة مستقبلية فقط — لا يرسل أي رسالة ولا يجمع أي بيانات.
        </p>
        <div className="mt-4 space-y-3">
          <input
            type="text"
            disabled
            placeholder="الاسم (توضيحي — معطّل)"
            className="w-full min-h-[44px] rounded-2xl bg-gray-50 border border-black/10 px-4 text-[14px] text-[#86868b] cursor-not-allowed"
          />
          <input
            type="email"
            disabled
            placeholder="البريد الإلكتروني (توضيحي — معطّل)"
            className="w-full min-h-[44px] rounded-2xl bg-gray-50 border border-black/10 px-4 text-[14px] text-[#86868b] cursor-not-allowed"
          />
          <textarea
            disabled
            placeholder="نص الرسالة (توضيحي — معطّل)"
            rows={3}
            className="w-full rounded-2xl bg-gray-50 border border-black/10 px-4 py-3 text-[14px] text-[#86868b] cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="min-h-[44px] rounded-full bg-gray-200 text-gray-400 px-6 font-medium text-[14px] cursor-not-allowed"
          >
            إرسال (توضيحي — يتطلب نظاماً معتمداً قبل التفعيل)
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
