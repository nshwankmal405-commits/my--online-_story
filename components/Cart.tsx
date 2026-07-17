"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isCartOpen);
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="absolute left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slideInLeft flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-brand-600" />
            <h2 className="text-xl font-bold">سلة التسوق</h2>
            <span className="bg-brand-100 text-brand-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-20 h-20 text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">السلة فارغة</h3>
              <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات بعد</p>
              <Link
                href="/products"
                onClick={() => setIsCartOpen(false)}
                className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors inline-flex items-center gap-2"
              >
                تصفح المنتجات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-3 bg-gray-50 rounded-xl animate-scaleIn"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      المقاس: {item.size} | اللون: {item.color}
                    </p>
                    <p className="text-brand-600 font-bold mt-1">
                      {parseFloat(item.price) * item.quantity} ريال
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-white rounded-lg border">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors text-xs"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-5 space-y-4 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>المجموع الفرعي</span>
                <span>{totalPrice.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>الشحن</span>
                <span className={totalPrice >= 200 ? "text-green-600" : ""}>
                  {totalPrice >= 200 ? "مجاني" : "25 ريال"}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>الإجمالي</span>
                <span className="text-brand-600">
                  {(totalPrice + (totalPrice >= 200 ? 0 : 25)).toFixed(2)} ريال
                </span>
              </div>
            </div>
            {totalPrice < 200 && (
              <p className="text-xs text-center text-orange-600 bg-orange-50 py-2 rounded-lg">
                أضف {(200 - totalPrice).toFixed(0)} ريال للحصول على شحن مجاني!
              </p>
            )}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold text-center hover:bg-brand-700 transition-colors"
            >
              إتمام الشراء
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center text-sm text-gray-500 hover:text-brand-600 transition-colors"
            >
              متابعة التسوق
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
