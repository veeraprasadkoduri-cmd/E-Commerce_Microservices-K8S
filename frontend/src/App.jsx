import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const categories = [
  "Furniture",
  "Living Room",
  "Bedroom",
  "Dining",
  "Lighting",
  "Decor"
];

const demoProducts = [
  { id: 1, name: "Modern 3-Seater Sofa", price: 49999, category: "Living Room", emoji: "🛋️" },
  { id: 2, name: "Elegant Dining Chair", price: 8999, category: "Dining", emoji: "🪑" },
  { id: 3, name: "Premium Queen Bed", price: 32999, category: "Bedroom", emoji: "🛏️" },
  { id: 4, name: "Modern Floor Lamp", price: 5999, category: "Lighting", emoji: "💡" },
  { id: 5, name: "Decorative Coffee Table", price: 12999, category: "Furniture", emoji: "🪵" },
  { id: 6, name: "Comfort Lounge Chair", price: 15999, category: "Living Room", emoji: "💺" }
];

function App() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!API_BASE) return;

    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setProducts(data);
        }
      })
      .catch(() => {
        console.log("Using demo products");
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
  };

  return (
    <div className="app">

      <div className="top-banner">
        Free shipping on orders over ₹5,000
      </div>

      <header className="header">
        <div className="logo">
          HomeStyle
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search furniture, decor and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>

        <div className="header-actions">
          <span>👤 Account</span>
          <span>♡ Wishlist</span>
          <span>🛒 Cart ({cart.length})</span>
        </div>
      </header>

      <nav className="nav">
        <span>Home</span>
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
        <span className="sale">Sale</span>
      </nav>

      <main>

        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">MAKE YOUR SPACE BEAUTIFUL</p>
            <h1>Furniture that feels like home.</h1>
            <p>
              Discover stylish furniture and home decor designed
              to make every room feel special.
            </p>
            <button className="shop-button">
              Shop Now →
            </button>
          </div>

          <div className="hero-art">
            <div className="hero-sofa">🛋️</div>
            <div className="hero-lamp">💡</div>
            <div className="hero-plant">🌿</div>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <h2>Shop by Category</h2>
            <span>Explore all →</span>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <div className="category-card" key={category}>
                <div className="category-icon">
                  {["🛋️", "🏠", "🛏️", "🍽️", "💡", "🪴"][index]}
                </div>
                <h3>{category}</h3>
                <p>Shop now →</p>
              </div>
            ))}
          </div>
        </section>

        <section className="products-section">
          <div className="section-heading">
            <div>
              <h2>Featured Products</h2>
              <p>Our most loved furniture and home essentials</p>
            </div>
            <span>View all →</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span className="product-emoji">
                    {product.emoji || "🛋️"}
                  </span>
                  <button className="wishlist">♡</button>
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {product.category || "Furniture"}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    ★★★★★
                  </div>

                  <div className="product-bottom">
                    <strong>
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </strong>

                    <button
                      onClick={() => addToCart(product)}
                      className="cart-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!filteredProducts.length && (
            <div className="no-results">
              No products found.
            </div>
          )}
        </section>

        <section className="promo">
          <div>
            <p className="eyebrow">DESIGN YOUR DREAM HOME</p>
            <h2>Beautiful spaces start here.</h2>
            <p>
              Find pieces that match your style and make your
              home uniquely yours.
            </p>
          </div>

          <button className="shop-button">
            Explore Collection →
          </button>
        </section>

      </main>

      <footer>
        <div className="footer-logo">HomeStyle</div>
        <p>Furniture & home decor for every space.</p>
        <div className="footer-links">
          Customer Service · About Us · Shipping · Returns · Privacy
        </div>
        <small>© 2026 HomeStyle. All rights reserved.</small>
      </footer>

    </div>
  );
}

export default App;
