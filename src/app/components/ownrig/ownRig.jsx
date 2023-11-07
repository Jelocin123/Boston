import React, { useEffect, useState } from "react";
import styles from "../../styles/ownrig.module.scss";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

const OwnRig = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [selections, setSelections] = useState({
    cpu: { name: "", price: 0 },
    motherboard: { name: "", price: 0 },
    memory: { name: "", price: 0 },
    storage: { name: "", price: 0 },
    videoCard: { name: "", price: 0 },
    case: { name: "", price: 0 },
    powerSupply: { name: "", price: 0 },
  });

  useEffect(() => {
    makeRequest("http://localhost:5039/gear");
  }, []);

  const sections = [
    { label: "CPU", range: [0, 3], stateKey: "cpu" },
    { label: "Motherboard", range: [3, 5], stateKey: "motherboard" },
    { label: "Memory", range: [5, 7], stateKey: "memory" },
    { label: "Storage", range: [7, 9], stateKey: "storage" },
    { label: "Video Card", range: [9, 12], stateKey: "videoCard" },
    { label: "Case", range: [12, 15], stateKey: "case" },
    { label: "Power Supply", range: [15, 18], stateKey: "powerSupply" },
  ];

  const handleSelectionChange = (key, service) => {
    setSelections({
      ...selections,
      [key]: {
        name: service.geartitle,
        price: service.price,
      },
    });
  };

  const resetSelections = () => {
    setSelections({
      cpu: { name: "", price: 0 },
      motherboard: { name: "", price: 0 },
      memory: { name: "", price: 0 },
      storage: { name: "", price: 0 },
      videoCard: { name: "", price: 0 },
      case: { name: "", price: 0 },
      powerSupply: { name: "", price: 0 },
    });
  };

  return (
    <div className="container" id={styles.ownRigContainer}>
      <article className="row" id="designYourOwnRig">
        <section>
          <h2 className="text-center text-white mt-5">
            Design your own rig!
          </h2>
          <div className={styles.twoLinesWithStar}>
            <div className={styles.line}></div>
            <div className={styles.star}>
              <i className="bi bi-star-fill"></i>
            </div>
            <div className={styles.line}></div>
          </div>
        </section>
      </article>
      <article className="row text-white">
        <section className="col-lg-7 col-xl-7 col-md-7 col-sm-12  col-12 p-3 mb-2">
          <h4 className="text-center text-white ">Pick your gear</h4>
          {sections.map((section) => (
            <section
              key={section.label}
              className={`col-12 mt-2 ${styles.cpuBg}`}
            >
              <article className="row ms-1">
                <section className="col-3 mt-2" id={styles.sectionLabel}>{section.label}</section>
                <section className="col-8 " id={styles.sectionNames}>
                  {data &&
                    data
                      .slice(section.range[0], section.range[1])
                      .map((service, index) => (
                        <div key={index}>
                          <label>
                            <input
                              type="radio"
                              name={section.label}
                              value={service.id}
                              className=""
                              onChange={() => {
                                handleSelectionChange(
                                  section.stateKey,
                                  service
                                );
                              }}
                              checked={
                                selections[section.stateKey].name ===
                                service.geartitle
                              }
                            />
                            <span
                              className={`ms-1 ${
                                selections[section.stateKey].name ===
                                service.geartitle
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              {service.geartitle}
                            </span>
                          </label>
                        </div>
                      ))}
                </section>
              </article>
            </section>
          ))}
        </section>
        <section className="col-lg-5 col-xl-5 col-md-5 col-sm-12 col-12 p-3">
          <h4 className="text-center text-white ">Summary</h4>
          <article
            className="row bg-white text-black p-2 m-0"
            id={styles.summary}
          >
            <section className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-3">
              <p className="m-0 border-0 ">
                <span>Total</span>
              </p>
            </section>
            <section className="col-9 col-md-6 col-sm-6 col-lg-6 col-xl-6 text-end ">
              <span
                id={styles.spanTotal}
                className="bg-black text-white p-3 pt-1 pb-1"
              >
                {Object.values(selections).reduce(
                  (total, selection) => total + selection.price,
                  0
                )}{" "}
                DKK
              </span>
            </section>
            <hr className="mt-4 col-11 mx-auto" />

            <section className="col-12" >
              {Object.keys(selections).map(
                (key) =>
                  selections[key].name && selections[key].price && (
                   <article className="row">
                    <section className="col-12">
                    <p className="text-start  p-3 mb-0" key={key}>
                      {" "}
                      - {selections[key].name}
                      <span className="ms-4" id={styles.priceSpan}>{selections[key].price},-</span>
                    </p>
                    </section>

                   </article>
                  )
              )}
              {Object.values(selections).some(
                (selection) => selection.name
              ) && (
                <button
                  className="btn btn-danger mt-3 col-12"
                  onClick={resetSelections}
                >
                  Reset
                </button>
              )}
            </section>
          </article>
          {Object.values(selections).some((selection) => selection.name) || (
            <p className="text-center text-white" id={styles.pSelect}>
              Please select some gear from the left panel.
            </p>
          )}

          <h4 className="mt-4">Contact us!</h4>
          <form>
            <div className="row" id={styles.contactUs}>
              <div className="col-6 pe-2">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div className="col-6 ps-2">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="col-2  mt-2">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </section>
      </article>
      {isLoading && <Loader />}
      {error && <Error message={error} />}
    </div>
  );
};

export default OwnRig;
