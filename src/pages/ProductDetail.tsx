import { Link, useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { StarRating } from '../components/ui/StarRating';
import { categoryIconMap, getCategoryMeta, getStockLabel } from '../utils/catalog';
import { formatCurrency } from '../utils/format';
import { useState } from 'react';
import type { ProductTab } from '../types';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>('details');
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-[30px] border border-slate-200 bg-white px-6 py-16 text-center shadow-card">
          <h1 className="text-2xl font-extrabold text-slate-900">المنتج غير موجود</h1>
          <p className="mt-3 text-sm text-slate-500">ربما تم تغيير الرابط أو إزالة المنتج من العرض التجريبي.</p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-2xl bg-accent px-5 py-3 text-sm font-bold text-white"
          >
            العودة إلى المنتجات
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryMeta(product.category);
  const Icon = categoryIconMap[category.iconKey];
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product.id, quantity, product.name);
    navigate('/cart');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumb
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المنتجات', href: '/products' },
          { label: category.name, href: `/products?category=${category.slug}` },
          { label: product.name },
        ]}
      />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className={`overflow-hidden rounded-[34px] bg-gradient-to-br ${category.accent} p-6 text-white shadow-soft`}>
            <div className="flex min-h-[460px] items-center justify-center rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-sm">
              <Icon size={124} className="opacity-90" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`flex h-24 items-center justify-center rounded-[22px] border border-white/10 bg-gradient-to-br ${category.accent} text-white ${index === 0 ? 'opacity-100' : 'opacity-60'}`}
              >
                <Icon size={34} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-card lg:p-8">
          <p className="text-sm font-bold text-accent">{category.name}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 lg:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>العلامة التجارية: <strong className="text-slate-800">{product.brand}</strong></span>
            <span>SKU: <strong className="text-slate-800">{product.sku}</strong></span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className="text-sm font-bold text-accent transition hover:text-accent-600"
            >
              عرض التقييمات
            </button>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-extrabold text-slate-950">{formatCurrency(product.price)}</span>
            {product.originalPrice ? (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            ) : null}
          </div>

          <div className="mt-5">
            <Badge
              tone={
                product.stockStatus === 'available'
                  ? 'green'
                  : product.stockStatus === 'limited'
                    ? 'yellow'
                    : 'red'
              }
            >
              {getStockLabel(product.stockStatus)}
            </Badge>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-slate-900">الكمية</p>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={Math.max(1, product.stockQuantity)}
            />
          </div>

          <div className="mt-6 space-y-3">
            <Button
              fullWidth
              onClick={() => addToCart(product.id, quantity, product.name)}
              disabled={product.stockStatus === 'out'}
              className="disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              أضف إلى السلة
            </Button>
            <Button fullWidth variant="secondary" onClick={handleBuyNow}>
              اشتري الآن
            </Button>
          </div>

          <div className="my-8 h-px bg-slate-100" />

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4">
              <Truck size={18} className="mt-1 text-accent" />
              <div>
                <p className="font-bold text-slate-900">الشحن</p>
                <p className="mt-1 text-sm text-slate-500">يصلك خلال 2-4 أيام عمل داخل المدن الرئيسية.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4">
              <RotateCcw size={18} className="mt-1 text-accent" />
              <div>
                <p className="font-bold text-slate-900">سياسة الإرجاع</p>
                <p className="mt-1 text-sm text-slate-500">إرجاع مجاني خلال 14 يوم على المنتجات غير المستخدمة.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4">
              <ShieldCheck size={18} className="mt-1 text-accent" />
              <div>
                <p className="font-bold text-slate-900">الضمان</p>
                <p className="mt-1 text-sm text-slate-500">ضمان سنة على الأعطال المصنعية حسب نوع المنتج.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-[34px] border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-wrap gap-3 border-b border-slate-100 pb-5">
          {[
            { id: 'details', label: 'التفاصيل' },
            { id: 'specs', label: 'المواصفات' },
            { id: 'reviews', label: 'التقييمات' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ProductTab)}
              className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${activeTab === tab.id ? 'bg-accent text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'details' ? (
          <div className="pt-6 text-sm leading-9 text-slate-600">
            <p>{product.description}</p>
            <p className="mt-4">
              تم اختيار هذا المنتج ضمن العرض التجريبي ليعكس طريقة عرض مريحة وواضحة للمستخدم،
              مع إبراز المواصفات الأساسية ومزايا الشحن والإرجاع والضمان بشكل مقنع.
            </p>
          </div>
        ) : null}

        {activeTab === 'specs' ? (
          <div className="pt-6">
            <div className="overflow-hidden rounded-[24px] border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
                <tbody className="divide-y divide-slate-100">
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td className="bg-slate-50 px-5 py-4 text-sm font-bold text-slate-800">{spec.label}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {activeTab === 'reviews' ? (
          <div className="space-y-4 pt-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="rounded-[24px] border border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{review.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{review.date}</p>
                  </div>
                  <Badge tone="yellow">{`${review.rating} ★`}</Badge>
                </div>
                <p className="mt-4 text-sm leading-8 text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <p className="text-sm font-bold text-accent">اقتراحات مشابهة</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">منتجات مشابهة</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}
