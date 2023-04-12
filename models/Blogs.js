import mongoose from 'mongoose'


const Blog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    copete: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: false
    },
    img: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Blogs", Blog)