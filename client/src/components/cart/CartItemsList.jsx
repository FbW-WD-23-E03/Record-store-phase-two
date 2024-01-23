import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { DataContext } from "../../store/context";
import { deleteCartItem, getCartData } from "../../apiCalls/cartsApiCalls";

const CartItemsList = () => {
  const { cartsState, dispatchCarts, usersState } = useContext(DataContext);

  const deleteFromCartHandler = async (recordId) => {
    const cartId = usersState.user?.cartId;

    if (cartsState && cartsState.items) {
      await deleteCartItem(dispatchCarts, recordId, cartId);
    }
  };
  return (
    <ul className='cart-items-list'>
      {cartsState.items.length > 0 &&
        cartsState.items?.map(({ record, quantity }) => {
          const { _id, title, artist, img } = record;

          return (
            <li key={_id} className='cart-item'>
              <h3 className='cart-item__title'>
                {title} by {artist}
              </h3>

              <img src={img} alt='thumbnail' className='cart-item__thumbnail' />

              <div className='cart-item__actions'>
                <div className='cart-item__quantity'>{quantity}</div>

                <MdDelete
                  className='cart-item__remove'
                  onClick={() => deleteFromCartHandler(_id)}
                />
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CartItemsList;
