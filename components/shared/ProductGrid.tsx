"use client"
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { ProductAttribute } from '@/types/actionTypes';
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
const products = [
    {
        id: 1,
        imageUrl: "https://cdnmm.azureedge.net/e8a0ce94-06ad-4670-bdd1-bdec85fc1fa7.jpg",
        tag: "-25%",
        brand: "Tefal",
        title: "Tefal Air Fryer, 4.2L, 1500W",
          description: "Enjoy crispy and tasty fried food with little to no oil. Its XL 4.2L capacity is perfect for the whole family. Not just for frying, it can also grill, roast and bake all your favorite recipes in no time.",
        rating: 4.5,
        reviewCount: 120,
        newPrice: "899 DH",
        oldPrice: "1,199 DH",
    },
    {
        id: 2,
        imageUrl: "https://cdnmm.azureedge.net/AAAMW72417-0002_img1.jpg",
        tag: "-15%",
        brand: "Samsung",
        title: "Samsung Galaxy S23 Ultra, 256GB, Phantom Black",
          description: "Enjoy crispy and tasty fried food with little to no oil. Its XL 4.2L capacity is perfect for the whole family. Not just for frying, it can also grill, roast and bake all your favorite recipes in no time.",
        rating: 5,
        reviewCount: 310,
        newPrice: "12,499 DH",
        oldPrice: "14,799 DH",
    },
    {
        id: 3,
        imageUrl: "https://cdnmm.azureedge.net/NEW1696354495630_img1.jpg",
        brand: "Sony",
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        rating: 4.8,
          description: "Enjoy crispy and tasty fried food with little to no oil. Its XL 4.2L capacity is perfect for the whole family. Not just for frying, it can also grill, roast and bake all your favorite recipes in no time.",
        reviewCount: 890,
        newPrice: "3,790 DH",
        oldPrice: "4,200 DH",
    },
    {
        id: 4,
        imageUrl: "https://cdnmm.azureedge.net/AAAAW61172_img1.jpg",
        tag: "-20%",
        brand: "LG",
          description: "Enjoy crispy and tasty fried food with little to no oil. Its XL 4.2L capacity is perfect for the whole family. Not just for frying, it can also grill, roast and bake all your favorite recipes in no time.",
        title: "LG 55-inch OLED 4K UHD Smart TV",
        rating: 4.7,
        reviewCount: 450,
        newPrice: "11,999 DH",
        oldPrice: "14,999 DH",
    },
    {
        id: 5,
        imageUrl: "https://cdnmm.azureedge.net/ESS4250947516027_img1.jpg",
        brand: "Nespresso",
          description: "Enjoy crispy and tasty fried food with little to no oil. Its XL 4.2L capacity is perfect for the whole family. Not just for frying, it can also grill, roast and bake all your favorite recipes in no time.",
        title: "Nespresso Vertuo Next Coffee and Espresso Machine",
        rating: 4.6,
        reviewCount: 230,
        newPrice: "1,450 DH",
        oldPrice: "1,600 DH",
    },
     {
        id: 6,
        imageUrl: "https://cdnmm.azureedge.net/AAAQF33549_img1.jpg",
        brand: "Nespresso",
        title: "Nespresso Vertuo Next Coffee and Espresso Machine",
        rating: 4.6,
        reviewCount: 230,
        newPrice: "1,450 DH",
        oldPrice: "1,600 DH",
    }
];


const ProductGrid: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        document.body.style.overflow = 'unset'; // Restore background scroll
    };

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-24 md:-mt-36 lg:-mt-64 relative z-10">
                <div className="bg-white p-4 rounded-t-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800">Today's Deals</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-gray-200">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product}
                            onQuickViewClick={() => handleQuickView(product)}
                        />
                    ))}
                </div>
            </main>
            <QuickViewModal 
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default ProductGrid;