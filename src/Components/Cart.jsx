import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Summary from "./Summary";
import {
  removeItem,
  handleSelectChange,
  handleInputChange,
  initializeQuantities,
  calculateSubtotal,
} from "../Redux/cartSlice"; 

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cartData);
  const quantities = useSelector((state) => state.cart.quantities);
  const isCustoms = useSelector((state) => state.cart.isCustoms);

  // Initialize quantities 
  useEffect(() => {
    dispatch(initializeQuantities());
  }, [dispatch]);

  // Recalculate subtotal whenever quantities change
  useEffect(() => {
    dispatch(calculateSubtotal());
  }, [quantities, dispatch]);

  const handleRemove = (id) => {
    dispatch(removeItem(id)); // Dispatch action to remove item
    dispatch(calculateSubtotal()); // Recalculate subtotal after item removal
  };

  const onSelectChange = (id, event) => {
    const selectedQuantity = event.target.value;
    dispatch(handleSelectChange({ id, value: selectedQuantity }));
    dispatch(calculateSubtotal()); // Recalculate subtotal after quantity change
  };

  const onInputChange = (id, event) => {
    const customQuantity = event.target.value;
    dispatch(handleInputChange({ id, value: customQuantity }));
    dispatch(calculateSubtotal()); // Recalculate subtotal after custom input change
  };

  return (
    <>
      <main
        id="Product-details"
        className="container pt-5 mt-5 product-container position-relative"
      >
        <div className="row d-flex justify-content-center mb-4">
          <h2 className="col-10 p-4"> Shopping Cart</h2>
          {/* Check if the cart is empty */}
          {Object.keys(cartData).filter(
            (id) => cartData[id] !== null && cartData[id] !== undefined
          ).length === 0 ? (
            <h3 className="h3 text-center py-3">
              <img
                className="img-fluid"
                src="/emptycart.svg"
                style={{ maxWidth: 500 }}
                alt=""
              />{" "}
              <br />
              Your Cart is Empty
            </h3>
          ) : (
            Object.keys(cartData).map((id) => {
              const product = cartData[id];
              if (!product) return null; // Check if product exists
              return (
                <div
                  className="col-sm-12 col-md-6 col-lg-10 col-xl-10 mb-4"
                  key={id}
                >
                  <div className="card p-3 h-100">
                    <div className="row h-auto">
                      <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2 d-flex justify-content-center align-items-center">
                        <img
                          className="img-fluid product-img"
                          src={product.thumbnail}
                          alt={product.title}
                        />
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div className="card-body">
                          <h2 className="card-title mb-3">{product.title}</h2>
                          <div className="d-flex align-items-center mb-2">
                            <div className="ratings">
                              {Array.from({ length: 5 }, (_, starIndex) => (
                                <i
                                  key={starIndex}
                                  className={`fa-star ${
                                    starIndex < Math.round(product.rating)
                                      ? "fas text-warning"
                                      : "far"
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <span className="ms-1">{product.rating.rate}</span>
                            <span className="ms-2">{product.rating}</span>
                          </div>
                          <p className="card-text lead mb-0">
                            {product.category} <br />
                            <span className="fw-normal">Brand : </span>
                            {product.brand}
                          </p>
                          <div className="accordion" id={`accordion-${id}`}>
                            <div className="accordion-item ">
                              <h2 className="accordion-header ">
                                <button
                                  className="accordion-button collapsed px-0 fw-semibold"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse-${id}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse-${id}`}
                                >
                                  Product Description
                                </button>
                              </h2>
                              <div
                                id={`collapse-${id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent={`accordion-${id}`}
                              >
                                <div className="accordion-body px-0">
                                  <p className="card-text">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Product quantity and price */}
                      <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 ">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6">
                              {!isCustoms[id] ? (
                                <select
                                  className="form-select text-center"
                                  value={quantities[id] || 1}
                                  onChange={(event) =>
                                    onSelectChange(id, event)
                                  }
                                >
                                  {[...Array(9)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                  <option value="10+">10+</option>
                                </select>
                              ) : (
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  value={quantities[id]}
                                  onChange={(event) => onInputChange(id, event)}
                                  min="1"
                                  max={product.stock}
                                  placeholder="Qty"
                                />
                              )}
                            </div>
                            <div className="col-6 text-end pt-1 pe-4 ps-0">
                              <h4>${product.price}</h4>
                            </div>
                          </div>

                          <div className="col-12 text-center mt-3">
                            <div className="limited-deal-container p3 border rounded bg-light">
                              <span className="text-danger fw-bold fs-4">
                                {product.stock} Stocks Left !
                              </span>
                              <h5 className="text-center  text-danger fw-bold">
                                Limited Time Deal 
                              </h5>
                              <h6 className="text-center  text-danger fw-bold">{product.discountPercentage}% Discount</h6>
                            </div>
                          </div>
                          {/* Product quantity limit alert */}
                          {quantities[id] >= product.stock && (
                            <div
                              className="text-danger text-center alert alert-warning fw-semibold mt-3"
                              role="alert"
                            >
                              The Maximum Quantity you may purchase is{" "}
                              {product.stock}
                            </div>
                          )}
                          <div className="col-12 text-end mt-5">
                            <button
                              type="button"
                              className="btn rm-btn btn-link text-decoration-none"
                              onClick={() => handleRemove(id)}
                            >
                              <h5>REMOVE</h5>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row fw-semibold">
                        <hr />
                        <div className="col-6 text-secondary h5 px-3 text-start text-opacity-75">
                          <p>SUBTOTAL :</p>
                          <p>SHIPPING :</p>
                        </div>
                        <div className="col-6 fw-semibold h5 px-3 text-end">
                          <p>
                            $
                            {(quantities[id]
                              ? quantities[id] * product.price
                              : 0
                            ).toFixed(2)}
                          </p>
                          <p>FREE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
      <Summary />
    </>
  );
};

export default Cart;
