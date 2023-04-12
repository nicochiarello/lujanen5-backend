import Blogs from "../models/Blogs.js";
import Categories from "../models/Categories.js";
import { unlinkSync } from "fs";
import { unlink } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { readdir } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAll = async (req, res) => {
  const page = req.query.page || 1;
  const itemPerPage = 25;
  // const sort = req.query.sort || date
  try {
    const getAll = await Blogs.find()
      .sort({ createdAt: -1 })
      .limit(itemPerPage)
      .skip((page - 1) * itemPerPage)
      .populate("category", "title")
      .exec();

    const totalItems = await Blogs.countDocuments();
    const totalPages = Math.ceil(totalItems / itemPerPage);

    res
      .status(200)
      .json({ blogs: getAll, nbHits: getAll.length, totalPages, totalItems });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const create = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const createdBlog = await new Blogs({ ...req.body, img: fileName });

    const foundCategory = await Categories.findById(req.body.category);
    const addBlogRefToCategory = foundCategory.blogs.push(createdBlog._id);

    await foundCategory.save();

    await createdBlog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const fileName = req.file?.filename;

  try {
    const updatedObject = req.body;
    if (fileName) {
      updatedObject.img = fileName;
    }

    const updated = await Blogs.findByIdAndUpdate(id, updatedObject, {
      returnOriginal: false,
    });

    res.status(200).json({ msg: `Post ${id} Updated`, post: updated });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const foundBlog = await Blogs.findById(id);
    let imgFile = foundBlog.img;

    const directoryPath = path.join(__dirname, "../public/images/");
    unlinkSync(directoryPath + imgFile);
    await foundBlog.delete();

    res.status(200).json(`Post ${id} deleted`);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteAllPost = async (req, res) => {
  try {
    let directory = path.join(__dirname, "../public/images/");
    readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
    await Blogs.deleteMany({});
    res.status(200).json("all files were deleted");
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getSingle = async (req, res) => {
  try {
    const getSingleItem = await Blogs.findById(req.params.id).populate(
      "category",
      "title"
    );

    const getLatest = await Blogs.find({}).limit(10);

    res.status(200).json({ blog: getSingleItem, latest: { blogs: getLatest, title: "Recomendados:" } });
  } catch (error) {
    res.status(404).json({ error });
  }
};
