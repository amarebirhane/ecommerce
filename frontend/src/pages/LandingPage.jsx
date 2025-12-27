import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();

  /* ---------------- DATA ---------------- */
  const products = [
    {
      id: 1,
      name: 'Premium Leather Bag',
      price: 120,
      category: 'Accessories',
      image: '/bag.png',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 250,
      category: 'Electronics',
      image: '/headphone.png',
    },
    {
      id: 3,
      name: 'Minimalist Watch',
      price: 180,
      category: 'Accessories',
      image: '/watch.png',
    },
    {
      id: 4,
      name: 'Smart Home Hub',
      price: 95,
      category: 'Electronics',
      image: '/wifi.png',
    },
  ];


  /* ---------------- STATE ---------------- */
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);

  /* ---------------- HELPERS ---------------- */
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const addToCart = (product) => setCart([...cart, product]);

  const toggleWishlist = (product) => {
    setWishlist(
      wishlist.some((p) => p.id === product.id)
        ? wishlist.filter((p) => p.id !== product.id)
        : [...wishlist, product]
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ================= NAV ================= */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur border-b">
        <div className="text-2xl font-black text-indigo-600">LUXE.</div>

        <div className="hidden md:flex gap-8 font-bold uppercase text-sm">
          <button onClick={() => scrollTo('shop')}>Shop</button>
          <button onClick={() => scrollTo('collections')}>Collections</button>
          <button onClick={() => scrollTo('about')}>About</button>
        </div>

        <div className="flex items-center gap-4">
          <input
            placeholder="Search..."
            className="hidden md:block px-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setShowCart(true)} className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          <button className="relative">
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* LOGIN */}
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 font-bold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Login
          </button>

          {/* SIGN UP */}
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="relative min-h-[80vh] flex items-center px-6 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.png"
            alt="Luxury Lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase bg-indigo-50 rounded-full">
            2025 Collection
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight">
            Elevate Your <br />
            <span className="text-indigo-600">Lifestyle.</span>
          </h1>
          <p className="max-w-xl text-xl text-gray-600 mt-8 mb-10 leading-relaxed font-medium">
            Discover a curated selection of premium essentials designed for the modern individual who values both form and function.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('shop')}
              className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all transform hover:-translate-y-1"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-10 py-5 border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-gray-900 rounded-2xl font-bold text-lg hover:bg-white hover:border-indigo-600 transition-all"
            >
              Our Story
            </button>
          </div>
        </div>
      </header>


      {/* ================= SHOP ================= */}
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Featured Products</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      </section>

      {/* ================= COLLECTIONS ================= */}
      <section id="collections" className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">Collections</h2>

          <div className="flex justify-center gap-4 mb-12">
            {['All', 'Accessories', 'Electronics'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold ${activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.length ? (
              filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6">About LUXE</h2>
            <p className="text-gray-600">
              LUXE is a premium lifestyle brand delivering high-quality,
              thoughtfully designed products worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <Stat title="50+" desc="Countries" />
            <Stat title="10K+" desc="Customers" />
            <Stat title="100%" desc="Quality" />
            <Stat title="24/7" desc="Support" />
          </div>
        </div>
      </section>

      {/* ================= CART DRAWER ================= */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-80 bg-white p-6">
            <h3 className="text-xl font-bold mb-4">Your Cart</h3>

            {cart.length ? (
              cart.map((item, i) => (
                <p key={i} className="border-b py-2">
                  {item.name} – ${item.price}
                </p>
              ))
            ) : (
              <p className="text-gray-500">Cart is empty</p>
            )}

            <button
              onClick={() => setShowCart(false)}
              className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10 text-center text-gray-400">
        © 2025 LUXE. All rights reserved.
      </footer>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const ProductCard = ({ product, addToCart, toggleWishlist, wishlist }) => {
  const isWishlisted = wishlist.some((p) => p.id === product.id);

  return (
    <div className="group bg-white border border-gray-100 rounded-[2rem] p-4 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isWishlisted
              ? 'bg-pink-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-400 hover:text-pink-500'
            }`}
        >
          ❤️
        </button>
      </div>

      <div className="px-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
          {product.category}
        </span>
        <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-indigo-600 font-black text-2xl mt-2">
          ${product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-6 w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};


const Stat = ({ title, desc }) => (
  <div className="bg-gray-50 p-8 rounded-2xl text-center">
    <h3 className="text-4xl font-black text-indigo-600">{title}</h3>
    <p className="text-gray-500 mt-2">{desc}</p>
  </div>
);

export default LandingPage;
