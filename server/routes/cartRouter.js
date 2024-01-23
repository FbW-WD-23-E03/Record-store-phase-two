import express from "express";

import {
  getCart,
  addCartItem,
  deleteCartItemById,
  updateItemFieldById,
} from "../controllers/cartController.js";

const router = express.Router();

router
  .route("/:id")
  .get(getCart)
  .post(addCartItem)
  .put(deleteCartItemById)
  .patch(updateItemFieldById);

export default router;
