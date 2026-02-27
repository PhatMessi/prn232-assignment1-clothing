"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const router = useRouter();

  const shipping = cartCount > 0 ? 12.00 : 0;
  const tax = cartTotal * 0.1; 
  const finalTotal = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f8] font-sans">
      <Navbar />
      
      <main className="flex-1 px-4 md:px-10 py-8 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Your Cart</h1>
              <p className="text-slate-500 text-base font-normal leading-normal">You have {cartCount} items in your bag</p>
            </div>

            <div className="flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-lg mb-4">Your cart is empty.</p>
                  <Link href="/" className="inline-flex items-center gap-2 bg-[#137fec] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                    <div className="shrink-0">
                      <div className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-[200px] sm:size-[140px]" 
                           style={{ backgroundImage: `url('${item.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"}')` }}>
                      </div>
                    </div>
                    
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-slate-900 text-lg font-bold leading-tight">{item.name}</h3>
                          <p className="text-slate-500 text-sm mt-1">Ref: #{item.id}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-4 mt-4 sm:mt-0">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 transition">
                            <Minus className="w-4 h-4" />
                          </button>
                          <input className="w-10 h-9 p-0 text-center bg-white border-x border-y-0 border-slate-200 text-slate-900 text-sm focus:ring-0" readOnly value={item.quantity} />
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 transition">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[#137fec] font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-slate-400 text-xs">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link className="inline-flex items-center gap-2 text-slate-900 font-medium hover:text-[#137fec] transition-colors mt-2 self-start" href="/">
              <ArrowLeft className="w-5 h-5" /> Continue Shopping
            </Link>
          </div>

          <div className="lg:w-[380px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg border border-slate-100">
              <h2 className="text-slate-900 text-xl font-bold">Order Summary</h2>
              
              <div className="flex flex-col gap-3 py-4 border-y border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-900 font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Shipping Estimate</span>
                  <span className="text-slate-900 font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Tax (10%)</span>
                  <span className="text-slate-900 font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <input className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#137fec]" placeholder="Coupon code" type="text" />
                <button className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition">Apply</button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-900 text-lg font-bold">Total</span>
                <span className="text-[#137fec] text-2xl font-black">${finalTotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                disabled={cartCount === 0}
                className="w-full bg-[#137fec] hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 mt-2 group"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-2">Secure checkout powered by Stripe</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}