import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(productsData);
    } else {
      setFilteredProducts(productsData.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const categories = ['All', ...new Set(productsData.map(product => product.category))];

  return (
    <div className="flex">
  {/* Left Sidebar - Category List */}
  <div className="w-1/6 h-full bg-white overflow-y-scroll shadow-md">
    <CategoryList categories={categories} onSelectCategory={setSelectedCategory} />
  </div>

  {/* Main Content - Product Listing */}
  <div className="flex-1 p-4 overflow-y-scrol grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
    {filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

  );
};

export default Home;
