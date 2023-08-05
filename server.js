
import dotenv from "dotenv"
import connectionDb from "./config/db.js"
import cloudinary from "cloudinary"
import app from "./app.js"
dotenv.config();
//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Database
connectionDb()

app.listen(5000, () => {
    console.log("app is running")
})