import React, { useState } from 'react';
import useRequestData from '../../hooks/useRequestData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const SliderModalAdd = () => {
  const { isLoading, error, makeRequest } = useRequestData();

  const [sliderData, setSliderData] = useState({
    sliderimage: null,
    alttext: '',
  });

  const handleAddSlider = () => {
    const formData = new FormData();
    formData.append('sliderimage', sliderData.sliderimage);
    formData.append('alttext', sliderData.alttext);

    makeRequest('http://localhost:5039/slider/admin', null, null, 'POST', formData)
      .then(() => {
        window.alert('Slider has been added.');
        window.location.reload();
        
      })
      .catch((addError) => {
        console.error('Error adding slider:', addError);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary col-md-2 col-xl-1 col-5 me-1 text-nowrap "
        data-bs-toggle="modal"
        data-bs-target="#addSliderModal"
      >
        Add Slider
      </button>

      <div
        className="modal fade"
        id="addSliderModal"
        tabIndex="-1"
        aria-labelledby="addSliderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addSliderModalLabel">
                Add Slider
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
                  <label className="form-label">Slider Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setSliderData({
                        ...sliderData,
                        sliderimage: e.target.files[0],
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alt Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sliderData.alttext}
                    onChange={(e) =>
                      setSliderData({ ...sliderData, alttext: e.target.value })
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
                onClick={handleAddSlider}
              >
                Add Slider
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

export default SliderModalAdd;
