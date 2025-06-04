"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface ProductData {
  id: number;
  name: string;
  description?: string;
  price?: string;
  image?: string | null;
}

interface ProductCardProps {
  product: ProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="aspect-square bg-gray-50 rounded-lg mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center overflow-hidden relative">
          <Image
            src={`/${product.image}`}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <h3 className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base leading-tight">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              {product.description}
            </p>
          )}
          {product.price && (
            <p className="text-xs sm:text-sm text-gray-900 font-medium">
              {product.price}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
