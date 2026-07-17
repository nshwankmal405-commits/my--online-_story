import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-400 to-brand-600 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-7xl animate-bounce">⚽</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-brand-200 text-lg mb-8">
          عذراً! يبدو أن الكرة خرجت من الملعب. الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-white text-brand-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
          <Link
            href="/products"
            className="border-2 border-brand-400 text-brand-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-700/50 transition-colors inline-flex items-center justify-center gap-2"
          >
            تصفح المنتجات
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
          <p className="text-brand-200 text-sm mb-3">هل تحتاج مساعدة في العثور على شيء؟</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <a href="tel:+966712641249" className="text-white font-bold hover:underline" dir="ltr">📞 +966 71 264 1249</a>
            <a href="mailto:aymnalahdl31@gmail.com" className="text-white font-bold hover:underline">✉️ aymnalahdl31@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
