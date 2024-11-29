import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("hi");
    const { username, password } = req.body;

    await connectToDatabase();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "20d" }
    );

    res.status(200).json({ message: "Login successful!", token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
