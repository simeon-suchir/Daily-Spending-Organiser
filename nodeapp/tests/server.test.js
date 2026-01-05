const request = require('supertest');
const express = require('express');

// Import the routes directly
const categoryRoutes = require('../routes/categoryRoutes');

// Mock controller functions
jest.mock('../controllers/categoryController', () => ({
  getAllCategories: jest.fn(),
  addCategory: jest.fn(),
  deleteCategory: jest.fn(),
  getBudgetSummary: jest.fn(),
}));

const categoryController = require('../controllers/categoryController');

// Setup express app with mocked routes
const app = express();
app.use(express.json());
app.use('/api/categories', categoryRoutes);

describe("Category API Tests (Mocked)", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset mocks
  });

  // 1. Get empty categories
  test("GET /api/categories should return empty list initially", async () => {
    categoryController.getAllCategories.mockImplementation((req, res) => {
      res.json([]);
    });

    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    expect(categoryController.getAllCategories).toHaveBeenCalled();
  });

  // 2. Add a valid category
  test("POST /api/categories should add a category", async () => {
    const mockCategory = { id: 1, categoryName: "Groceries", allocatedAmount: 500, description: "Food" };

    categoryController.addCategory.mockImplementation((req, res) => {
      res.json(mockCategory);
    });

    const res = await request(app)
      .post('/api/categories')
      .send({ categoryName: "Groceries", allocatedAmount: 500, description: "Food" });

    expect(res.status).toBe(200);
    expect(res.body.categoryName).toBe("Groceries");
    expect(categoryController.addCategory).toHaveBeenCalled();
  });

  // 3. Add invalid (empty) category
  test("POST /api/categories with empty body should return 400", async () => {
    categoryController.addCategory.mockImplementation((req, res) => {
      res.status(400).json({ error: "Invalid category" });
    });

    const res = await request(app).post('/api/categories').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid category");
  });

  // 4. Get categories after adding
  test("GET /api/categories should return added categories", async () => {
    const mockList = [{ id: 1, categoryName: "Travel", allocatedAmount: 1000 }];
    categoryController.getAllCategories.mockImplementation((req, res) => {
      res.json(mockList);
    });

    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body[0].categoryName).toBe("Travel");
  });

  // 5. Delete existing category
  test("DELETE /api/categories/:id should delete category", async () => {
    categoryController.deleteCategory.mockImplementation((req, res) => {
      res.json({ message: "Category deleted" });
    });

    const res = await request(app).delete('/api/categories/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Category deleted");
  });

  // 6. Delete non-existing category
  test("DELETE /api/categories/:id should return 404 if not found", async () => {
    categoryController.deleteCategory.mockImplementation((req, res) => {
      res.status(404).json({ error: "Category not found" });
    });

    const res = await request(app).delete('/api/categories/9999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Category not found");
  });

  // 7. Get budget summary with spent = 0
  test("GET /api/categories/summary should return correct summary", async () => {
    const summary = [{ categoryName: "Health", allocatedAmount: 300, spentAmount: 0, remainingAmount: 300 }];
    categoryController.getBudgetSummary.mockImplementation((req, res) => {
      res.json(summary);
    });

    const res = await request(app).get('/api/categories/summary');
    expect(res.status).toBe(200);
    expect(res.body[0].remainingAmount).toBe(300);
  });

  // 8. Get budget summary with multiple categories
  test("GET /api/categories/summary with multiple categories", async () => {
    const summary = [
      { categoryName: "Shopping", allocatedAmount: 400, spentAmount: 50, remainingAmount: 350 },
      { categoryName: "Entertainment", allocatedAmount: 600, spentAmount: 100, remainingAmount: 500 },
    ];
    categoryController.getBudgetSummary.mockImplementation((req, res) => {
      res.json(summary);
    });

    const res = await request(app).get('/api/categories/summary');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  // 9. Add category with missing fields
  test("POST /api/categories with only name should still work", async () => {
    const mockCategory = { id: 2, categoryName: "Misc", allocatedAmount: 0, description: "" };
    categoryController.addCategory.mockImplementation((req, res) => {
      res.json(mockCategory);
    });

    const res = await request(app).post('/api/categories').send({ categoryName: "Misc" });
    expect(res.status).toBe(200);
    expect(res.body.allocatedAmount).toBe(0);
  });

  // 10. Invalid route
  test("Invalid route should return 404", async () => {
    const res = await request(app).get('/api/wrongpath');
    expect(res.status).toBe(404);
  });
});
