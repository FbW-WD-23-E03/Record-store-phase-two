import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export default model("User", userSchema);
