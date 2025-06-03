"use client";

import Image from "next/image";
import { Product } from "@/types/products";
import { useCart } from "@/src/store/cart";
import { Button } from "@/components/ui/button"; // shadcn/ui想定
import { useState } from "react";
import { Icon } from "./Icon";
import { useToast } from "@/src/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product, 1);
      toast({
        title: "Added to Cart",
        description: `Added 1 x "${product.name}" to your cart.`,
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="relative w-full h-64">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, 640px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2 className="mt-4 text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-base font-semibold">€{product.price}</span>
        <Button onClick={handleAddToCart} disabled={isLoading}>
          {isLoading ? (
            <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
}
