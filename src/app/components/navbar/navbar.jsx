"use client"
import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar.module.scss";
import { useUserContext } from "../../providers/userProvider"; 
import LoginModal from "../modal/loginModal";

const Navbar = () => {
  const {user, handleSignOut} = useUserContext();


  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-body-tertiary">
        <div className="container" id={styles.navContainer}>
          <Link className="navbar-brand" href={`/`}>
            <img className="img-fluid col-2 me-2" src="/favicon.ico" alt="" />{" "}
            Boston Gaming
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end "
            id="navbarNav"
          >


            <ul className="navbar-nav" id={styles.ulList}>
              <li className="nav-item">
                <a className="nav-link border-button" aria-current="page" href="#products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#designYourOwnRig">
                  Design your own
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contactUs">
                  Contact
                </a>
              </li>
         
        <li className="nav-item">
        {
            user === undefined ? <LoginModal/> : <div className="d-flex text-nowrap  "><a className="text-decoration-none nav-link"  id={styles.logIn} href={`/admin`}>{user.name} </a> <button id={styles.signOut} onClick={handleSignOut} className="btn btn-dark   ms-3 p-1 pt-0 pb-0">Sign out</button></div>
           
        }
        </li>
      

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
