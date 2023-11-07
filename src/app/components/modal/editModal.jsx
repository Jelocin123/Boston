import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useRequestData from '../../hooks/useRequestData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const EditModal = ({ title, id, content }) => {
  const { isLoading, error, makeRequest } = useRequestData();

  
  const [editedProduct, setEditedProduct] = useState({
    title: title,
    content: content,
    category: '5f95c7b29c318e74c0590ac1',
    productimage: null,
  });

  const handleEditProduct = () => {
    const formData = new FormData();
    formData.append('title', editedProduct.title);
    formData.append('content', editedProduct.content);
    formData.append('category', editedProduct.category);
    formData.append('productimage', editedProduct.productimage);

    makeRequest(`http://localhost:5039/product/admin/${id}`, null, null, 'PUT', formData)
      .then(() => {
        window.alert(`Product "${editedProduct.title}" with ID ${id} has been updated.`);
        window.location.reload();
       
      })
      .catch((editError) => {
        console.error('Error editing product:', editError);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary  col-md-4 col-xl-3 col-5 me-1 text-nowrap "
        data-bs-toggle="modal"
        data-bs-target={`#editModal-${id}`}
      >
        <i className="bi bi-pen"></i> Edit
      </button>

      <div
        className="modal fade"
        id={`editModal-${id}`}
        tabIndex="-1"
        aria-labelledby={`editModalLabel-${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModalLabel-${id}`}>
                Edit Product
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
                    value={editedProduct.title}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <ReactQuill
                    value={editedProduct.content}
                    onChange={(value) =>
                      setEditedProduct({ ...editedProduct, content: value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedProduct.category}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, category: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
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
                onClick={handleEditProduct}
              >
                Save Changes
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

export default EditModal;
