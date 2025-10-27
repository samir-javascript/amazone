import React from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <StarIcon key={`full-${i}`} className="text-yellow-500" />
            ))}
            {/* Note: Simplified to full stars for this example */}
            {[...Array(maxRating - fullStars)].map((_, i) => (
                 <StarIcon key={`empty-${i}`} className="text-gray-300" />
            ))}
        </div>
    );
};

export default StarRating;