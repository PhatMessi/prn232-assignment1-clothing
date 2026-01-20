"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State để lưu dữ liệu form và hiển thị Preview
  const [formData, setFormData] = useState({
    name: "Classic Essential Tee",
    price: "49.99",
    description: "Crafted from 100% premium organic cotton, this tee offers a relaxed fit perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
  });

  // Hàm xử lý khi nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm gửi dữ liệu lên Server
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/"); // Thành công thì về trang chủ
        router.refresh(); // Làm mới dữ liệu trang chủ
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
            <p className="text-gray-500 mt-1">Add a new item to your inventory</p>
          </div>
          <div className="flex gap-3">
             <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
               Cancel
             </Link>
             <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
             >
               <Save className="w-4 h-4" />
               {loading ? "Saving..." : "Save Product"}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: FORM INPUT */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="space-y-6">
              
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                    placeholder="0.00"
                    />
                </div>
                 {/* Stock - Giả lập field cho đẹp layout */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                    <input
                    type="number"
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-500 border-transparent cursor-not-allowed"
                    placeholder="100"
                    />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-400 mt-2">Paste a link from Unsplash or Google Images.</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Describe your product..."
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Preview
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="relative w-64 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md mb-6">
                    {/* Badge Price */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                        ${formData.price || "0.00"}
                    </div>
                    
                    {/* Image Preview */}
                    <Image 
                        src={formData.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.name || "Product Name"}</h3>
                <p className="text-gray-500 text-sm max-w-xs line-clamp-3">
                    {formData.description || "Product description will appear here..."}
                </p>

                <div className="mt-8 w-full">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow-blue-200 shadow-lg" disabled>
                        Add to Cart
                    </button>
                    <p className="text-xs text-gray-400 mt-3">Preview mode - Actions disabled</p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}