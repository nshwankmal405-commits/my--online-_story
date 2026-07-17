"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  ArrowLeft,
  Trophy,
  Shirt,
  Footprints,
  Dumbbell,
  BadgeCheck,
  Zap,
  TrendingUp,
  ChevronLeft,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

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

const categories = [
  { name: "القمصان", href: "/products?category=shirts", icon: <Shirt className="w-8 h-8" />, color: "from-blue-500 to-blue-700", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400" },
  { name: "الأحذية", href: "/products?category=shoes", icon: <Footprints className="w-8 h-8" />, color: "from-red-500 to-red-700", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "ملابس التدريب", href: "/products?category=training", icon: <Dumbbell className="w-8 h-8" />, color: "from-green-500 to-green-700", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
  { name: "الإكسسوارات", href: "/products?category=accessories", icon: <BadgeCheck className="w-8 h-8" />, color: "from-purple-500 to-purple-700", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { name: "الملابس الخارجية", href: "/products?category=outerwear", icon: <Trophy className="w-8 h-8" />, color: "from-orange-500 to-orange-700", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featuredRes, bestRes, newRes] = await Promise.all([
          fetch("/api/products?featured=true&limit=4"),
          fetch("/api/products?bestSeller=true&limit=4"),
          fetch("/api/products?isNew=true&limit=4"),
        ]);
        const featuredData = await featuredRes.json();
        const bestData = await bestRes.json();
        const newData = await newRes.json();
        setFeaturedProducts(featuredData.products || []);
        setBestSellers(bestData.products || []);
        setNewArrivals(newData.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} />
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 text-gold-400" />
                <span>مجموعة 2025 الجديدة متوفرة الآن</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                أطلق العنان
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                  لأدائك الرياضي
                </span>
              </h1>
              <p className="text-lg text-brand-200 mb-8 leading-relaxed max-w-lg">
                اكتشف تشكيلة واسعة من الملابس والأحذية الرياضية الاحترافية. جودة عالمية وتصاميم عصرية تناسب كل رياضي.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="bg-white text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-lg shadow-white/20"
                >
                  تسوق الآن
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href="/products?featured=true"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  الأكثر مبيعاً
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[
                  { label: "منتج متوفر", value: "500+" },
                  { label: "عميل سعيد", value: "10K+" },
                  { label: "علامة تجارية", value: "50+" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm text-brand-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex justify-center animate-fadeInUp stagger-2">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800"
                    alt="Sports Collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                    alt="Sports Shoes"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -left-4 bg-gold-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg animate-float">
                  🔥 خصم حتى 40%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronLeft className="w-8 h-8 text-white/50 rotate-90" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">تسوق حسب الفئة</h2>
            <p className="text-gray-500 text-lg">اختر الفئة المفضلة لديك واكتشف أحدث المنتجات</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl aspect-square md:aspect-[3/4]"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className="mb-3 transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform">{cat.icon}</div>
                  <h3 className="text-lg md:text-xl font-black">{cat.name}</h3>
                  <div className="mt-2 w-8 h-0.5 bg-white/50 group-hover:w-12 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">منتجات مميزة</h2>
              <p className="text-gray-500">أفضل المنتجات المختارة بعناية لك</p>
            </div>
            <Link
              href="/products?featured=true"
              className="text-brand-600 font-bold flex items-center gap-1 hover:text-brand-700 transition-colors"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
                    <div className="aspect-[3/4] bg-gray-200 skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                      <div className="h-3 bg-gray-200 rounded skeleton w-1/2" />
                      <div className="h-6 bg-gray-200 rounded skeleton w-1/3" />
                    </div>
                  </div>
                ))
              : featuredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-800 p-8 md:p-12">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)`,
                backgroundSize: "30px 30px"
              }} />
            </div>
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-gold-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  عرض محدود
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  خصم 30% على جميع الأحذية
                </h2>
                <p className="text-brand-200 mb-6 text-lg">
                  استغل الفرصة واحصل على أفضل الأحذية الرياضية بأسعار لا تُقاوم. العرض ينتهي قريباً!
                </p>
                <Link
                  href="/products?category=shoes"
                  className="bg-white text-brand-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  تسوق الأحذية
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
              <div className="hidden md:flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600"
                  alt="Shoes Sale"
                  className="w-80 h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">الأكثر مبيعاً</h2>
              <p className="text-gray-500">المنتجات الأكثر طلباً من عملائنا</p>
            </div>
            <Link
              href="/products?bestSeller=true"
              className="text-brand-600 font-bold flex items-center gap-1 hover:text-brand-700 transition-colors"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
                    <div className="aspect-[3/4] bg-gray-200 skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                      <div className="h-3 bg-gray-200 rounded skeleton w-1/2" />
                      <div className="h-6 bg-gray-200 rounded skeleton w-1/3" />
                    </div>
                  </div>
                ))
              : bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">وصل حديثاً</h2>
              <p className="text-gray-500">أحدث المنتجات المضافة للمتجر</p>
            </div>
            <Link
              href="/products?isNew=true"
              className="text-brand-600 font-bold flex items-center gap-1 hover:text-brand-700 transition-colors"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
                    <div className="aspect-[3/4] bg-gray-200 skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                      <div className="h-3 bg-gray-200 rounded skeleton w-1/2" />
                      <div className="h-6 bg-gray-200 rounded skeleton w-1/3" />
                    </div>
                  </div>
                ))
              : newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-16 bg-brand-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { icon: <Truck className="w-10 h-10 mx-auto mb-4 text-brand-400" />, title: "شحن مجاني", desc: "للطلبات فوق 200 ريال" },
              { icon: <Shield className="w-10 h-10 mx-auto mb-4 text-brand-400" />, title: "ضمان الجودة", desc: "منتجات أصلية 100%" },
              { icon: <RotateCcw className="w-10 h-10 mx-auto mb-4 text-brand-400" />, title: "إرجاع سهل", desc: "خلال 30 يوم" },
              { icon: <Headphones className="w-10 h-10 mx-auto mb-4 text-brand-400" />, title: "دعم 24/7", desc: "فريق دعم متخصص" },
            ].map((feat, i) => (
              <div key={i} className="group">
                <div className="transform group-hover:scale-110 transition-transform">{feat.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                <p className="text-brand-300 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">هل تحتاج مساعدة؟</h2>
            <p className="text-gray-500 text-lg">فريقنا جاهز لمساعدتك على مدار الساعة</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="tel:+966712641249"
              className="group bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Phone className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-2">اتصل بنا</h3>
              <p className="text-brand-200 text-lg font-bold" dir="ltr">+966 71 264 1249</p>
              <p className="text-brand-300 text-sm mt-2">متاحون يومياً من 9 ص - 11 م</p>
            </a>
            <a
              href="https://wa.me/966712641249"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-2">واتساب</h3>
              <p className="text-green-200 text-lg font-bold">تواصل عبر الواتساب</p>
              <p className="text-green-300 text-sm mt-2">رد فوري خلال دقائق</p>
            </a>
            <a
              href="mailto:aymnalahdl31@gmail.com"
              className="group bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-8 text-white text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Mail className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black mb-2">البريد الإلكتروني</h3>
              <p className="text-orange-200 text-sm font-bold break-all">aymnalahdl31@gmail.com</p>
              <p className="text-orange-300 text-sm mt-2">نرد خلال 24 ساعة</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Truck(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" /><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><path d="M15 18H9" /><circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function Shield(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function RotateCcw(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
    </svg>
  );
}

function Headphones(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
