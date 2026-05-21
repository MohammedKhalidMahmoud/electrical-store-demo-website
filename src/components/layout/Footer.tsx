import { CreditCard, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerCategories = ['كابلات', 'مفاتيح', 'إضاءة', 'قواطع', 'مآخذ', 'أجهزة قياس'];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6 xl:grid-cols-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">عن VoltStore</h3>
          <p className="mt-4 text-sm leading-8 text-slate-500">
            متجر عربي تجريبي لعرض تجربة تسوق احترافية لمواد الكهرباء، مصمم ليوضح رحلة شراء
            حديثة وسريعة وواضحة للمستخدم النهائي.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">الفئات</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            {footerCategories.map((category) => (
              <li key={category}>
                <Link to="/products" className="transition hover:text-accent">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">خدمة العملاء</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            <li>الأسئلة الشائعة</li>
            <li>سياسة الإرجاع</li>
            <li>الشحن والتوصيل</li>
            <li>طرق الدفع</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">تواصل معنا</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-accent" />
              <span>9200 12345</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-accent" />
              <span>hello@voltstore.demo</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-accent" />
              <span>الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="text-sm text-slate-500">
            © 2026 VoltStore. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {['Visa', 'Mastercard', 'STC Pay', 'Mada'].map((method) => (
              <span
                key={method}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
              >
                {method}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
              <ShieldCheck size={14} className="text-emerald-500" />
              دفع آمن
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
              <CreditCard size={14} className="text-accent" />
              بوابات موثوقة
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
