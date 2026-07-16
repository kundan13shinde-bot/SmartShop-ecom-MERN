import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(12);

  const showAllProducts = () => {
    setVisibleProducts(products.length);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to SmartShop</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>

      <h2>Featured Products</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="product-grid">
            {products.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length > visibleProducts && (
            <div className="more-btn-container">
              <button className="more-btn" onClick={showAllProducts}>
                More Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
