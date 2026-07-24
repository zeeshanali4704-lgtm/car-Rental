import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import {
  addCar,
  changeRoleToOwner,
  deletecar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/ownerControllers.js";

const ownerRouter = express.Router();

// Change role
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Add car
ownerRouter.post(
  "/add-car",
  protect,
  upload.single("image"),
  addCar
);

// Owner Cars
ownerRouter.get("/cars", protect, getOwnerCars);

// Dashboard
ownerRouter.get("/dashboard", protect, getDashboardData);

// Update Profile Image
ownerRouter.post(
  "/update-image",
  protect,
  upload.single("image"),
  updateUserImage
);

// Toggle Availability
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);

// Delete Car
ownerRouter.post("/delete-car", protect, deletecar);

export default ownerRouter;