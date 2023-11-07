import React, { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";



const DeleteMessageModal = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data:dataDelete, isLoading:isLoadingDelete, error:errorDelete, makeRequest:makeRequestDelete } = useRequestData();





  useEffect(() => {
    makeRequest("http://localhost:5039/contact/admin");
  }, [dataDelete]);

  const handleDelete = (id) => {
    makeRequestDelete(
        `http://localhost:5039/contact/admin/${id}`,
        null,
        null,
        "DELETE"
    )

    

    

    

    .catch((deleteError) => {
        console.error("Der skete en fejl", deleteError);
    });
  };




  return (
    <>
      <button
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#deleteMessageModal"
        type="button"
      >
        Slet
      </button>

      <div
        className="modal fade"
        id={`deleteMessageModal`}
        tabIndex="-1"
        aria-labelledby={`deleteMessageModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`deleteMessageModalLabel`}>
                Delete Message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {isLoading || isLoadingDelete ? (
                <Loader/>
            ) : error || errorDelete ? (
                <Error/>
            ) : (
                <>
                <div className="modal-body">
            <table className="table">
  <thead>
    <tr>
      <th className="col">#</th>
      <th className="col-2">Name</th>
      <th className="col-2">Email</th>
      <th className="col-2">Number</th>
      <th className="col-8">Message</th>
      <th className="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(data) && data.map && 
    data.map((c, index) => (
        <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phonenumber}</td>
            <td>{c.message}</td>
            <td>
            <button onClick={()=> handleDelete(c._id)} type="button" className="btn btn-danger col-12">
            <i className="bi bi-trash"></i>
        </button>
            </td>
        </tr>
    ))}
    
    
  </tbody>
</table>
            </div>
                </>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteMessageModal;
