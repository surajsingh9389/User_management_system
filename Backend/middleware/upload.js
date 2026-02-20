import multer from "multer";

// Configure storage engine for multer
const storage = multer.diskStorage({
  // Set destination folder
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // Rename file to avoid conflicts
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize upload middleware with image only valiation
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export default upload;
