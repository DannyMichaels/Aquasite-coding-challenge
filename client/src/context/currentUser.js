import React, { createContext, useReducer, useContext } from 'react';

const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const initialState = {
    currentUser: null,
  };

  const currentUserReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          currentUser: action.currentUser,
        };
      case 'EDIT_USER':
        return { currentUser: action.currentUser };
      case 'REMOVE_USER':
        return { currentUser: null };
      default:
        return state;
    }
  };

  return (
    <CurrentUserContext.Provider
      value={useReducer(currentUserReducer, initialState)}>
      {children}
    </CurrentUserContext.Provider>
  );
}

const useStateValue = () => useContext(CurrentUserContext);
export { CurrentUserContext, CurrentUserProvider, useStateValue };
