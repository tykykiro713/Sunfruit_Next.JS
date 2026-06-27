interface StarRatingInlineProps {
  rating?: number;
  reviewCount?: number;
  className?: string;
  showCount?: boolean;
}

export default function StarRatingInline({
  rating = 5,
  reviewCount,
  className = '',
  showCount = true,
}: StarRatingInlineProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={`${rating} out of 5 stars${reviewCount ? `, ${reviewCount} reviews` : ''}`}
    >
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg
            key={i}
            className="h-5 w-5 text-yellow-400"
            fill={i < Math.round(rating) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .32-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
        {showCount && reviewCount ? ` · ${reviewCount.toLocaleString()} reviews` : ''}
      </span>
    </div>
  );
}
