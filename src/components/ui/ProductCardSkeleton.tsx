export function ProductCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-card">
          <div className="h-52 animate-pulse-soft rounded-[24px] bg-slate-100" />
          <div className="mt-4 h-3 w-20 animate-pulse-soft rounded-full bg-slate-100" />
          <div className="mt-3 h-5 w-4/5 animate-pulse-soft rounded-full bg-slate-100" />
          <div className="mt-2 h-5 w-3/5 animate-pulse-soft rounded-full bg-slate-100" />
          <div className="mt-4 h-4 w-28 animate-pulse-soft rounded-full bg-slate-100" />
          <div className="mt-4 h-10 animate-pulse-soft rounded-2xl bg-slate-100" />
        </div>
      ))}
    </>
  );
}
