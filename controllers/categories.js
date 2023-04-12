import Categories from "../models/Categories.js";
import Blogs from "../models/Blogs.js";

export const getPopulatedItems = async (req, res) => {
  try {
    const getLatetsItems = await Blogs.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .populate({ path: "category", select: "title" });
    const getCategories = await Categories.find().populate({
      path: "blogs",
      options: { sort: { createdAt: -1 } },
      perDocumentLimit: 10,
    });
    res.status(200).json({ latest: getLatetsItems, categories: getCategories });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllcategories = async (req, res) => {
  try {
    const categories = await Categories.find({}).select("title");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const create = async (req, res) => {
  try {
    const create = await new Categories(req.body);
    await create.save();

    res.status(201).json({ title: create.title, _id: create._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const populatedCategoy = async (req, res) => {
  try {
    const { id } = req.params;
    const page = req.query.page || 1;
    const itemPerPage = 3;

    const Category = await Categories.findById(id).select("title");
    const getBlogs = await Blogs.find({ category: Category._id })
      .sort({ createdAt: -1 })
      .limit(itemPerPage)
      .skip((page - 1) * itemPerPage);

    const totalItems = await Blogs.find({
      category: Category._id,
    }).countDocuments();
    const totalPages = Math.ceil(totalItems / itemPerPage);

    res.status(200).json({
      category: Category,
      blogs: getBlogs,
      totalPages,
      totalItems,
      nbHits: getBlogs.length,
    });
  } catch (error) {}
};

export const deleteCategory = async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteAllBlogs = async (req, res) => {
  try {
    let DeleteAllCategories = await Categories.deleteMany({});
    res.status(200).json("All categories were deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    let getCategory = await Categories.findOne({ _id: req.params.id }).select("title")
    res.status(200).json({ category: getCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};
