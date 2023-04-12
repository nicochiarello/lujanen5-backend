import mongoose from "mongoose";

const CategoriesModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }]
})

export default mongoose.model("Categories", CategoriesModel)