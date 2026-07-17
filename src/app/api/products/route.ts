import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "newest";
  const minPriceStr = searchParams.get("minPrice");
  const maxPriceStr = searchParams.get("maxPrice");
  const featured = searchParams.get("featured");
  const bestSeller = searchParams.get("bestSeller");
  const isNew = searchParams.get("isNew");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  let allProducts = await db.select().from(products);

  // Apply filters
  if (category && category !== "all") {
    allProducts = allProducts.filter(p => p.category === category);
  }
  if (search && search.length > 0) {
    const sl = search.toLowerCase();
    allProducts = allProducts.filter(p =>
      p.name.includes(search) || p.nameEn.toLowerCase().includes(sl) || p.brand.toLowerCase().includes(sl)
    );
  }
  if (minPriceStr) {
    const mp = parseFloat(minPriceStr);
    allProducts = allProducts.filter(p => parseFloat(p.price) >= mp);
  }
  if (maxPriceStr) {
    const mp = parseFloat(maxPriceStr);
    allProducts = allProducts.filter(p => parseFloat(p.price) <= mp);
  }
  if (featured === "true") {
    allProducts = allProducts.filter(p => p.isFeatured);
  }
  if (bestSeller === "true") {
    allProducts = allProducts.filter(p => p.isBestSeller);
  }
  if (isNew === "true") {
    allProducts = allProducts.filter(p => p.isNew);
  }

  // Sort
  switch (sort) {
    case "price-asc":
      allProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "price-desc":
      allProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "rating":
      allProducts.sort((a, b) => parseFloat(b.rating ?? "0") - parseFloat(a.rating ?? "0"));
      break;
    case "popular":
      allProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      break;
    default:
      allProducts.sort((a, b) => b.id - a.id);
  }

  const total = allProducts.length;
  const start = (page - 1) * limit;
  const paginatedProducts = allProducts.slice(start, start + limit);

  return NextResponse.json({
    products: paginatedProducts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
