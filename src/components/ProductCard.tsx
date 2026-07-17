"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string | null;
  images: string[];
  rating: string | null;
  reviewCount: number | null;
  isNew: boolean | null;
  isBestSeller: boolean | null;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0] || "M",
      color: product.colors[0] || "",
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={`product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 animate-fadeInUp stagger-${Math.min(index + 1, 6)}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-full h-full object-cover transition-transform duration-500"
        />
        <div className="product-overlay absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              جديد
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3" fill="currentColor" /> الأكثر مبيعاً
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-white text-brand-600 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-600 hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            أضف للسلة
          </button>
          <button className="bg-white p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors shadow-lg">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 text-gold-400" fill="currentColor" />
          <span className="text-sm font-medium">{product.rating || "4.5"}</span>
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-brand-600">{product.price} ريال</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice} ريال</span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 mt-3">
          {product.colors.slice(0, 4).map((color, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: getColorCode(color) }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-400 mr-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function getColorCode(color: string): string {
  const map: Record<string, string> = {
    "أسود": "#1a1a1a",
    "أبيض": "#ffffff",
    "أحمر": "#ef4444",
    "أزرق": "#3b82f6",
    "أخضر": "#22c55e",
    "أصفر": "#eab308",
    "رمادي": "#6b7280",
    "كحلي": "#1e3a5f",
    "برتقالي": "#f97316",
    "ذهبي": "#ca8a04",
    "فضي": "#94a3b8",
    "رمادي غامق": "#374151",
  };
  return map[color] || "#94a3b8";
}
