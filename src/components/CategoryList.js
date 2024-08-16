import React, { useState } from 'react';

const CategoryList = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="bg-slate-200 p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer mb-2 ${selectedCategory === category ? 'text-orange-500 ' : 'hover:text-blue-500'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
