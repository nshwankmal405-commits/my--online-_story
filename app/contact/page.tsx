import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">تواصل معنا</h1>
          <p className="text-brand-200 text-lg max-w-2xl mx-auto">
            نسعد بتواصلكم معنا! فريقنا جاهز لمساعدتك والإجابة على جميع استفساراتك
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 -mt-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Phone Card */}
          <a
            href="tel:+966712641249"
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-200 transition-colors">
              <Phone className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">اتصل بنا</h3>
            <p className="text-brand-600 font-bold text-lg" dir="ltr">+966 71 264 1249</p>
            <p className="text-gray-500 text-sm mt-2">متاحون من 9 صباحاً - 11 مساءً</p>
          </a>

          {/* Email Card */}
          <a
            href="mailto:aymnalahdl31@gmail.com"
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
            <p className="text-green-600 font-bold text-sm break-all">aymnalahdl31@gmail.com</p>
            <p className="text-gray-500 text-sm mt-2">نرد خلال 24 ساعة</p>
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/966712641249"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">واتساب</h3>
            <p className="text-green-600 font-bold text-lg">راسلنا مباشرة</p>
            <p className="text-gray-500 text-sm mt-2">رد فوري خلال دقائق</p>
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-brand-600" />
              أرسل لنا رسالة
            </h2>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">الاسم الكامل</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">رقم الجوال</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">الموضوع</label>
                <select className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="">اختر الموضوع</option>
                  <option>استفسار عن منتج</option>
                  <option>متابعة طلب</option>
                  <option>طلب إرجاع</option>
                  <option>اقتراح</option>
                  <option>شكوى</option>
                  <option>أخرى</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">الرسالة</label>
                <textarea
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              >
                إرسال الرسالة
                <ArrowLeft className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-brand-600" />
                ساعات العمل
              </h2>
              <div className="space-y-3">
                {[
                  { day: "السبت - الخميس", hours: "9:00 صباحاً - 11:00 مساءً" },
                  { day: "الجمعة", hours: "4:00 مساءً - 11:00 مساءً" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-bold">{item.day}</span>
                    <span className="text-brand-600 font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-brand-600" />
                موقعنا
              </h2>
                <p className="text-gray-600 text-lg mb-4">صنعاء، الجمهورية اليمنية</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                متجر نجوم الملعب هو وجهتك الأولى للملابس والأحذية الرياضية الاحترافية. نقدم منتجات أصلية من أشهر العلامات التجارية العالمية.
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-black mb-3">هل تحتاج مساعدة؟</h2>
              <p className="text-brand-200 mb-6">
                فريق خدمة العملاء متاح لمساعدتك في اختيار المنتج المناسب أو متابعة طلبك
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+966712641249"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span dir="ltr" className="font-bold">+966 71 264 1249</span>
                </a>
                <a
                  href="https://wa.me/966712641249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-bold">راسلنا على واتساب</span>
                </a>
                <a
                  href="mailto:aymnalahdl31@gmail.com"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-bold break-all">aymnalahdl31@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
