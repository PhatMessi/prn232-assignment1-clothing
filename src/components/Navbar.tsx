"use client";
import Link from "next/link";
import { ShoppingBag, Search, Plus } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Suspense } from "react";

function NavbarContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Hàm xử lý tìm kiếm
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (term) {
      params.set('search', term);
      params.set('page', '1'); // Reset về trang 1 khi tìm kiếm
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-sm transform rotate-45 flex items-center justify-center">
               <div className="w-2 h-2 bg-white transform -rotate-45"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Clothing Store</span>
          </Link>

          {/* Search Bar (Giả lập theo design) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 sm:text-sm"
                placeholder="Search products..."
                onChange={(e) => {
                    // Debounce đơn giản 300ms
                    setTimeout(() => handleSearch(e.target.value), 300);
                }}
                defaultValue={searchParams.get('search')?.toString()}
              />
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black">Shop</Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-black">Categories</Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-black">Sale</Link>
            
            {/* Button Add Product */}
            <Link href="/products/create">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Add Product
                </button>
            </Link>

            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
               <ShoppingBag className="w-5 h-5" />
               <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={
      // Fallback UI (Tránh vỡ layout khi đang load)
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50 h-16" />
    }>
      <NavbarContent />
    </Suspense>
  );
}