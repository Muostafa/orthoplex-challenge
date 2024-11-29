import bcrypt from "bcryptjs";
import connectToDatabase from "../../../lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    await connectToDatabase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
