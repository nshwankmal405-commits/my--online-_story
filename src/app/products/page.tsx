import { Suspense } from "react";
import ProductsContent from "./_products-content";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded skeleton w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded skeleton w-32" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
      </div>
    </div>
  );
}
