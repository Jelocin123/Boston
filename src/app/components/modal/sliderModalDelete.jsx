import React, { useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const DeleteModal = ({ activeSlideID   }) => {
  const {isLoading, error, makeRequest } = useRequestData(); 
  const [currentId, setCurrentID] = useState(null);
 
  // console.log(activeSlideID)

  const setId = () => {
    // console.log("poul")
    setCurrentID(activeSlideID)
    // console.log(currentId)
  }

  const handleDelete = () => {
    makeRequest(
      `http://localhost:5039/slider/admin/${currentId}`,
      null,
      null,
      "DELETE"
    )
      .then(() => {
        window.alert(`Slider with ID ${activeSlideID} has been deleted`);
        window.location.reload();
      })
      .catch((deleteError) => {
        console.error("Error deleting product:", deleteError);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger col-md-2 col-xl-1 col-5 ms-1 text-nowrap"
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal-${activeSlideID}`}
        onClick={setId}
      >
        <i className="bi bi-trash"></i> Delete
      </button>

      <div
        className="modal fade"
        id={`deleteModal-${activeSlideID}`}
        tabIndex="-1"
        aria-labelledby={`deleteModalLabel-${activeSlideID}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`deleteModalLabel-${activeSlideID}`}>
                Delete Product
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
                  <h6 className="">Delete the product with Title and ID:</h6>

                  <p>
                    <span className="fw-bold ">
                      {currentId} 
                    </span>
                  </p>
                </section>
                <section className="col-6"></section>
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
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
      {error && <Error message={error} />} 
    </>
  );
};

export default DeleteModal;