"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react";

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

const categoryNames: Record<string, string> = {
  all: "جميع المنتجات",
  shirts: "القمصان الرياضية",
  pants: "البناطيل الرياضية",
  shoes: "الأحذية الرياضية",
  training: "ملابس التدريب",
  accessories: "الإكسسوارات",
  outerwear: "الملابس الخارجية",
};

const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "price-asc", label: "السعر: من الأقل" },
  { value: "price-desc", label: "السعر: من الأعلى" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "popular", label: "الأكثر شعبية" },
];

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("page", page.toString());
    params.set("limit", "12");

    try {
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, minPrice, maxPrice, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const applyFilters = () => {
    setPage(1);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    if (sort !== "newest") params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/products?${params}`);
  };

  const resetFilters = () => {
    setCategory("all");
    setSearch("");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
    router.push("/products");
  };

  const hasActiveFilters = category !== "all" || search !== "" || minPrice !== "" || maxPrice !== "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900">
                {categoryNames[category] || "جميع المنتجات"}
              </h1>
              <p className="text-gray-500 mt-1">
                {total} منتج متوفر
                {search && ` - نتائج البحث: "${search}"`}
              </p>
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  placeholder="ابحث عن منتج..."
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2.5 border rounded-xl hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center gap-2">
                <Grid3X3
                  className={`w-5 h-5 cursor-pointer ${viewMode === "grid" ? "text-brand-600" : "text-gray-400"}`}
                  onClick={() => setViewMode("grid")}
                />
                <List
                  className={`w-5 h-5 cursor-pointer ${viewMode === "list" ? "text-brand-600" : "text-gray-400"}`}
                  onClick={() => setViewMode("list")}
                />
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="appearance-none bg-white border rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-gray-500">الفلاتر النشطة:</span>
              {category !== "all" && (
                <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm">
                  {categoryNames[category]}
                  <button onClick={() => { setCategory("all"); setPage(1); }} className="hover:text-brand-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {minPrice && (
                <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm">
                  من {minPrice} ريال
                  <button onClick={() => { setMinPrice(""); setPage(1); }} className="hover:text-brand-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPrice && (
                <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm">
                  حتى {maxPrice} ريال
                  <button onClick={() => { setMaxPrice(""); setPage(1); }} className="hover:text-brand-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button onClick={resetFilters} className="text-red-500 text-sm hover:underline">
                إزالة الكل
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border sticky top-28 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">الفلاتر</h3>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-sm text-red-500 hover:underline">
                    إعادة تعيين
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-bold text-sm text-gray-700 mb-3">الفئة</h4>
                <div className="space-y-2">
                  {Object.entries(categoryNames).map(([key, name]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === key}
                        onChange={() => { setCategory(key); setPage(1); }}
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                      />
                      <span className={`text-sm group-hover:text-brand-600 transition-colors ${category === key ? "font-bold text-brand-600" : "text-gray-600"}`}>
                        {name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-bold text-sm text-gray-700 mb-3">نطاق السعر</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="من"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="إلى"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                onClick={applyFilters}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto animate-slideInRight p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">الفلاتر</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3">الفئة</h4>
                    <div className="space-y-2">
                      {Object.entries(categoryNames).map(([key, name]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={category === key}
                            onChange={() => setCategory(key)}
                            className="w-4 h-4 text-brand-600"
                          />
                          <span className={`text-sm ${category === key ? "font-bold text-brand-600" : ""}`}>{name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">نطاق السعر</h4>
                    <div className="flex items-center gap-2">
                      <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="من" className="w-full px-3 py-2 border rounded-lg text-sm" />
                      <span className="text-gray-400">-</span>
                      <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="إلى" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={resetFilters} className="flex-1 border py-3 rounded-xl font-bold hover:bg-gray-50">إعادة تعيين</button>
                    <button onClick={() => { applyFilters(); setShowFilters(false); }} className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-bold">تطبيق</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid gap-4 md:gap-6 ${viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm border">
                    <div className="aspect-[3/4] bg-gray-200 skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                      <div className="h-3 bg-gray-200 rounded skeleton w-1/2" />
                      <div className="h-6 bg-gray-200 rounded skeleton w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد منتجات</h3>
                <p className="text-gray-500 mb-6">حاول تغيير الفلاتر أو البحث عن منتج آخر</p>
                <button onClick={resetFilters} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700">
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              <>
                <div className={`grid gap-4 md:gap-6 ${viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      السابق
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-bold ${
                          page === i + 1
                            ? "bg-brand-600 text-white"
                            : "border hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      التالي
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
