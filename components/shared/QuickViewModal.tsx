
import React from 'react';
import { CloseIcon, StarIcon } from './icons';

interface Product {
  id: number;
  imageUrl: string;
  tag?: string;
  brand: string;
  title: string;
  description?:string;
  rating: number;
  reviewCount: number;
  newPrice: string;
  oldPrice: string;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10"
          aria-label="Close quick view"
        >
          <CloseIcon />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-8 flex justify-center items-center bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-[70vh] md:max-h-full object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-gray-700 mb-6 grow">{product.description}</p>

          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold text-red-600 mr-3">{product.newPrice}</span>
            <span className="text-lg text-gray-500 line-through">{product.oldPrice}</span>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-md transition-colors duration-300 text-base">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;