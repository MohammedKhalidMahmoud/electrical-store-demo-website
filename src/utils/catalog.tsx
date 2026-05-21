import {
  Cable,
  Gauge,
  Heart,
  Lightbulb,
  PanelTop,
  PlugZap,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { categories } from '../data/categories';
import type { CategorySlug, Product, StockStatus } from '../types';

export const categoryIconMap: Record<string, LucideIcon> = {
  Cable,
  PanelTop,
  Lightbulb,
  ShieldCheck,
  PlugZap,
  Gauge,
  Heart,
};

export const getCategoryMeta = (slug: CategorySlug) =>
  categories.find((category) => category.slug === slug) ?? categories[0];

export const getProductDiscountPercent = (product: Product) => {
  if (!product.originalPrice || product.originalPrice <= product.price) {
    return 0;
  }

  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
};

export const getStockLabel = (status: StockStatus) => {
  switch (status) {
    case 'available':
      return 'متوفر';
    case 'limited':
      return 'كمية محدودة';
    case 'out':
      return 'غير متوفر';
    default:
      return '';
  }
};
