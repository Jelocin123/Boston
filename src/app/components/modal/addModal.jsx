import React, { useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddModal = () => {
  const { isLoading, error, makeRequest } = useRequestData();
  const [newProduct, setNewProduct] = useState({
    title: "",
    content: "",
    category: "5f95c7b29c318e74c0590ac1",
    productimage: null,
  });

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("content", newProduct.content);
    formData.append("category", newProduct.category);
    formData.append("productimage", newProduct.productimage);

    makeRequest(
      "http://localhost:5039/product/admin",
      null,
      null,
      "POST",
      formData
    )
      .then(() => {
        window.alert(`Product "${newProduct.title}" has been added.`);
        window.location.reload();

      })
      .catch((addError) => {
        console.error("Error adding product:", addError);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary col-12 m-2"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        <i className="bi bi-plus-circle fs-4"></i>
      </button>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Add Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
   
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <ReactQuill
                    value={newProduct.content}
                    onChange={(value) =>
                      setNewProduct({ ...newProduct, content: value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        productimage: e.target.files[0],
                      })
                    }
                  />
                </div>
              
              </form>
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
                onClick={handleAddProduct}
              >
                Add
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

export default AddModal;
