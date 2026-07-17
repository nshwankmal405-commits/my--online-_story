"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Star,
  ChevronDown,
  User,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/products?category=shirts", label: "القمصان" },
  { href: "/products?category=shoes", label: "الأحذية" },
  { href: "/products?category=training", label: "ملابس التدريب" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gold-400" fill="currentColor" />
              أفضل متجر ملابس رياضية
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>🚚 شحن مجاني للطلبات فوق 200 ريال</span>
            <a href="tel:+966712641249" className="hidden md:flex items-center gap-1 hover:text-brand-200 transition-colors" dir="ltr">
              📞 +966 71 264 1249
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <span className="text-white font-black text-lg md:text-xl">⭐</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black text-brand-900 leading-tight">
                  نجوم الملعب
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium -mt-0.5">
                  للملابس الرياضية
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                {searchOpen && (
                  <form
                    onSubmit={handleSearch}
                    className="absolute left-0 top-full mt-2 w-72 md:w-80 bg-white rounded-2xl shadow-xl border p-2 animate-scaleIn"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن منتجات..."
                        className="flex-1 outline-none text-sm py-2 bg-transparent"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-brand-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-brand-700"
                      >
                        بحث
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* User */}
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
                <User className="w-5 h-5 text-gray-600" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fadeIn">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/products?category=accessories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              >
                الإكسسوارات
              </Link>
              <Link
                href="/products?category=outerwear"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              >
                الملابس الخارجية
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors font-bold"
              >
                📞 تواصل معنا
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
