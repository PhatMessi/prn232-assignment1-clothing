"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ChevronRight, CreditCard, Lock, HelpCircle } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shipping = cartCount > 0 ? 12.00 : 0;
  const tax = cartTotal * 0.1;
  const finalTotal = cartTotal + shipping + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartCount === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          totalAmount: finalTotal,
        }),
      });

      if (res.ok) {
        clearCart(); 
        alert("🎉 Đặt hàng thành công!");
        router.push("/orders"); 
      } else {
        const data = await res.json();
        setError(data.error || "Có lỗi xảy ra khi đặt hàng.");
      }
    } catch (err) {
      setError("Không thể kết nối đến server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartCount === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
        <Link href="/" className="text-[#137fec] hover:underline">Quay lại mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f8] font-sans text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/cart" className="hover:text-[#137fec] cursor-pointer">Cart</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-[#137fec]">Checkout</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Checkout</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 flex flex-col gap-10">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">
              
              <section aria-labelledby="shipping-heading">
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[#137fec] text-sm">1</span>
                    Shipping Address
                  </h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-slate-700">First Name</span>
                      <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="Jane" type="text" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-slate-700">Last Name</span>
                      <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="Doe" type="text" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Email Address</span>
                    <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="jane@example.com" type="email" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">Street Address</span>
                    <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="123 Fashion St" type="text" />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="text-sm font-medium text-slate-700">City</span>
                      <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="New York" type="text" />
                    </label>
                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="text-sm font-medium text-slate-700">State / Province</span>
                      <select required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4">
                        <option value="">Select State</option>
                        <option value="NY">NY</option>
                        <option value="CA">CA</option>
                        <option value="TX">TX</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5 sm:col-span-1">
                      <span className="text-sm font-medium text-slate-700">Zip Code</span>
                      <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="10001" type="text" />
                    </label>
                  </div>
                </div>
              </section>

              <section aria-labelledby="payment-heading">
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[#137fec] text-sm">2</span>
                    Payment Details
                  </h2>
                  <div className="flex gap-2 text-slate-400">
                    <CreditCard className="w-6 h-6" />
                    <Lock className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex p-1 bg-slate-100 rounded-lg">
                    <button type="button" className="flex-1 py-2.5 text-sm font-semibold rounded-md shadow-sm bg-white text-[#137fec] text-center">Credit Card</button>
                    <button type="button" className="flex-1 py-2.5 text-sm font-medium rounded-md text-slate-500 hover:text-slate-700 text-center">PayPal</button>
                  </div>

                  <div className="space-y-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-slate-700">Card Number</span>
                      <div className="relative">
                        <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 pl-12 pr-4" placeholder="0000 0000 0000 0000" type="text" />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      </div>
                    </label>
                    <div className="grid grid-cols-2 gap-5">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-slate-700">Expiration Date</span>
                        <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="MM / YY" type="text" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium text-slate-700">CVC</span>
                        <div className="relative">
                          <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="123" type="text" />
                          <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-help" />
                        </div>
                      </label>
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-slate-700">Cardholder Name</span>
                      <input required className="w-full rounded-lg border-slate-300 bg-white focus:border-[#137fec] focus:ring-[#137fec] h-12 px-4" placeholder="Name on card" type="text" />
                    </label>
                  </div>
                </div>
              </section>
            </form>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-28 overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-6 mb-8 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 relative">
                        <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex justify-between text-base font-medium text-slate-900">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm mt-2">
                          <p className="text-slate-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex justify-between text-base font-medium text-slate-500">
                    <p>Subtotal</p>
                    <p className="text-slate-900">${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-slate-500">
                    <p>Shipping</p>
                    <p className="text-slate-900">${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-slate-500">
                    <p>Taxes</p>
                    <p className="text-slate-900">${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <p className="text-lg font-bold text-slate-900">Total</p>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#137fec]">${finalTotal.toFixed(2)}</p>
                      <p className="text-xs text-slate-400 font-medium">USD</p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full mt-8 flex items-center justify-center rounded-lg bg-[#137fec] py-4 px-6 text-base font-bold text-white shadow-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
                <div className="mt-6 flex justify-center items-center gap-2 text-xs text-slate-400">
                  <Lock className="w-4 h-4" />
                  <p>Payments are secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}