import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");  // 🟢 added username state


  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const savedUserName = localStorage.getItem("userName"); // retrieve username
    setIsLoggedIn(loginStatus === "true");
    if (savedUserName) setUserName(savedUserName);
  }, []);

  const login = (username) => {  // ✅ accept username
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", username);  // ✅ save username
    setIsLoggedIn(true);
    setUserName(username);  // ✅ update state
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName"); // ✅ clear username
    setIsLoggedIn(false);
    setUserName(""); // ✅ clear state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
    {children}
  </AuthContext.Provider>
  );
};
