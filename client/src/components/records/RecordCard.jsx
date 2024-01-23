import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { DataContext } from "../../store/context";
import { addCartItem, getCartData } from "../../apiCalls/cartsApiCalls";

const RecordCard = ({ record, index }) => {
  const { title, img, price, artist, year } = record;
  const { usersState, dispatchCarts, cartsState } = useContext(DataContext);

  const cartId = usersState.user?.cartId;

  const addToCartHandler = async (record) => {
    if (usersState.isUserLoggedIn) {
      await addCartItem(dispatchCarts, cartsState, record, cartId);
      await getCartData(dispatchCarts, cartId);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      className='record'
    >
      <div>
        <img className='record-img' src={img} alt='cartoon of record' />
      </div>

      <div className='record-info'>
        <p>{title}</p>
        <p>
          {artist} - {year}
        </p>
      </div>

      <div className='record-footer'>
        <p className='record-footer-price'>{price} €</p>
        <div className='record-footer-icon'>
          <FaShoppingCart onClick={() => addToCartHandler(record)} />
        </div>
      </div>
    </motion.div>
  );
};

export default RecordCard;
