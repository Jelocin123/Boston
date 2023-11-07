import React, { useState, useEffect, useRef } from "react";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import styles from "../../styles/slider.module.scss";
import SliderModalAdd from "../modal/sliderModalAdd";
import DeleteSlider from "../modal/sliderModalDelete";
import { useUserContext } from "../../providers/userProvider";




const Slider = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [mySlider, setMySlider] = useState([]);
  const sliderRef = useRef(null);



  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeSlideID, setActiveSlideID] = useState(null);





  const handleSlideChange = (newIndex) => {
    setActiveSlideIndex(newIndex);
  };
  

  const { user } = useUserContext();



  useEffect(() => {
    makeRequest("http://localhost:5039/slider");
  }, []);
  useEffect(() => {
    if (data) {


      setMySlider(data);

      
     
       setTimeout(() => {
        const nextButton = document.querySelector('.carousel-control-next');
        if (nextButton) {
          nextButton.click();
        }
      }, 1000);
    }
  }, [data]);


  

  useEffect(() => {
    if (mySlider.length > 0) {
      setActiveSlideID(mySlider[activeSlideIndex]._id);
    }
  
    const handleSlide = (event) => {
      if (event && event.to) {
        setActiveSlideID(mySlider[event.to]._id);
      }
    };
  
    if (sliderRef.current) {
      sliderRef.current.addEventListener("slide.bs.carousel", handleSlide);
  
      return () => {
        
        if (sliderRef.current) {
          sliderRef.current.removeEventListener("slide.bs.carousel", handleSlide);
        }
      };
    }
  }, [mySlider, activeSlideIndex]);
  return (
    <div className="slider-container">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <>
          {mySlider.length > 0 && (
            <div
              id="imageSlider"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="5000"

              ref={sliderRef}
        
            >
              <div className="carousel-inner">
            
                
                {mySlider.map((slide, index) => (
                  <div
                    id={styles.sliderContainer}
                    key={slide._id}
                    className={`carousel-item col-12 ${
                      index === 0 ? "active" : ""
                    }`}

                  >
                    <img
                      src={
                        "http://localhost:5039/images/slider/" +
                        slide.sliderimage
                      }
                      alt="Slide"
                      className="img-fluid mt-lg-0 mt-3"
                    />
                    <div className={`${styles.overlay}`}>
                      <div className={`${styles.slider_content} p-4`}>
                        <h1 className="text-center text-white ">
                          Boston Gaming
                        </h1>

                        <div className={styles.twoLinesWithStar}>
                          <div className={styles.line}></div>
                          <div className={styles.star}>
                            <i className="bi bi-star-fill"></i>
                          </div>
                          <div className={styles.line}></div>
                        </div>

                        <p className={`${styles.slider_text} mt-3`}>
                          {slide.alttext}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#imageSlider"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon  "
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a
                className="carousel-control-next "
                href="#imageSlider"
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon  "
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </a>
              
            </div>

            
            
          )}
          
          {user && (
              <>
               <article className="row d-flex mt-4 justify-content-center ">
                <SliderModalAdd />
                <DeleteSlider  activeSlideID={activeSlideID} />
             

                
               </article>
              </>
            )}
            
        </>
      )}
      
    </div>
  );
};
export default Slider;