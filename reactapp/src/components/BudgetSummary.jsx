import React from "react";
import { deleteCategory } from "../services/api";

const BudgetSummary = ({ summary, refreshCategories }) => {
  if (!summary || summary.length === 0) {
    return <p className="empty-message">No categories added yet.</p>;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        if (refreshCategories) refreshCategories(); 
      } catch (error) {
        console.error("Failed to delete category:", error);
        alert("Error deleting category. Please try again.");
      }
    }
  };

  return (
    <div className="summary-container">
      <h2>Budget Summary</h2>
      <ul className="category-list">
        {summary.map((category) => (
          <li key={category._id || category.id} className="category-item">
            <div className="category-header">
              <span className="category-name">{category.categoryName}</span>
              <span className="allocated-amount">
                Allocated: ₹ {category.allocatedAmount.toFixed(2)}
              </span>
            </div>

            <p className="description">
              {category.description || "No description provided."}
            </p>

            <div className="category-details">
              <span className="spent-amount">
                Spent: ₹ {category.spentAmount ? category.spentAmount.toFixed(2) : "0.00"}
              </span>

              <span
                className={`remaining-amount ${
                  category.allocatedAmount - (category.spentAmount || 0) < 0
                    ? "overspent"
                    : ""
                }`}
              >
                Remaining: ₹ {(category.allocatedAmount - (category.spentAmount || 0)).toFixed(2)}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(category._id || category.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSummary;
