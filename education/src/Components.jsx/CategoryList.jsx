import React from "react";
import Category from "./Category"; // Ensure correct import path

const CategoryList = () => {
  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
