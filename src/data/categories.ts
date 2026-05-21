import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'cables',
    name: 'كابلات',
    description: 'كابلات نحاسية ومرنة للمشاريع السكنية والتجارية.',
    iconKey: 'Cable',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    id: 'cat-2',
    slug: 'switches',
    name: 'مفاتيح',
    description: 'مفاتيح ولوحات وتشطيبات أنيقة بجودة عالية.',
    iconKey: 'PanelTop',
    accent: 'from-violet-500 to-indigo-600',
  },
  {
    id: 'cat-3',
    slug: 'lighting',
    name: 'إضاءة',
    description: 'إنارة LED اقتصادية للمنازل والمحال والمكاتب.',
    iconKey: 'Lightbulb',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    id: 'cat-4',
    slug: 'breakers',
    name: 'قواطع',
    description: 'قواطع حماية معتمدة للأحمال المختلفة.',
    iconKey: 'ShieldCheck',
    accent: 'from-emerald-500 to-green-600',
  },
  {
    id: 'cat-5',
    slug: 'sockets',
    name: 'مآخذ',
    description: 'مقابس وتوصيلات ومشتركات عملية وآمنة.',
    iconKey: 'PlugZap',
    accent: 'from-rose-500 to-pink-500',
  },
  {
    id: 'cat-6',
    slug: 'meters',
    name: 'أجهزة قياس',
    description: 'أجهزة اختبار وقياس للفنيين وفرق الصيانة.',
    iconKey: 'Gauge',
    accent: 'from-slate-500 to-slate-700',
  },
];

export const navLinks = [
  ...categories.map((category) => ({
    label: category.name,
    href: `/products?category=${category.slug}`,
    slug: category.slug,
  })),
  {
    label: 'عروض',
    href: '/products?sale=true',
    slug: 'offers',
  },
] as const;
