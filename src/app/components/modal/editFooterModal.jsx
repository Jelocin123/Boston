import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css"; 
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";


const EditFooterModal = ({ about, location }) => {
  const { isLoading, error, makeRequest } = useRequestData();



  const [editedFooter, setEditedFooter] = useState({
    about: about,
    location: location,
  });

  

 const handleSubmit = () => {
    
    const formData = new FormData();
    formData.append('about', editedFooter.about);
    formData.append('location', editedFooter.location);


    makeRequest('http://localhost:5039/footer/admin', null, null, 'PUT', formData)
      .then(() => {
        window.alert('Footer er nu blevet rettet');
        window.location.reload();
       
      })
      .catch((editError) => {
        console.error('Error editing Footer:', editError);
      });
   
 }


  



  return (
    <>
      <button
        type="button"
        className="btn btn-primary col-3 me-1"
        data-bs-toggle="modal"
        data-bs-target={`#editFooterModal`}
      >
        <i className="bi bi-pen"></i> Edit
      </button>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (

      <div
        className="modal fade"
        id={`editFooterModal`}
        tabIndex="-1"
        aria-labelledby={`editFooterModalLabel`}
        aria-hidden="true"
        
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editFooterModalLabel`}>
                Edit About
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                
                <article className="row">
                    <section className="col-12">
                    <h4>About</h4>
                    <ReactQuill  defaultValue={editedFooter.about} onChange={(value) =>
                      setEditedFooter({ ...editedFooter, about: value })
                    }/>
                    </section>
                    <section className="col-12 mt-3">
                    <h4>Location</h4>
                    <ReactQuill defaultValue={editedFooter.location} onChange={(value) =>
                      setEditedFooter({ ...editedFooter, location: value })
                    }/>
                    </section>
                    </article>

                   
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

    )}
    </>
  );
};

export default EditFooterModal;
