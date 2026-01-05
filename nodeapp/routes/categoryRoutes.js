const express = require("express");
const {
  addCategory,
  getAllCategories,   
  getBudgetSummary,  
  deleteCategory
} = require("../controllers/categoryController.js");

const router = express.Router();

router.post("/", addCategory);
router.get("/", getAllCategories);        
router.get("/summary", getBudgetSummary); 
router.delete("/:id", deleteCategory); 

module.exports = router;