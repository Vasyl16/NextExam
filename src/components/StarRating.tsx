// components/StarRating.tsx
'use client';

import StarRatings from 'react-star-ratings';

export const StarRating = ({ rating }: { rating: number }) => (
  <StarRatings
    rating={rating}
    starRatedColor="#fbbf24"
    numberOfStars={10}
    starDimension="20px"
    starSpacing="2px"
    name="rating"
  />
);
