import React, { useEffect, useState } from "react";
import styles from "../../styles/products.module.scss";
import useRequestData from "../../hooks/useRequestData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Link from "next/link";
import { useUserContext } from "../../providers/userProvider";
import EditModal from "../../components/modal/editModal";
import DeleteModal from "../../components/modal/deleteModal";
import AddModal from "../../components/modal/addModal";

const Products = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { user } = useUserContext();

  useEffect(() => {
    makeRequest("http://localhost:5039/product");
  }, []);

  return (
    <>
      <div className="container" id={styles.productsContainer}>
        <article className="row" id="products">
          <section>
            <h2 className="text-center text-white  mt-5">Products</h2>
            <div className={styles.twoLinesWithStar}>
              <div className={styles.line}></div>
              <div className={styles.star}>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className={styles.line}></div>
            </div>
          </section>
        </article>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <article className="row mt-4" id={styles.products}>
            {data &&
  data.map((product) => (
    <section key={product._id} className="col-lg-4 col-6 p-2">
      <div id={styles.imageBg}>
        <figcaption className="mt-2 p-4 pb-0 text-center">
          {product.title}
        </figcaption>
        <img
          src={"http://localhost:5039/images/product/" + product.productimage}
          alt={product.title}
          className="img-fluid p-4 mt-0"
        />
        <article className="row d-flex justify-content-center ">
          <section className="col-12 d-flex justify-content-center mb-3">
            {user && (
              <>
                <EditModal title={product.title} id={product._id} content={product.content}/>
                <DeleteModal title={product.title} id={product._id} />
              </>
            )}
          </section>
        </article>
      </div>
    </section>
  ))
}


              <article className="row d-flex justify-content-center">
                <section className="col-xl-2 col-lg-2 col-md-2 col-6">
                  {user && (
                    <>
                      <AddModal/>
                    </>
                  )}
                </section>
              </article>
            </article>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
