import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma"; // Gọi trực tiếp DB vì đây là Server Component
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  createdAt: Date;
}

// Hàm lấy dữ liệu từ DB
async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* HERO SECTION - Giống hình 1 */}
        <div className="mt-6 relative rounded-2xl overflow-hidden bg-gray-900 h-[400px] flex items-center justify-center text-center">
          {/* Background giả lập */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
          
          <div className="relative z-10 px-4">
             <span className="inline-block py-1 px-3 rounded-full bg-gray-800/80 text-xs font-semibold text-gray-200 mb-4 border border-gray-700">
               FALL COLLECTION 2026
             </span>
             <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
               Curated <br/> Minimalism.
             </h1>
             <p className="text-gray-300 max-w-lg mx-auto mb-8 text-lg">
               Sustainable materials, timeless designs. Discover the new standard in everyday wear.
             </p>
             <div className="flex gap-4 justify-center">
               <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                 Shop Now
               </button>
               <button className="bg-transparent border border-gray-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
                 View Lookbook
               </button>
             </div>
          </div>
        </div>

        {/* SECTION TITLE & FILTERS */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 mt-1">The latest additions to our curated collection.</p>
          </div>
          
          {/* Fake Filters Tabs */}
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
             <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium">All Items</button>
             <button className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200">Tops</button>
             <button className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200">Bottoms</button>
             <button className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200">Accessories</button>
          </div>
        </div>

        {/* PRODUCT GRID - Sửa lỗi chỗ này */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products found. Start by adding one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Thêm kiểu dữ liệu : Product vào đây */}
            {products.map((product: Product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 relative">
                   <div className="absolute top-2 left-2 z-10">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded-sm">New</span>
                   </div>
                   
                   <Image
                     src={product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"}
                     alt={product.name}
                     fill
                     className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                   />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Classic Fit</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}