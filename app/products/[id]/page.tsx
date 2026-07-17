"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronLeft,
  Minus,
  Plus,
} from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface Product {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  price: string;
  originalPrice: string | null;
  category: string;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: string | null;
  reviewCount: number | null;
  isNew: boolean | null;
  isFeatured: boolean | null;
  isBestSeller: boolean | null;
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          fetch(`/api/products/${params.id}`),
          fetch(`/api/reviews?productId=${params.id}`),
        ]);
        const productData = await productRes.json();
        const reviewsData = await reviewsRes.json();
        setProduct(productData.product);
        setReviews(reviewsData.reviews || []);
        if (productData.product) {
          setSelectedSize(productData.product.sizes[0] || "");
          setSelectedColor(productData.product.colors[0] || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = product?.originalPrice
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-2xl skeleton" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl skeleton" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded skeleton w-3/4" />
            <div className="h-4 bg-gray-200 rounded skeleton w-1/4" />
            <div className="h-10 bg-gray-200 rounded skeleton w-1/3" />
            <div className="h-32 bg-gray-200 rounded skeleton" />
            <div className="h-12 bg-gray-200 rounded skeleton" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <Link href="/products" className="text-brand-600 font-bold hover:underline">
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <Link href="/products" className="hover:text-brand-600 transition-colors">المنتجات</Link>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === i ? "border-brand-600 ring-2 ring-brand-200" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.isNew && (
              <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">جديد</span>
            )}
            {product.isBestSeller && (
              <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" /> الأكثر مبيعاً
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">وفر {discount}%</span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${s <= Math.round(parseFloat(product.rating || "0")) ? "text-gold-400" : "text-gray-200"}`}
                  fill={s <= Math.round(parseFloat(product.rating || "0")) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="font-bold">{product.rating}</span>
            <span className="text-gray-500">({product.reviewCount} تقييم)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-black text-brand-600">{product.price} ريال</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">{product.originalPrice} ريال</span>
            )}
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-bold mb-3">اللون: <span className="font-normal text-gray-600">{selectedColor}</span></h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color ? "border-brand-600 ring-2 ring-brand-200 scale-110" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: getColorCode(color) }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">المقاس: <span className="font-normal text-gray-600">{selectedSize}</span></h3>
              <button className="text-sm text-brand-600 hover:underline">دليل المقاسات</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[50px] px-4 py-2.5 rounded-xl border font-bold text-sm transition-all ${
                    selectedSize === size
                      ? "bg-brand-600 text-white border-brand-600"
                      : "border-gray-200 hover:border-brand-400 hover:text-brand-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-bold mb-3">الكمية</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-xl">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-gray-100 rounded-r-xl"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="p-3 hover:bg-gray-100 rounded-l-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock} متوفر</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  تمت الإضافة
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  أضف للسلة - {(parseFloat(product.price) * quantity).toFixed(0)} ريال
                </>
              )}
            </button>
            <button className="p-4 border rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-4 border rounded-xl hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-1 text-brand-600" />
              <p className="text-xs text-gray-600">شحن مجاني</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-brand-600" />
              <p className="text-xs text-gray-600">ضمان الجودة</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-1 text-brand-600" />
              <p className="text-xs text-gray-600">إرجاع 30 يوم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex gap-8">
          {(["description", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-bold text-lg border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-brand-600 border-brand-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab === "description" ? "الوصف" : `التقييمات (${reviews.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      {activeTab === "description" && (
        <div className="max-w-3xl mb-16">
          <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h4 className="font-bold mb-3">المواصفات</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>العلامة التجارية</span>
                  <span className="font-medium">{product.brand}</span>
                </li>
                <li className="flex justify-between">
                  <span>الفئة</span>
                  <span className="font-medium">{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span>الألوان المتاحة</span>
                  <span className="font-medium">{product.colors.join("، ")}</span>
                </li>
                <li className="flex justify-between">
                  <span>المقاسات</span>
                  <span className="font-medium">{product.sizes.join("، ")}</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl">
              <h4 className="font-bold mb-3">مميزات المنتج</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  قماش عالي الجودة
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  تقنية امتصاص الرطوبة
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  تصميم مريح وعملي
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  مناسب للاستخدام اليومي والرياضي
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="max-w-3xl mb-16">
          {/* Rating Summary */}
          <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl mb-8">
            <div className="text-center">
              <p className="text-5xl font-black text-gray-900">{product.rating}</p>
              <div className="flex gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-gold-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{product.reviewCount} تقييم</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => r.rating === star).length;
                const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm w-12">{star} نجوم</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gold-400 h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 py-8">لا توجد تقييمات بعد لهذا المنتج</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-brand-700">{review.author[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{review.author}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">مشتري موثق</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= review.rating ? "text-gold-400" : "text-gray-200"}`}
                          fill={s <= review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <RelatedProducts categoryId={product.category} currentProductId={product.id} />
    </div>
  );
}

// Related Products Component
function RelatedProducts({ categoryId, currentProductId }: { categoryId: string; currentProductId: number }) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/products?category=${categoryId}&limit=4`)
      .then(res => res.json())
      .then(data => {
        setProducts((data.products || []).filter((p: any) => p.id !== currentProductId).slice(0, 4));
      })
      .catch(() => {});
  }, [categoryId, currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="border-t pt-12">
      <h2 className="text-2xl font-black mb-8">منتجات مشابهة</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((p: any) => (
          <Link key={p.id} href={`/products/${p.id}`} className="group">
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[3/4] mb-3">
              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="font-bold text-sm group-hover:text-brand-600 transition-colors truncate">{p.name}</h3>
            <p className="text-brand-600 font-bold">{p.price} ريال</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getColorCode(color: string): string {
  const map: Record<string, string> = {
    "أسود": "#1a1a1a", "أبيض": "#ffffff", "أحمر": "#ef4444", "أزرق": "#3b82f6",
    "أخضر": "#22c55e", "أصفر": "#eab308", "رمادي": "#6b7280", "كحلي": "#1e3a5f",
    "برتقالي": "#f97316", "ذهبي": "#ca8a04", "فضي": "#94a3b8", "رمادي غامق": "#374151",
  };
  return map[color] || "#94a3b8";
}
