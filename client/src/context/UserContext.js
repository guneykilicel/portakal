import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {

      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false);
    toast.success("Logged out successfully!")
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        setAuth
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};