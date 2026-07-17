import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { items, customerInfo } = body;

  // Simulate order processing
  const orderNumber = `NO-${Date.now().toString().slice(-8)}`;

  return NextResponse.json({
    success: true,
    orderNumber,
    message: "تم تأكيد طلبك بنجاح! شكراً لتسوقك من نجوم الملعب",
    estimatedDelivery: "3-5 أيام عمل",
  });
}
