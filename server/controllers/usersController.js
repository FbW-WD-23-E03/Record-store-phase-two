import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import successHandler from "../middlewares/successHandler.js";

export const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const newCart = await Cart.create({});

    user.cartId = newCart._id;
    await user.save();

    successHandler(res, 201, user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    successHandler(res, 202, user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("cartId");
    successHandler(res, 200, users);
  } catch (error) {
    next(error);
  }
};
