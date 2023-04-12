import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {
  const token = req.get("token");
  try {
    let decodedtoken = await jwt.verify(token, process.env.SECRET);

    if (decodedtoken) {
      let user = await User.findById(decodedtoken.userId);
      next();
    } else {
      res.status(401).json({ message: "incorrect token" });
    }

  } catch (error) {
    res.status(500).json({ message: error });
  }
};
