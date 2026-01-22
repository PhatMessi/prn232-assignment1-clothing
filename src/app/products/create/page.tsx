"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Save, RefreshCw, X } from "lucide-react"; // Đã thêm icon X cho nút Cancel
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State dữ liệu Form
  const [formData, setFormData] = useState({
    name: "Classic Essential Tee",
    price: "49.99",
    stock: "100",
    category: "Tops",
    description: "Crafted from 100% premium organic cotton, this tee offers a relaxed fit perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomImage = () => {
    const images = [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800"
    ];
    const random = images[Math.floor(Math.random() * images.length)];
    setFormData(prev => ({ ...prev, image: random }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/"); 
        router.refresh(); 
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
        {/* Header - ĐÃ XÓA NÚT Ở ĐÂY */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
            <p className="text-gray-500 mt-1">Add a new item to your inventory</p>
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

              {/* Row: Price & Stock */}
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
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                        placeholder="100"
                    />
                </div>
              </div>

              {/* Category */}
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                 <div className="relative">
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none"
                    >
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Accessories">Accessories</option>
                        <option value="General">General</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                 </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <div className="flex gap-2">
                    <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                    placeholder="https://..."
                    />
                    <button onClick={handleRandomImage} className="px-3 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600" title="Random Image">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
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
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW & ACTIONS */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Preview
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full">
                <div className="relative w-64 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-md mb-6">
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                        ${formData.price || "0.00"}
                    </div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-[10px] text-white font-bold shadow-sm z-10 uppercase">
                        {formData.category}
                    </div>
                    <Image 
                        src={formData.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{formData.name || "Product Name"}</h3>
                <div className="text-xs font-bold text-green-600 mb-2 bg-green-50 inline-block px-2 py-1 rounded-md">
                    In Stock: {formData.stock} units
                </div>
                <p className="text-gray-500 text-sm max-w-xs line-clamp-3 mb-6">
                    {formData.description || "Product description will appear here..."}
                </p>

                {/* --- KHU VỰC ACTION BUTTONS (MỚI) --- */}
                {/* Thay thế nút Add to Cart bằng 2 nút Cancel và Save */}
                <div className="w-full mt-auto pt-6 border-t border-gray-100 flex gap-3">
                    <Link href="/" className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 hover:text-black transition flex items-center justify-center gap-2">
                        <X className="w-4 h-4" />
                        Cancel and <br></br> go back
                    </Link>
                    
                    <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-[2] py-3 px-4 bg-black text-white rounded-lg font-bold text-sm shadow-lg hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}