import express from "express";

import {
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
  updateUserById,
  uploadUserAvatar,
  processUserAvatar,
} from "../controllers/usersController.js";

import {
  signup,
  login,
  logout,
  protect,
  restrictTo,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.use(protect);

router
  .route("/:id")
  .get(getUserById)
  .patch(uploadUserAvatar, processUserAvatar, updateUserById)
  .delete(deleteUserById);

router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).delete(deleteAllUsers);

export default router;
