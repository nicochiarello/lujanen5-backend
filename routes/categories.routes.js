import { Router } from "express";
import {
  getPopulatedItems,
  create,
  populatedCategoy,
  deleteAllBlogs,
  getAllcategories,
  deleteCategory,
  getSingleCategory,
} from "../controllers/categories.js";
import { auth } from "../middlewares/auth.js";
const router = Router();

//Get initial props for frontend
router.get("/populatedInfo", getPopulatedItems);

//Get single category info
router.get("/id/:id", getSingleCategory);

//Get all categories
router.get("/all", getAllcategories);

//Get categories with its blogs
router.get("/info/:id", populatedCategoy);

//Create post
router.post("/create", auth, create);

//Delete post
router.delete("/delete/id/:id", auth, deleteCategory);

// Delete all Categories!
router.delete("/deleteAll", deleteAllBlogs);

export default router;
