// src/services/api.js
const BASE_URL = "https://8080-aafbcdcbdfbbdcefbbdcadbeabaacebabb.premiumproject.examly.io/api/categories"; // backend URL

export const addCategory = async (category) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error(`Failed to add category: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getBudgetSummary = async () => {
  try {
    const response = await fetch(`${BASE_URL}/summary`);
    if (!response.ok) {
      throw new Error(`Failed to fetch summary: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching budget summary:", error);
    throw error;
  }

};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : { message: "Deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};




