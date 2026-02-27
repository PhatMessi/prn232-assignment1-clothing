"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    image: string | null;
  };
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      quantity: 1,
    });
    
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <button 
      onClick={handleAdd}
      className="absolute bottom-4 right-4 bg-white p-2.5 rounded-full shadow-lg text-gray-900 hover:bg-[#137fec] hover:text-white transition-all z-20 hover:scale-110 border border-gray-100"
      title="Add to Cart"
    >
      <ShoppingBag className="w-5 h-5" />
    </button>
  );
}