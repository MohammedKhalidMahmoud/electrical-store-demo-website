import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../data/categories';

export function CategoryNav() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const activeCategory = search.get('category');
  const isSaleActive = search.get('sale') === 'true';

  return (
    <div className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 md:px-6">
        <div className="flex min-w-max items-center gap-6 py-3 text-sm font-bold text-slate-600">
          {navLinks.map((item) => {
            const isActive =
              (item.slug === 'offers' && isSaleActive) || activeCategory === item.slug;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group relative whitespace-nowrap pb-2 transition hover:text-accent ${isActive ? 'text-accent' : ''}`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 rounded-full bg-accent transition-all duration-200 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
