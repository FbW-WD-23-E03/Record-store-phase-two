import express from "express";

import { login, signup, getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers).post("/signup", signup).post("/login", login);

export default router;
