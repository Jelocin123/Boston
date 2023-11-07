import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

const EditAboutModal = ({ content1, content2 }) => {
  const { isLoading, error, makeRequest } = useRequestData();



  const [editedAbout, setEditedAbout] = useState({
    content1: content1,
    content2: content2,
  });

  

 const handleSubmit = () => {
    
    const formData = new FormData();
    formData.append('content1', editedAbout.content1);
    formData.append('content2', editedAbout.content2);


    makeRequest('http://localhost:5039/about/admin', null, null, 'PUT', formData)
      .then(() => {
        window.alert('About us er nu blevet rettet');
        window.location.reload();
       
      })
      .catch((editError) => {
        console.error('Error editing About us:', editError);
      });
   
 }


  



  return (
    <>
      <button
        type="button"
        className="btn btn-primary col-3 me-1"
        data-bs-toggle="modal"
        data-bs-target={`#editAboutModal`}
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
        id={`editAboutModal`}
        tabIndex="-1"
        aria-labelledby={`editAboutModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editAboutModalLabel`}>
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
                        <h4>Content 1</h4>
                    <ReactQuill defaultValue={editedAbout.content1} onChange={(value) =>
                      setEditedAbout({ ...editedAbout, content1: value })
                    }/>
                    </section>
                    <section className="col-12 mt-3">
                    <h4>Content 2</h4>
                    <ReactQuill defaultValue={editedAbout.content2} onChange={(value) =>
                      setEditedAbout({ ...editedAbout, content2: value })
                    } />
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

export default EditAboutModal;
