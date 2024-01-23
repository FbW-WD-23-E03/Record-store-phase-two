import React, { useContext } from "react";
import CartItemsList from "./CartItemsList";
import { motion } from "framer-motion";
import { DataContext } from "../../store/context";

const CartContainer = ({ handleToggleCart }) => {
  const { cartsState } = useContext(DataContext);

  const getTotalPrice = () =>
    cartsState.items.reduce(
      (total, item) => total + item.record?.price * item.quantity,
      0
    );

  return (
    <motion.div
      initial={{ y: -1000, x: 100 }}
      animate={{ y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cartsState.isOpen && (
        <div
          className='cart-sidebar'
          style={{ height: "100vh", transition: "1s" }}
        >
          <button
            type='button'
            className='close-button'
            onClick={handleToggleCart}
          >
            &times;
          </button>
          {cartsState.items ? (
            <>
              <p className='cart-price'>Total: €{getTotalPrice()}</p>
              <div className='cart-body'>
                <CartItemsList />
              </div>
            </>
          ) : (
            <>
              <p className='cart-price'>Total: €0</p>
              <div className='cart-body'>
                <p className='cart-empty'>The silence is deafening here!</p>
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
