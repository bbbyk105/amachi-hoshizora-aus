// src/app/(top-page)/Product.tsx
"use client";
import React from "react";
import { LegacyProductData } from "@/types/products";
import { ProductCard } from "./ProductCard";

interface ProductProps {
  productsData: LegacyProductData[];
}

export const Product: React.FC<ProductProps> = ({ productsData }) => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-6 sm:mb-8 lg:mb-12 border-b border-gray-300 pb-3 sm:pb-4">
          PRODUCT
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
