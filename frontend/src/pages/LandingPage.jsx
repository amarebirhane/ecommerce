import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Premium Leather Bag', price: '$120.00', category: 'Accessories' },
    { id: 2, name: 'Wireless Headphones', price: '$250.00', category: 'Electronics' },
    { id: 3, name: 'Minimalist Watch', price: '$180.00', category: 'Accessories' },
    { id: 4, name: 'Smart Home Hub', price: '$95.00', category: 'Electronics' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="text-2xl font-black tracking-tighter text-indigo-600">LUXE.</div>

        <div className="hidden md:flex space-x-8 font-medium text-sm uppercase tracking-wider">
          <a href="#shop" className="hover:text-indigo-600 transition">Shop</a>
          <a href="#collections" className="hover:text-indigo-600 transition">Collections</a>
          <a href="#about" className="hover:text-indigo-600 transition">About</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">🔍</button>
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            🛒 <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] px-1.5 rounded-full">0</span>
          </button>
          {/* Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 py-20 md:py-32 bg-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-100 rounded-full">
            New Collection 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Elevate Your <br />
            <span className="text-indigo-600">Everyday Style.</span>
          </h1>
          <p className="max-w-xl text-lg text-gray-600 mb-10 leading-relaxed">
            Experience the perfect blend of functionality and aesthetics with our curated
            selection of premium essentials designed for the modern lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
              Shop the Collection
            </button>
            <button className="px-8 py-4 border-2 border-gray-200 font-bold rounded-xl hover:bg-white transition-all">
              View Lookbook
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-100 hidden lg:block skew-x-12 transform translate-x-20"></div>
      </header>

      {/* Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6">✈️</div>
          <h3 className="text-xl font-bold mb-2">Global Shipping</h3>
          <p className="text-gray-500">Fast and reliable delivery to over 50 countries worldwide.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🛡️</div>
          <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
          <p className="text-gray-500">Your data is protected by industry-leading encryption.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🔄</div>
          <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
          <p className="text-gray-500">Not satisfied? Return your items within 30 days for a full refund.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-500">Our most wanted pieces of the season.</p>
          </div>
          <button className="text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            // Map product id or name to image file
            const imageMap = {
              1: '/bag.png',
              2: '/headphone.png',
              3: '/watch.png',
              4: '/wifi.png',
            };
            return (
              <div key={product.id} className="group relative">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                  {/* Product Image */}
                  <img
                    src={imageMap[product.id]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                  <button className="absolute bottom-4 left-4 right-4 py-3 bg-white text-black font-bold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
                    Add to Cart
                  </button>
                </div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{product.category}</span>
                <h3 className="font-bold text-lg mt-1">{product.name}</h3>
                <p className="text-indigo-600 font-bold mt-1">{product.price}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Inner Circle</h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-indigo-500"
              />
              <button className="px-8 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition">Subscribe</button>
            </form>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-black tracking-tighter text-indigo-600 mb-6">LUXE.</div>
            <p className="text-gray-500 leading-relaxed">Redefining modern retail with quality, transparency, and style.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600">All Products</a></li>
              <li><a href="#" className="hover:text-indigo-600">Best Sellers</a></li>
              <li><a href="#" className="hover:text-indigo-600">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600">Shipping Info</a></li>
              <li><a href="#" className="hover:text-indigo-600">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Social</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition">IG</a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition">TW</a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition">FB</a>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm">&copy; 2025 LUXE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
