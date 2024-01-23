import successHandler from "../middlewares/successHandler.js";
import Record from "../models/recordModel.js";

export const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    successHandler(res, 200, records);
  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);
    successHandler(res, 200, record);
  } catch (error) {
    next(error);
  }
};
