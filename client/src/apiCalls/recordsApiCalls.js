import axios from "axios";

const getAllRecords = async (dispatchRecords) => {
  try {
    const response = await axios.get("http://localhost:8000/records");

    dispatchRecords({
      type: "FETCH_RECORDS_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default getAllRecords;
