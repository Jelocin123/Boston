import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../providers/userProvider";

const LoginModal = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
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

      window.location.reload();
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById("loginModal");
    modalElement.addEventListener("hidden.bs.modal", () => {

      setLoginInfo({ email: "", password: "" });
      setError(null);
    });
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary me-1"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        Login
      </button>

      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginModalLabel">
                Login
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailLogin"
                    name="email"
                    value={loginInfo.email}
                    onChange={handleFormChange}
                    autoComplete="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleFormChange}
                    autoComplete="current-password"
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
