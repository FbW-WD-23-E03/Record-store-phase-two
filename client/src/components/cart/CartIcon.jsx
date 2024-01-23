import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartContainer from "./CartContainer";
import { DataContext } from "../../store/context";

const CartIcon = () => {
  const { cartsState, dispatchCarts } = useContext(DataContext);

  const handleToggleCart = () => dispatchCarts({ type: "TOGGLE_CART" });

  return (
    <div className='cart'>
      <button type='button' className='btn-cart' onClick={handleToggleCart}>
        <FaShoppingCart />
        <span className='items-amount'>
          {cartsState.items ? cartsState.items.length : 0}
        </span>
      </button>

      <CartContainer handleToggleCart={handleToggleCart} />
    </div>
  );
};

export default CartIcon;
