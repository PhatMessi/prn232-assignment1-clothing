"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // 1. Lấy dữ liệu sản phẩm khi vào trang
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        router.push("/404"); // Nếu lỗi thì chuyển hướng (cần tạo trang 404 sau nếu muốn)
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id, router]);

  // 2. Hàm xử lý Xóa sản phẩm
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted successfully!");
        router.push("/"); // Xóa xong về trang chủ
        router.refresh();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
            <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Shop
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT: IMAGE */}
          <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
             {/* Badge */}
             <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                    New Arrival
                </span>
             </div>
             <Image
                src={product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"}
                alt={product.name}
                fill
                className="object-cover"
                priority
             />
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col">
            <div className="mb-2">
                <span className="text-sm text-gray-500 font-medium">LuxeWear Collection</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-medium text-gray-900">${product.price}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">In Stock</span>
            </div>

            <div className="prose prose-sm text-gray-500 mb-8">
                <p>{product.description}</p>
            </div>

            {/* Fake Size Selector */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Color</h3>
                <div className="flex gap-3 mb-6">
                    <button className="w-8 h-8 rounded-full bg-blue-900 border-2 border-transparent hover:scale-110 transition"></button>
                    <button className="w-8 h-8 rounded-full bg-gray-700 border-2 border-transparent hover:scale-110 transition"></button>
                    <button className="w-8 h-8 rounded-full bg-yellow-700 border-2 border-transparent hover:scale-110 transition"></button>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Size</h3>
                    <button className="text-xs text-blue-600 underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                        <button key={size} className="py-3 border border-gray-200 rounded-lg text-sm font-medium hover:border-black hover:bg-gray-50 transition">
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-8 shadow-lg shadow-blue-200">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
            </button>

            {/* ADMIN ACTIONS BOX */}
            <div className="mt-auto border border-dashed border-gray-300 bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Admin Actions</span>
                </div>
                
                <div className="flex gap-4">
                    {/* Edit Button */}
                    <Link href={`/products/${product.id}/edit`} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-black transition">
                        <Edit className="w-4 h-4" />
                        Edit Product
                    </Link>

                    {/* Delete Button */}
                    <button 
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 border border-red-100 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 hover:border-red-200 transition"
                    >
                        <Trash2 className="w-4 h-4" />
                        {deleting ? "Deleting..." : "Delete Item"}
                    </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-3 text-center">
                    Last updated by Admin on {new Date(product.id).toLocaleDateString()}
                </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}