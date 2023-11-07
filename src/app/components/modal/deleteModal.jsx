import React, { useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const DeleteModal = ({ title, id }) => {
  const {isLoading, error, makeRequest } = useRequestData(); 

  const handleDelete = () => {
    makeRequest(
      `http://localhost:5039/product/admin/${id}`,
      null,
      null,
      "DELETE"
    )
      .then(() => {
        window.alert(`Product "${title}" with ID ${id} has been deleted.`);
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
        className="btn btn-danger col-md-4 col-xl-3 col-5 ms-1 text-nowrap"
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal-${id}`}
      >
        <i className="bi bi-trash"></i> Delete
      </button>

      <div
        className="modal fade"
        id={`deleteModal-${id}`}
        tabIndex="-1"
        aria-labelledby={`deleteModalLabel-${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`deleteModalLabel-${id}`}>
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
                      {title} - <small>{id}</small>
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
