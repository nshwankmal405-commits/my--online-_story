import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  if (productId) {
    const result = await db.select().from(reviews).where(eq(reviews.productId, parseInt(productId)));
    return NextResponse.json({ reviews: result });
  }
  return NextResponse.json({ reviews: [] });
}
