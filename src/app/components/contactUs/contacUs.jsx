import React, { useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import styles from "../../styles/contactUs.module.scss";
import DeleteMessageModal from "../modal/deleteMessageModal";
import { useUserContext } from "../../providers/userProvider";


const contacUs = () => {
  const { isLoading, error, makeRequest } = useRequestData();
  const { user } = useUserContext();


  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const handleNewContact = () => {


    const formData = new FormData();
    formData.append("name", newContact.name);
    formData.append("email", newContact.email);
    formData.append("phonenumber", newContact.phonenumber);
    formData.append("message", newContact.message);

    makeRequest("http://localhost:5039/contact", null, null, "POST", formData)
      .then(() => {
        window.alert(`Din besked er blevet sendt:)`, window.location.reload());
        // window.location.reload();
      })
      .catch((addError) => {
        window.alert("Der skete en Fejl", addError);
      });
  };

  return (
    <>
      <div className="container p-5" id={styles.contactUsContainer}>
        <article className="row" id="contactUs">
          <section>
            <h2 className="text-center text-white mt-md-5">Contact Us</h2>
            <div className={styles.twoLinesWithStar}>
              <div className={styles.line}></div>
              <div className={styles.star}>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className={styles.line}></div>
            </div>
          </section>
        </article>

        <article className="row">
          <form onSubmit={handleNewContact}>
            <div className="row" id={styles.contactUs}>
              <div className="col-12 mt-5 ps-0">
                <div className="form-group">
                  <input
                    type="text"
                    onChange={(e) => 
                    setNewContact({...newContact, name: e.target.value})}
                    className="form-control ps-0 "
                    id={`name ${styles.inputBorder}`}
                    name="Name"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <hr className="mt-lg-3" />
              <div className="col-12 mt-2 ps-0">
                <div className="form-group">
                  <input
                    type="text"
                    onChange={(e) => 
                      setNewContact({...newContact, email: e.target.value})}
                    className="form-control ps-0"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>
              <hr className="mt-lg-3" />

              <div className="col-12 mt-2 ps-0">
                <div className="form-group">
                  <input
                    type="number"
                    onChange={(e) => 
                      setNewContact({...newContact, phonenumber: e.target.value})}
                    className="form-control ps-0"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>
              <hr className="mt-lg-3" />

              <div className="col-12 ps-0">
                <div className="form-group">
                  <textarea
                    className="col-12"
                    onChange={(e) => 
                      setNewContact({...newContact, message: e.target.value})}
                    name="message"
                    id="message"
                    placeholder="Message"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <hr className="mt-lg-3" />
              
              <article className="row">
              <section className="col-2 col-lg-1 col-xl-1 col-sm-1 col-md-1 p-0 ">
                <button type="submit" className={`btn btn-primary  ${styles.contactBtn}`}>
                  Send
                </button>
                </section>
                <section className="col-2 col-lg-1 col-xl-1 col-sm-1 col-md-1 p-0">
                
                {user && (
                  <DeleteMessageModal/>
                )}
               </section>
                
              
              </article>
              
            </div>
            
          </form>
        </article>
      </div>

      {isLoading && <Loader />}
      {error && <Error message={error} />}
    </>
  );
};

export default contacUs;
