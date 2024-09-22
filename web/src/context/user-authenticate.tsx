import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
const UserSessionContext = createContext({});

type UserSessionProviderProps = {
  children: ReactNode;
};

export function UserSessionProvider({ children }: UserSessionProviderProps) {
  const [user, setUser] = useState({});

  console.log("aa", Cookies.get("user-token"));

  return (
    <UserSessionContext.Provider value={{}}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useSession() {
  return useContext(UserSessionContext);
}
