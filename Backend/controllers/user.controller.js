import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import { Parser } from "json2csv";
import fs from 'fs/promises';

// Create User Controller
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, age, phone } = req.body;

    let imageUrl = "";

    // If file exists, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      // Remove image from tempory storage(uploads);
      await fs.unlink(req.file.path); 
    }

    //Create new User
    const user = await User.create({
      firstName,
      lastName,
      email,
      age,
      phone,
      profileImage: imageUrl,
    });

    // Send success response
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Users with Pagination + Search
export const getUsers = async (req, res) => {
  try {
    // Get page, limit and search from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    // How many data we have to skip for the current page
    const skip = (page - 1) * limit;

    // Search filter
    const searchFilter = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    };

    // If not search return all
    const filter = search ? searchFilter : {};

    // Get total count
    const totalUsers = await User.countDocuments(filter);

    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalUsers, // Total users in DB
      totalPages: Math.ceil(totalUsers / limit), // Total pages
      currentPage: page, // Confirming which page they are on
      users, // The actual array of 5 user objects
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Get Single User By ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, age, phone } = req.body;

    // Find user by id in DB
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let imageUrl = user.profileImage;

    // If new image uploaded
    if (req.file) {
      // if image exists Delete old image from Cloudinary
      if (user.profileImage) {
        const publicId = user.profileImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      // Remove image from tempory storage(uploads);
      await fs.unlink(req.file.path); 
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.age = age || user.age;
    user.phone = phone || user.phone;
    user.profileImage = imageUrl;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete image from Cloudinary if exists
    if (user.profileImage) {
      const publicId = user.profileImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await user.deleteOne();

    // Success message
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

// Export Users to CSV
export const exportUsersToCSV = async (req, res) => {
  try {

    // Get all users but only pick the columns we want to show
    const users = await User.find().select(
      "firstName lastName email age phone createdAt",
    );

    // If the database is empty stop and send an error
    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    
    // Define the column headers for the top of the spreadsheet
    const fields = [
      "firstName",
      "lastName",
      "email",
      "age",
      "phone",
      "createdAt",
    ];
    
    // Create a translator to turn JSON into CSV text
    const json2csv = new Parser({ fields });

    // Convert the user data from the database into a CSV string
    const csv = json2csv.parse(users);

    // Tell the browser the data is a CSV file
    res.header("Content-Type", "text/csv");

    // Tell the browser Download this as a file named users.csv
    res.attachment("users.csv");

    // Actually send the converted data to the user
    return res.send(csv);
  } catch (error) {
    res.status(500).json({
      message: "Error exporting users",
      error: error.message,
    });
  }
};
