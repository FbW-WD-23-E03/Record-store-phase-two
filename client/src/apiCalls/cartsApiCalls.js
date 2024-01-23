import axios from "axios";

//! Add an item to the cart
export const addCartItem = async (
  dispatchCarts,
  cartsState,
  record,
  cartId
) => {
  try {
    //! check for item existance in the state
    const itemToUpdate = cartsState.items?.find(
      (item) => item.record._id === record._id
    );

    /* 
   ! If item is exist: 
      * create patch request to update the quantity of the item in DB and increase it by one
      * Update the state with the new changes 
      * return to exit the function
   */
    if (itemToUpdate) {
      const response = await axios.patch(
        `http://localhost:8000/carts/${cartId}`,
        {
          quantity: itemToUpdate.quantity + 1,
          record: record._id,
        }
      );
      dispatchCarts({ type: "UPDATE_CART_ITEM", payload: response.data.data });
      return;
    }

    //! Otherwise submit the new item to the DB
    const response = await axios.post(`http://localhost:8000/carts/${cartId}`, {
      record: record._id,
      quantity: 1,
    });

    dispatchCarts({ type: "ADD_CART_DATA", payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};

//! Get all items from the cart
export const getCartData = async (dispatchCarts, cartId) => {
  try {
    const response = await axios.get(`http://localhost:8000/carts/${cartId}`);
    dispatchCarts({ type: "GET_CART_DATA", payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};

//! Delete an item from the cart by its ID
export const deleteCartItem = async (dispatchCarts, recordId, cartId) => {
  try {
    await axios.put(`http://localhost:8000/carts/${cartId}`, {
      record: recordId,
    });

    dispatchCarts({ type: "DELETE_FROM_CART", payload: recordId });
  } catch (error) {
    console.log(error);
  }
};
