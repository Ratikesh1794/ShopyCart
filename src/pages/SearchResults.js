import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json'; // Import your product data
import ProductCard from '../components/ProductCard'; // Import ProductCard component
import { AppContext } from '../context/Context'; // Import context to use addToCart

const SearchResults = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const { addToCart, cartItems } = React.useContext(AppContext); // Use context

  useEffect(() => {
    if (query) {
      const results = productsData.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart} // Pass addToCart function to ProductCard
              cartItems={cartItems} // Pass cartItems to check if item is already in cart
            />
          ))
        ) : (
          <p>No products found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
