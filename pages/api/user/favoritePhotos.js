import jwt from "jsonwebtoken";
import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // 1. Extract token from the Authorization header
      const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token is missing" });
      }

      // 2. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Connect to the database
      await connectToDatabase();

      // 4. Find the user by username (which is stored in the decoded token)
      const user = await User.findOne({ username: decoded.username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 5. Get the user's favorite photos
      const favoritePhotos = user.favoritePhotos || [];

      // 6. Return the list of favorite photos
      res.status(200).json({ favoritePhotos });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method not allowed" });
  }
}
