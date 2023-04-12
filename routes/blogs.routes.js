import { Router } from "express";
import { upload } from "../utils/multer.js";
import {
  create,
  getAll,
  updatePost,
  deleteAllPost,
  getSingle,
  deleteBlog,
} from "../controllers/blogs.js";
import { auth } from "../middlewares/auth.js";
const router = Router();

//Get all posts
router.get("/", getAll);
//Get simple blog
router.get("/:id", getSingle);
//Create post
router.post("/create", auth, upload.single("img"), create);
// //Edit post
router.put("/update/id/:id", auth, upload.single("img"), updatePost);
//Delete post
router.delete("/delete/:id", auth, deleteBlog);

//Delete all posts!

router.delete("/deleteAll", auth, deleteAllPost);

export default router;
