"use client";
import Link from "next/link";
import { ShoppingBag, Search, Plus, LogOut, User as UserIcon, Package } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Suspense, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

function NavbarContent() {
  const { cartCount } = useCart();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push, refresh } = useRouter();
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    push('/login');
    refresh();
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (term) {
      params.set('search', term);
      params.set('page', '1'); 
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-sm transform rotate-45 flex items-center justify-center">
               <div className="w-2 h-2 bg-white transform -rotate-45"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Clothing Store</span>
          </Link>

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
                    setTimeout(() => handleSearch(e.target.value), 300);
                }}
                defaultValue={searchParams.get('search')?.toString() || ""}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#137fec] transition-colors">Shop</Link>
            
            {user ? (
              <>
                <Link href="/orders" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#137fec] transition-colors">
                    <Package className="w-4 h-4" /> 
                    Orders
                </Link>

                <Link href="/products/create">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    Add Product
                    </button>
                </Link>
                
                <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <UserIcon className="w-4 h-4"/> 
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition" title="Đăng xuất">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Sign In
              </Link>
            )}

            <Link href="/cart" className="p-2 text-gray-400 hover:text-[#137fec] relative cursor-pointer transition-colors">
               <ShoppingBag className="w-6 h-6" />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-white">
                   {cartCount}
                 </span>
               )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50 h-16 shadow-sm" />
    }>
      <NavbarContent />
    </Suspense>
  );
}