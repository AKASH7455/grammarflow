import React, {  } from "react";
import "../../styles/progresspage.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "streak", label: "Streak" },
  { id: "learning", label: "Learning" },
  { id: "quiz", label: "Quiz" },
  { id: "special", label: "Special" },
  { id: "master", label: "Master" },
];

const CategoryChips = React.memo(({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-chips">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          className={`category-chip ${activeCategory === category.id ? "active" : ""}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
});

CategoryChips.displayName = "CategoryChips";

export default CategoryChips;
