"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserContext } from "../providers/userProvider";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [error, setError] = useState(null); 
  const router = useRouter();
  const { handleLogin } = useUserContext();

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const success = await handleLogin(loginInfo);
    if (success) {
      router.push("/"); 
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };
  
  

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
              <h1>Login</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" name="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" name="password" />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
