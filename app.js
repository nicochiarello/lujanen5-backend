import express from "express";
import "./db/index.js";
import postRoutes from "./routes/blogs.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import cors from "cors";
import { createUser } from "./libs/initialSetup.js";
import { config } from "dotenv";
import loginRoute from "./routes/login.routes.js";

config();
const app = express();

//Creates user if not created yet
createUser();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/blogs", postRoutes);
app.use("/api/login", loginRoute);
app.use("/api/categories", categoriesRoutes);
app.use("/api", express.static("public"));

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome!</h1>");
// });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
