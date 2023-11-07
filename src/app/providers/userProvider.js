"use client"
import React, { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
}

const userLogin = async (loginInfo) => {
  try {
    const response = await fetch(`http://localhost:5039/login/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(loginInfo),
    });

    if (response.status === 200) {
      const user = await response.json();
      return { success: true, user };
    } else {
      return { success: false, error: "Login failed. Please check your credentials." };
    }
  } catch (error) {
    return { success: false, error: "An error occurred while processing your request." };
  }
};



export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  const handleLogin = async (loginInfo) => {
    const result = await userLogin(loginInfo);
  
    if (result.success) {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    }
  
    return result.success;
  };

  const handleSignOut = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <UserContext.Provider value={{ user, handleLogin, handleSignOut }}>
      {children}
    </UserContext.Provider>
  )
}
