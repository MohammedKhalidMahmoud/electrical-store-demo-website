import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Star size={15} className="fill-amber-400 text-amber-400" />
      <span className="font-bold text-slate-800">{rating.toFixed(1)}</span>
      <span className="text-slate-400">({reviewCount})</span>
    </div>
  );
}
