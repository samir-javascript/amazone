
import React from 'react';
import { HeartIcon, StarIcon } from './icons';

interface ProductCardProps {
  imageUrl: string;
  tag?: string;
  brand: string;
  title: string;
  rating: number;
  description?:string;
  reviewCount: number;
  newPrice: number;
  oldPrice: string;
  onQuickViewClick: () => void;
  onRemove?: (productId:number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  tag,
  brand,
  title,
  description,
  rating,
  reviewCount,
  newPrice,
  oldPrice,
  onQuickViewClick,
}) => {
  return (
    <div className="bg-white p-4 flex flex-col group transition-shadow duration-300 hover:shadow-xl">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-contain mb-4" />
        {tag && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            {tag}
          </div>
        )}
        <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-300 opacity-0 group-hover:opacity-100 z-10">
            <HeartIcon className="w-5 h-5" />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
                onClick={(e) => {
                    e.stopPropagation(); 
                    onQuickViewClick();
                }}
                className="bg-white text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
                Quick View
            </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <p className="text-xs text-gray-500 mb-1">{brand}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 h-10 line-clamp-2">{title}</h3>
        <div className="flex items-center mt-auto mb-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
        </div>
        <div className="flex items-baseline mb-3">
            <span className="text-lg font-bold text-red-600 mr-2">{newPrice}</span>
            <span className="text-sm text-gray-500 line-through">{oldPrice}</span>
        </div>
         <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md transition-colors duration-300 text-sm">
            Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
// import { Product } from '@/app/(root)/browsing-history/page';
// import React from 'react';
// import StarRating from './StarRating';


// interface ProductCardProps {
//     product: Product;
//     onRemove: (productId: number) => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
//     return (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-full">
//             <a href="#" className="flex-shrink-0 mb-4 h-48 flex items-center justify-center">
//                 <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain" />
//             </a>
//             <div className="flex-grow flex flex-col">
//                 <a href="#" className="text-sm text-blue-600 hover:underline hover:text-orange-700 mb-1 flex-grow" title={product.name}>
//                    {product.name.length > 80 ? `${product.name.substring(0, 80)}...` : product.name}
//                 </a>
//                 <div className="flex items-center my-1">
//                     <StarRating rating={product.rating} />
//                     <a href="#" className="ml-2 text-xs text-blue-600 hover:underline">{product.reviewCount.toLocaleString()}</a>
//                 </div>
//                 <div className="my-1">
//                     <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
//                 </div>
//                 <button className="w-full mt-auto mb-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm rounded-lg py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
//                     Add to Cart
//                 </button>
//                  <button onClick={() => onRemove(product.id)} className="w-full text-xs text-blue-600 hover:underline text-center">
//                     Remove from view
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;