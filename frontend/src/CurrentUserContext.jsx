import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children, currentUser: propCurrentUser  }) {
    const [currentUser, setCurrentUser] = useState(propCurrentUser || null);

    /** Update current user state */
  function updateCurrentUser(updatedUser) {
    setCurrentUser(updatedUser);
  }

    return (
      <CurrentUserContext.Provider value={{currentUser, updateCurrentUser}}>
        {children}
      </CurrentUserContext.Provider>
    );
  }