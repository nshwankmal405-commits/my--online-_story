import Link from "next/link";
import { Star, Mail, Phone, MapPin, Shield, Truck, RotateCcw, Headphones, MessageCircle } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "القمصان الرياضية", href: "/products?category=shirts" },
    { label: "البناطيل الرياضية", href: "/products?category=pants" },
    { label: "الأحذية الرياضية", href: "/products?category=shoes" },
    { label: "ملابس التدريب", href: "/products?category=training" },
    { label: "الإكسسوارات", href: "/products?category=accessories" },
    { label: "الملابس الخارجية", href: "/products?category=outerwear" },
  ],
  support: [
    { label: "تواصل معنا", href: "/contact" },
    { label: "سياسة الإرجاع", href: "#" },
    { label: "الشحن والتوصيل", href: "#" },
    { label: "الأسئلة الشائعة", href: "#" },
    { label: "دليل المقاسات", href: "#" },
  ],
  about: [
    { label: "من نحن", href: "#" },
    { label: "سياسة الخصوصية", href: "#" },
    { label: "الشروط والأحكام", href: "#" },
    { label: "وظائف", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="bg-brand-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">اشترك في نشرتنا البريدية</h3>
              <p className="text-brand-100">احصل على أحدث العروض والتخفيضات مباشرة في بريدك</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 md:w-72 px-5 py-3 rounded-r-xl text-gray-900 outline-none text-sm"
              />
              <button className="bg-brand-900 text-white px-6 py-3 rounded-l-xl font-bold text-sm hover:bg-brand-950 transition-colors">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="w-8 h-8" />, title: "شحن مجاني", desc: "للطلبات فوق 200 ريال" },
              { icon: <RotateCcw className="w-8 h-8" />, title: "إرجاع سهل", desc: "خلال 30 يوم" },
              { icon: <Shield className="w-8 h-8" />, title: "دفع آمن", desc: "حماية 100%" },
              { icon: <Headphones className="w-8 h-8" />, title: "دعم 24/7", desc: "خدمة عملاء متميزة" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="text-brand-400">{feature.icon}</div>
                <h4 className="font-bold text-sm">{feature.title}</h4>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">⭐</span>
              </div>
              <div>
                <h3 className="text-lg font-black">نجوم الملعب</h3>
                <p className="text-xs text-gray-400">للملابس الرياضية</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              وجهتك الأولى للملابس والأحذية الرياضية الاحترافية. نقدم أحدث المنتجات من أشهر العلامات التجارية العالمية بأسعار تنافسية وجودة مضمونة.
            </p>
            <div className="flex items-center gap-1 mt-4">
              {[5, 5, 5, 5, 4].map((r, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400" fill="currentColor" />
              ))}
              <span className="text-sm text-gray-400 mr-2">+500 تقييم إيجابي</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4 text-brand-400">المتجر</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-brand-400">الدعم</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-brand-400">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+966712641249" className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-brand-400" />
                  <span dir="ltr">+966 71 264 1249</span>
                </a>
              </li>
              <li>
                <a href="mailto:aymnalahdl31@gmail.com" className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-brand-400" />
                  <span className="break-all">aymnalahdl31@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>اليمن، الجمهورية اليمنية</span>
              </li>
              <li>
                <a
                  href="https://wa.me/966712641249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span>تواصل عبر واتساب</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 نجوم الملعب. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">طرق الدفع:</span>
              <div className="flex gap-2">
                {["💳", "🏦", "📱", "💰"].map((icon, i) => (
                  <span key={i} className="text-xl">{icon}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
