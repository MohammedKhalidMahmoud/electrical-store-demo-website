import { ArrowLeft, ChevronLeft, ShieldCheck, Truck, WalletCards, RotateCcw, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { categoryIconMap } from '../utils/catalog';
import { formatNumber } from '../utils/format';
import { ProductCard } from '../components/ui/ProductCard';

const trustBadges = [
  { label: 'شحن سريع', icon: Truck },
  { label: 'ضمان الجودة', icon: ShieldCheck },
  { label: 'دفع آمن', icon: WalletCards },
  { label: 'إرجاع مجاني', icon: RotateCcw },
];

export function Home() {
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 6);
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 4);

  return (
    <div className="animate-fade-up">
      <section className="mx-auto mt-6 max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-l from-ink-950 via-[#0A1B46] to-accent bg-hero-glow text-white shadow-soft">
          <div className="grid gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-14 lg:py-14">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/90">
                <Zap size={16} />
                تجهيزات موثوقة للمشاريع والأعمال اليومية
              </span>
              <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                كل ما تحتاجه من مواد كهربائية في مكان واحد
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                من الكابلات والقواطع إلى الإنارة وأجهزة القياس، استعرض تشكيلة مختارة بعرض
                متجري عصري مصمم لإقناع العميل من أول زيارة.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-ink-950 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  تسوق الآن
                  <ArrowLeft size={17} />
                </Link>
                <Link
                  to="/products?sale=true"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:bg-white/15"
                >
                  اكتشف العروض
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <p className="text-xs font-bold text-white/70">{product.brand}</p>
                  <h3 className="mt-3 text-lg font-bold leading-8">{product.name}</h3>
                  <p className="mt-4 text-sm text-white/70">{product.sku}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 rounded-[28px] bg-white p-4 shadow-card md:grid-cols-4">
          {trustBadges.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-accent">
                <Icon size={19} />
              </div>
              <span className="font-bold text-slate-800">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-accent">الأقسام الرئيسية</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">تسوق حسب الفئة</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIconMap[category.iconKey];
            const count = products.filter((product) => product.category === category.slug).length;

            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group rounded-[30px] border border-slate-200 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-l ${category.accent} text-white shadow-lg`}>
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {formatNumber(count)} منتج
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-slate-900 transition group-hover:text-accent">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-8 text-slate-500">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-accent">ترشيحات المتجر</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">منتجات مميزة</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-accent transition hover:gap-3">
            عرض الكل
            <ChevronLeft size={16} />
          </Link>
        </div>
        <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-5 overflow-x-auto pb-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
        <div className="rounded-[34px] bg-[#F5C518] px-6 py-8 text-ink-950 shadow-soft md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold">تخفيضات محدودة</p>
              <h2 className="mt-2 text-3xl font-extrabold">عروض الأسبوع — خصم حتى 30%</h2>
            </div>
            <Link
              to="/products?sale=true"
              className="inline-flex items-center justify-center rounded-2xl bg-ink-950 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900"
            >
              تصفح العروض
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 md:px-6">
        <div className="mb-6">
          <p className="text-sm font-bold text-accent">الأكثر طلبًا</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">الأكثر مبيعاً</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
