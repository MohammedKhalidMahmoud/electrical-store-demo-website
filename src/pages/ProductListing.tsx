import { Grid2X2, List, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductCardSkeleton } from '../components/ui/ProductCardSkeleton';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';
import { products } from '../data/products';
import type { SortOption, ViewMode } from '../types';
import { formatCurrency, formatNumber } from '../utils/format';

const PRODUCTS_PER_PAGE = 9;

export function ProductListing() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isInWishlist } = useCart();
  const searchQuery = (searchParams.get('q') ?? '').trim();
  const saleOnly = searchParams.get('sale') === 'true';
  const wishlistOnly = searchParams.get('wishlist') === '1';
  const urlCategories = searchParams.getAll('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategories(urlCategories);
    setPage(1);
    setLoading(true);

    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, [location.search]);

  const uniqueBrands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))),
    [],
  );

  const filteredProducts = useMemo(() => {
    const nextProducts = products.filter((product) => {
      const matchesSearch =
        searchQuery.length === 0 ||
        product.name.includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesPrice = product.price <= maxPrice;
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesAvailability = !inStockOnly || product.stockStatus !== 'out';
      const matchesSale = !saleOnly || Boolean(product.originalPrice);
      const matchesWishlist = !wishlistOnly || isInWishlist(product.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesBrand &&
        matchesAvailability &&
        matchesSale &&
        matchesWishlist
      );
    });

    const sortedProducts = [...nextProducts];

    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((first, second) => first.price - second.price);
        break;
      case 'best-selling':
        sortedProducts.sort((first, second) => second.soldCount - first.soldCount);
        break;
      case 'newest':
      default:
        sortedProducts.sort((first, second) => Number(second.isNew) - Number(first.isNew));
        break;
    }

    return sortedProducts;
  }, [
    inStockOnly,
    isInWishlist,
    maxPrice,
    saleOnly,
    searchQuery,
    selectedBrands,
    selectedCategories,
    sortOption,
    wishlistOnly,
  ]);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE),
    [filteredProducts, page],
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const toggleCategory = (categorySlug: string) => {
    setPage(1);
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(categorySlug)
        ? currentCategories.filter((slug) => slug !== categorySlug)
        : [...currentCategories, categorySlug],
    );
  };

  const toggleBrand = (brand: string) => {
    setPage(1);
    setSelectedBrands((currentBrands) =>
      currentBrands.includes(brand)
        ? currentBrands.filter((item) => item !== brand)
        : [...currentBrands, brand],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMaxPrice(1000);
    setInStockOnly(false);
    setPage(1);

    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <Breadcrumb
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المنتجات' },
        ]}
      />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row-reverse">
        <aside className="lg:w-80">
          <div className="sticky top-36 rounded-[30px] border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-accent" />
                <h2 className="text-lg font-extrabold text-slate-900">تصفية النتائج</h2>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-bold text-accent transition hover:text-accent-600"
              >
                مسح الكل
              </button>
            </div>

            <div className="mt-6 space-y-7">
              <section>
                <h3 className="text-sm font-extrabold text-slate-900">الفئة</h3>
                <div className="mt-4 space-y-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center justify-between gap-3 text-sm text-slate-600">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.slug)}
                          onChange={() => toggleCategory(category.slug)}
                          className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
                        />
                        <span>{category.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">نطاق السعر</h3>
                  <span className="text-sm font-bold text-accent">{formatCurrency(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="5"
                  value={maxPrice}
                  onChange={(event) => {
                    setPage(1);
                    setMaxPrice(Number(event.target.value));
                  }}
                  className="mt-4 w-full accent-accent"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>0 ر.س</span>
                  <span>1000 ر.س</span>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-extrabold text-slate-900">العلامة التجارية</h3>
                <div className="mt-4 space-y-3">
                  {uniqueBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">المتوفر فقط</h3>
                    <p className="mt-1 text-xs text-slate-400">إخفاء المنتجات غير المتوفرة</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPage(1);
                      setInStockOnly((current) => !current);
                    }}
                    className={`relative h-7 w-12 rounded-full transition ${inStockOnly ? 'bg-accent' : 'bg-slate-300'}`}
                    aria-label="تبديل حالة التوفر"
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${inStockOnly ? 'right-6' : 'right-1'}`}
                    />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  عرض <span className="font-extrabold text-slate-900">{formatNumber(filteredProducts.length)}</span> نتيجة
                  {searchQuery ? ` لعبارة "${searchQuery}"` : ''}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {searchQuery ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-2 text-xs font-bold text-accent">
                      {searchQuery}
                      <X size={14} />
                    </span>
                  ) : null}
                  {saleOnly ? (
                    <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                      عروض فقط
                    </span>
                  ) : null}
                  {wishlistOnly ? (
                    <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
                      المفضلة
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value as SortOption)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر: من الأقل</option>
                  <option value="best-selling">الأكثر مبيعاً</option>
                </select>

                <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-xl p-2.5 transition ${viewMode === 'grid' ? 'bg-white text-accent shadow-sm' : 'text-slate-500'}`}
                    aria-label="عرض شبكي"
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`rounded-xl p-2.5 transition ${viewMode === 'list' ? 'bg-white text-accent shadow-sm' : 'text-slate-500'}`}
                    aria-label="عرض قائمة"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-6 grid gap-5 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {loading ? (
              <ProductCardSkeleton count={viewMode === 'grid' ? 6 : 4} />
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))
            ) : (
              <div className="col-span-full rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-card">
                <h3 className="text-xl font-extrabold text-slate-900">لا توجد نتائج مطابقة</h3>
                <p className="mt-3 text-sm text-slate-500">
                  جرّب تعديل الفلاتر أو توسيع نطاق السعر للحصول على نتائج أكثر.
                </p>
              </div>
            )}
          </div>

          {filteredProducts.length > PRODUCTS_PER_PAGE ? (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const currentPage = index + 1;
                return (
                  <button
                    key={currentPage}
                    type="button"
                    onClick={() => setPage(currentPage)}
                    className={`h-11 min-w-11 rounded-2xl px-4 text-sm font-bold transition ${page === currentPage ? 'bg-accent text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                  >
                    {currentPage}
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
