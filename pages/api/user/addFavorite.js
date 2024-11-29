import jwt from "jsonwebtoken";
import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Ensure the user is authenticated by checking for JWT in the Authorization header
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { username } = decoded;

      // Get the photo ID from the request body
      const { photoId } = req.body;
      if (!photoId) {
        return res.status(400).json({ message: "Photo ID is required" });
      }

      // Connect to the database
      await connectToDatabase();

      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the photo is already in favorites
      if (user.favoritePhotos.includes(photoId)) {
        return res.status(400).json({ message: "Photo already in favorites" });
      }

      // Add the photo ID to the user's favoritePhotos array
      user.favoritePhotos.push(photoId);
      await user.save();

      // Return the updated user data
      return res.status(200).json({
        message: "Photo added to favorites",
        favoritePhotos: user.favoritePhotos,
      });
    } catch (err) {
      console.error("Error adding photo to favorites:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ message: "Method not allowed" });
  }
}
