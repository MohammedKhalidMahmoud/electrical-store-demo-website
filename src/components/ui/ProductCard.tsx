import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product, ViewMode } from '../../types';
import { getCategoryMeta, getProductDiscountPercent, getStockLabel, categoryIconMap } from '../../utils/catalog';
import { formatCurrency } from '../../utils/format';
import { Badge } from './Badge';
import { Button } from './Button';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const category = getCategoryMeta(product.category);
  const Icon = categoryIconMap[category.iconKey];
  const isWished = isInWishlist(product.id);
  const discount = getProductDiscountPercent(product);
  const isList = viewMode === 'list';

  return (
    <article
      className={`group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft ${isList ? 'flex flex-col md:flex-row' : ''}`}
    >
      <div className={`relative ${isList ? 'md:w-72' : ''}`}>
        <Link
          to={`/products/${product.id}`}
          className={`relative block overflow-hidden ${isList ? 'h-full min-h-64' : 'h-64'}`}
        >
          <div className={`h-full bg-gradient-to-br ${category.accent} p-5 text-white`}>
            <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <span className="text-xs font-bold text-white/80">{category.name}</span>
              <div className="flex justify-center">
                <Icon size={72} className="opacity-90" />
              </div>
              <span className="text-left text-xs font-medium text-white/80">{product.sku}</span>
            </div>
          </div>
        </Link>

        {discount > 0 ? (
          <div className="absolute left-4 top-4">
            <Badge tone="red">{`خصم ${discount}%`}</Badge>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-4 top-4 rounded-full border border-white/40 bg-white/90 p-2.5 text-slate-600 shadow-sm transition hover:scale-105 hover:bg-white ${isWished ? 'text-rose-500' : ''}`}
          aria-label="إضافة للمفضلة"
        >
          <Heart size={18} className={isWished ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-slate-400">{product.brand}</p>
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

        <Link to={`/products/${product.id}`} className="mt-3">
          <h3 className="min-h-[3.5rem] text-base font-bold leading-7 text-slate-900 transition group-hover:text-accent [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-4 flex items-end gap-3">
          <span className="text-xl font-extrabold text-slate-900">{formatCurrency(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          ) : null}
        </div>

        <div className={`mt-auto pt-5 ${isList ? '' : 'opacity-0 transition duration-200 group-hover:opacity-100'}`}>
          <Button
            fullWidth
            onClick={() => addToCart(product.id, 1, product.name)}
            disabled={product.stockStatus === 'out'}
            className="gap-2 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ShoppingCart size={17} />
            أضف للسلة
          </Button>
        </div>
      </div>
    </article>
  );
}
