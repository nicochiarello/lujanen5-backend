import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const compare = await bcrypt.compare(password, userExists.password);
    if (compare) {
      const token = await jwt.sign(
        {
          email: userExists.email,
          userId: userExists._id.toString(),
        },
        process.env.SECRET
      );
      res.status(200).json({
        Token: token,
      });
    } else {
      res.status(400).json({ password: "Contraseña incorrecta" });
    }
  } else {
    res.status(400).json({ email: "El email no existe" });
  }
};
