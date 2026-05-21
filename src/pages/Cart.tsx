import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, ShoppingCart, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { formatCurrency } from '../utils/format';
import { getCategoryMeta, categoryIconMap } from '../utils/catalog';
import { useMemo, useState } from 'react';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');

  const detailedItems = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) {
            return null;
          }

          return {
            ...item,
            product,
            lineTotal: product.price * item.quantity,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    [cartItems],
  );

  const subtotal = detailedItems.reduce((total, item) => total + item.lineTotal, 0);
  const discount = appliedCode === 'VOLT10' ? subtotal * 0.1 : 0;
  const vat = (subtotal - discount) * 0.15;
  const total = subtotal - discount + vat;

  if (detailedItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-[34px] border border-slate-200 bg-white px-6 py-20 text-center shadow-card">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-accent-50 text-accent">
            <ShoppingCart size={34} />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-slate-950">سلتك فارغة</h1>
          <p className="mt-3 text-sm text-slate-500">
            ابدأ بإضافة بعض المنتجات لتظهر هنا وتكتمل تجربة الشراء.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-white"
          >
            العودة إلى المتجر
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.75fr]">
        <section className="space-y-4">
          {detailedItems.map((item) => {
            const category = getCategoryMeta(item.product.category);
            const Icon = categoryIconMap[category.iconKey];

            return (
              <article
                key={item.productId}
                className="grid gap-5 rounded-[30px] border border-slate-200 bg-white p-5 shadow-card md:grid-cols-[140px_1fr]"
              >
                <div className={`flex h-36 items-center justify-center rounded-[24px] bg-gradient-to-br ${category.accent} text-white`}>
                  <Icon size={48} />
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">{item.product.name}</h2>
                      <p className="mt-2 text-sm text-slate-400">
                        {item.product.sku} • {item.product.brand}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="rounded-2xl border border-rose-200 p-3 text-rose-500 transition hover:bg-rose-50"
                      aria-label="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-slate-400">سعر الوحدة</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatCurrency(item.product.price)}
                      </p>
                    </div>
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(nextValue) => updateQuantity(item.productId, nextValue)}
                      max={Math.max(1, item.product.stockQuantity)}
                    />
                    <div className="text-left">
                      <p className="text-sm text-slate-400">الإجمالي</p>
                      <p className="mt-1 text-xl font-extrabold text-slate-950">
                        {formatCurrency(item.lineTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-accent">
            <ArrowLeft size={16} />
            متابعة التسوق
          </Link>
        </section>

        <aside>
          <div className="sticky top-36 rounded-[30px] border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-2xl font-extrabold text-slate-950">ملخص الطلب</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>المجموع الفرعي</span>
                <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>الشحن</span>
                <span className="font-bold text-emerald-600">مجاني</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>الخصم</span>
                <span className="font-bold text-slate-900">{formatCurrency(discount)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>ضريبة القيمة المضافة 15%</span>
                <span className="font-bold text-slate-900">{formatCurrency(vat)}</span>
              </div>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">الإجمالي</span>
              <span className="text-2xl font-extrabold text-slate-950">{formatCurrency(total)}</span>
            </div>

            <div className="mt-6 flex gap-3">
              <input
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
                placeholder="كود الخصم"
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
              <Button
                variant="secondary"
                onClick={() => setAppliedCode(promoCode === 'VOLT10' ? 'VOLT10' : '')}
              >
                تطبيق
              </Button>
            </div>
            {appliedCode === 'VOLT10' ? (
              <p className="mt-3 text-sm font-bold text-emerald-600">تم تطبيق خصم 10% بنجاح</p>
            ) : promoCode.length > 0 ? (
              <p className="mt-3 text-sm text-slate-400">استخدم الكود التجريبي: VOLT10</p>
            ) : null}

            <Button fullWidth className="mt-6">
              إتمام الطلب
            </Button>

            <div className="mt-6 rounded-[24px] bg-slate-50 p-4">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
                <LockKeyhole size={16} className="text-emerald-500" />
                دفع محمي وآمن
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'STC Pay', 'Mada'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
