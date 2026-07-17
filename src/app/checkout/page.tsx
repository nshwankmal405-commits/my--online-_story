"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ArrowRight,
  Check,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react";

type Step = "info" | "shipping" | "payment" | "confirm";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    zipCode: "",
    notes: "",
    paymentMethod: "cod",
  });

  const shipping = totalPrice >= 200 ? 0 : 25;
  const total = totalPrice + shipping;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerInfo: formData }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderNumber(data.orderNumber);
        setOrderSuccess(true);
        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 mx-auto text-gray-200 mb-6" />
        <h1 className="text-3xl font-black mb-4">السلة فارغة</h1>
        <p className="text-gray-500 mb-8">أضف منتجات للسلة لإتمام عملية الشراء</p>
        <Link href="/products" className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 inline-flex items-center gap-2">
          تصفح المنتجات
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-black mb-4">تم تأكيد طلبك بنجاح! 🎉</h1>
        <p className="text-gray-500 text-lg mb-2">شكراً لتسوقك من نجوم الملعب</p>
        <p className="text-gray-500 mb-8">
          رقم الطلب: <span className="font-bold text-brand-600">{orderNumber}</span>
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-right">
          <h3 className="font-bold mb-4">تفاصيل التوصيل</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📍 العنوان: {formData.city} - {formData.address}</p>
            <p>📱 الهاتف: {formData.phone}</p>
            <p>🚚 موعد التوصيل المتوقع: 3-5 أيام عمل</p>
          </div>
        </div>
        <Link href="/products" className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 inline-flex items-center gap-2">
          متابعة التسوق
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "info", label: "المعلومات الشخصية", icon: <User className="w-5 h-5" /> },
    { key: "shipping", label: "عنوان الشحن", icon: <MapPin className="w-5 h-5" /> },
    { key: "payment", label: "طريقة الدفع", icon: <CreditCard className="w-5 h-5" /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black">إتمام الشراء</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                i <= currentStepIndex ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {s.icon}
              <span className="hidden md:inline">{s.label}</span>
              <span className="md:hidden">{i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mx-2 ${i < currentStepIndex ? "bg-brand-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border p-6 md:p-8">
            {/* Step 1: Personal Info */}
            {step === "info" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-600" />
                  المعلومات الشخصية
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">الاسم الكامل *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">رقم الجوال *</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full pr-12 pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                    />
                  </div>
                </div>
                <button
                  onClick={() => formData.name && formData.email && formData.phone && setStep("shipping")}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  التالي: عنوان الشحن
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === "shipping" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-600" />
                  عنوان الشحن
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">المدينة *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">اختر المدينة</option>
                      <option value="صنعاء">صنعاء</option>
                      <option value="عدن">عدن</option>
                      <option value="تعز">تعز</option>
                      <option value="الحديدة">الحديدة</option>
                      <option value="إب">إب</option>
                      <option value="المكلا">المكلا</option>
                      <option value="ذمار">ذمار</option>
                      <option value="عمران">عمران</option>
                      <option value="مأرب">مأرب</option>
                      <option value="صعدة">صعدة</option>
                      <option value="الضالع">الضالع</option>
                      <option value="بيضاء">بيضاء</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">الرمز البريدي</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => updateField("zipCode", e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">العنوان التفصيلي *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="الحي، الشارع، رقم المبنى، الطابق"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">ملاحظات إضافية</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="أي ملاحظات خاصة بالتوصيل"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("info")}
                    className="px-6 py-3.5 border rounded-xl font-bold hover:bg-gray-50"
                  >
                    السابق
                  </button>
                  <button
                    onClick={() => formData.city && formData.address && setStep("payment")}
                    disabled={!formData.city || !formData.address}
                    className="flex-1 bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    التالي: طريقة الدفع
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-600" />
                  طريقة الدفع
                </h2>
                <div className="space-y-3">
                  {[
                    { value: "cod", label: "الدفع عند الاستلام", icon: "💵", desc: "ادفع نقداً عند استلام طلبك" },
                    { value: "card", label: "بطاقة ائتمان / مدى", icon: "💳", desc: "فيزا، ماستركارد، مدى" },
                    { value: "apple", label: "Apple Pay", icon: "🍎", desc: "ادفع بسهولة عبر Apple Pay" },
                    { value: "transfer", label: "تحويل بنكي", icon: "🏦", desc: "تحويل مباشر لحسابنا البنكي" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === method.value
                          ? "border-brand-600 bg-brand-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={(e) => updateField("paymentMethod", e.target.value)}
                        className="hidden"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <p className="font-bold">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                      <div
                        className={`mr-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === method.value ? "border-brand-600 bg-brand-600" : "border-gray-300"
                        }`}
                      >
                        {formData.paymentMethod === method.value && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="px-6 py-3.5 border rounded-xl font-bold hover:bg-gray-50"
                  >
                    السابق
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      "جاري معالجة الطلب..."
                    ) : (
                      <>
                        تأكيد الطلب
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border p-6 sticky top-28">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              ملخص الطلب
            </h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size} | {item.color} × {item.quantity}</p>
                    <p className="text-sm font-bold text-brand-600">{(parseFloat(item.price) * item.quantity).toFixed(0)} ريال</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">المجموع الفرعي</span>
                <span>{totalPrice.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الشحن</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "مجاني" : `${shipping} ريال`}</span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-green-600 bg-green-50 py-1 px-2 rounded">🎉 تحصل على شحن مجاني!</p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>الإجمالي</span>
                <span className="text-brand-600">{total.toFixed(2)} ريال</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Truck className="w-4 h-4" />
              <span>التوصيل المتوقع: 3-5 أيام عمل</span>
            </div>
            <div className="mt-6 p-4 bg-brand-50 rounded-xl">
              <p className="text-sm text-brand-800 font-bold mb-1">تحتاج مساعدة؟</p>
              <p className="text-xs text-brand-600" dir="ltr">📞 +966 71 264 1249</p>
              <p className="text-xs text-brand-600">✉️ aymnalahdl31@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
