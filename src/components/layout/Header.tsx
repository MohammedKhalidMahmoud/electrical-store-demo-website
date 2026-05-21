import { Bolt, Heart, Search, ShoppingCart, UserCircle2 } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/categories';
import { CategoryNav } from './CategoryNav';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlistIds } = useCart();
  const [compact, setCompact] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') ?? '');
    setSelectedCategory(params.get('category') ?? 'all');
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setCompact(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('q', query.trim());
    }

    if (selectedCategory !== 'all') {
      params.append('category', selectedCategory);
    }

    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className={`transition-all duration-200 ${compact ? 'py-3' : 'py-4'}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/products?wishlist=1"
              className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              aria-label="المفضلة"
            >
              <Heart size={19} />
              {wishlistIds.length > 0 ? (
                <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
                  {wishlistIds.length}
                </span>
              ) : null}
            </Link>

            <Link
              to="/cart"
              className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              aria-label="السلة"
            >
              <ShoppingCart size={19} />
              {cartCount > 0 ? (
                <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              aria-label="الحساب"
            >
              <UserCircle2 size={19} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="hidden flex-1 items-center rounded-[22px] border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm lg:flex"
          >
            <button
              type="submit"
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-400 transition hover:bg-white hover:text-accent"
              aria-label="بحث"
            >
              <Search size={19} />
            </button>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن كابلات، قواطع، إنارة، أو أي مادة كهربائية"
              className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
            />
            <div className="h-8 w-px bg-slate-200" />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="all">كل الفئات</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </form>

          <Link to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
              <Bolt size={22} />
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight text-slate-950">VoltStore</p>
              <p className="text-xs text-slate-400">مواد كهربائية باحتراف</p>
            </div>
          </Link>
        </div>

        <div className="mx-auto mt-4 max-w-7xl px-4 lg:hidden md:px-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-[22px] border border-slate-200 bg-slate-50 p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Search size={18} className="text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث عن منتجات كهربائية"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="flex-1 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 outline-none"
              >
                <option value="all">كل الفئات</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-2xl bg-accent px-5 py-3 text-sm font-bold text-white"
              >
                بحث
              </button>
            </div>
          </form>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
