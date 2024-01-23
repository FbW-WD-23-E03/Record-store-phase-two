import { createContext, useEffect, useReducer } from "react";
import { recordsInitialState, recordsReducer } from "./reducers/recordsReducer";
import getAllRecords from "../apiCalls/recordsApiCalls";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";
import { cartsInitialState, cartsReducer } from "./reducers/cartReducer";
import { getCartData } from "../apiCalls/cartsApiCalls";

export const DataContext = createContext();

const ContextProvider = ({ children }) => {
  const [usersState, dispatchUsers] = useReducer(
    usersReducer,
    usersInitialState
  );

  const [cartsState, dispatchCarts] = useReducer(
    cartsReducer,
    cartsInitialState
  );

  const [recordsState, dispatchRecords] = useReducer(
    recordsReducer,
    recordsInitialState
  );

  const { user, isUserLoggedIn } = usersState;

  useEffect(() => {
    getAllRecords(dispatchRecords);
  }, []);

  useEffect(() => {
    if (isUserLoggedIn && user.cartId) {
      getCartData(dispatchCarts, user.cartId);
    }
  }, [isUserLoggedIn, user.cartId]);

  return (
    <DataContext.Provider
      value={{
        recordsState,
        dispatchRecords,
        usersState,
        dispatchUsers,
        cartsState,
        dispatchCarts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
