import React, { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import styles from "../../styles/footer.module.scss";
import { useUserContext } from "../../providers/userProvider";
import EditFooterModal from "../modal/editFooterModal";


const Footer = () => {
  const { data, makeRequest } = useRequestData();



  useEffect(() => {
    makeRequest("http://localhost:5039/footer");
  }, []);

  const { user } = useUserContext();


  
  return (
    <>
    <div className="container-fluid" id={styles.footerContainer}>
      <div className="container pt-5 pb-5">
        <article className="row text-center pt-4 pb-4 justify-content-center ">
          <section className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3">
            <h4 className={styles.footerH4}>Location</h4>
            {data && (
              <div>
              <p className={`mb-0 ${styles.aboutP}`} dangerouslySetInnerHTML={{ __html: data?.location }}/>
              </div>
            )}
            
          </section>
          <section className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3">
            <h4 className={styles.footerH4}>Around the web</h4>
            <div className="d-flex justify-content-center">
              <a href="#" className="text-white border rounded-circle p-2" id={styles.icon_link}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white  border rounded-circle p-2 " id={styles.icon_link}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white border rounded-circle p-2" id={styles.icon_link}>
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-white border rounded-circle p-2" id={styles.icon_link}>
                <i className="bi bi-dribbble"></i>
              </a>
            </div>
          </section>
          <section className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3">
            <h4 className={styles.footerH4}>About boston gaming</h4>
            {data && (
             
              <div>
                <p className={styles.aboutP} dangerouslySetInnerHTML={{ __html: data?.about }}/>
              </div>
             
            ) }
          </section>

          
         
        </article>
        {user && data && (
            <article className="row d-flex justify-content-center ">
            <EditFooterModal about={data.about} location={data.location}/>
            </article>
            
          )}
      </div>
      <article className="row justify-content-center " id={styles.copyRight}>
        <section className="col-12 mt-3 mb-2 text-white text-center">CopyRight &#169; Bostion Gaming</section>
      </article>
    </div>
    
    </>
  );
};

export default Footer;
