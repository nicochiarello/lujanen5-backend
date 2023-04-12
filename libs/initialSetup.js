import User from "../models/User.js";
import bcrypt from "bcrypt"

export const createUser = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) {
      return;
    }
    const user = {
      email: "admin@lujanen5.com", 
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_USER_PASSWORD, 12);
    user.password = hashedPassword
    const newUser = await new User(user)
    await newUser.save()
  } catch (error) {
    console.log(error)
  }
}
