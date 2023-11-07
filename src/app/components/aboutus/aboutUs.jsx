import React, { useEffect, useState } from "react";
import styles from "../../styles/aboutUs.module.scss";
import useRequestData from "../../hooks/useRequestData";
import { useUserContext } from "../../providers/userProvider";
import EditAboutModal from "../modal/editAboutModal";


const AboutUs = () => {
  const { data, makeRequest } = useRequestData();


  useEffect(() => {
    makeRequest("http://localhost:5039/about");
  }, []);

  
 

  const { user } = useUserContext();


  return (
    <div className="container-fluid pb-4 pt-4 p-0 mt-5 mb-5" id={styles.aboutUsContainer}>
        <hr className="mt-4"/>
      <article className="row" id="about">
        <section>
          <h2 className="text-center text-white mt-md-5">About</h2>
          <div className={styles.twoLinesWithStar}>
            <div className={styles.line}></div>
            <div className={styles.star}>
              <i className="bi bi-star-fill"></i>
            </div>
            <div className={styles.line}></div>
          </div>
        </section>
      </article>
      <article className="row justify-content-center" id={styles.textBox}>
        <div className=" col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 p-5">
          <p dangerouslySetInnerHTML={{ __html: data?.content1 }}/>
        </div>
        <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 p-5">
          <p dangerouslySetInnerHTML={{ __html: data?.content2 }}/>
        </div>
      </article>

      {user && data && (
              <>
               <article className="row d-flex justify-content-center ">
               <EditAboutModal content1={data.content1} content2={data.content2}  />

               </article>
              </>
            )}
    </div>
  );
};

export default AboutUs;
