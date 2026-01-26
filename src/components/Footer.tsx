import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Shopping</h3>
            <p className="text-sm text-gray-400">
              Sustainable materials, timeless designs. The new standard in everyday wear.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link href="/" className="hover:text-white transition">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Stay in the loop</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-none rounded-md px-3 py-2 text-sm w-full focus:ring-1 focus:ring-white"
              />
              <button className="bg-white text-black px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-200">
                →
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Clothing Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}