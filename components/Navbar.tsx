"use client";

import React, { useContext, useState } from "react";
import { MyContext } from "@/context/MyContextProvider";

export default function Navbar() {
  // ✅ Hook'lar koşulsuz tanımlanmalı
  const context = useContext(MyContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Koşullu render yalnızca return seviyesinde yapılmalı
  if (!context) return null;

  const { value, setValue } = context;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      setValue(`Welcome, ${username}!`);
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setValue("Hello");
    setUsername("");
    setPassword("");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-blue-600 text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl font-light">havalogic</h1>
      <div className="flex items-center gap-4">
        <span>{value}</span>

        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-2 py-1 rounded text-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-1 rounded text-black"
              required
            />
            <button
              type="submit"
              className="px-3 py-1 bg-white text-blue-600 rounded"
            >
              Login
            </button>
          </form>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-white text-blue-600 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
