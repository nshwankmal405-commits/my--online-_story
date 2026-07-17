export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto" />
          <span className="absolute inset-0 flex items-center justify-center text-2xl">⭐</span>
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">جاري التحميل...</h2>
        <p className="text-gray-500 text-sm">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  );
}
