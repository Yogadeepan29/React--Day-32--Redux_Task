import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartData = useSelector((state) => state.cart.cartData);
  const [cartItemCount, setCartItemCount] = React.useState(0);

  useEffect(() => {
    setCartItemCount(Object.keys(cartData).filter((id) => cartData[id] !== null && cartData[id] !== undefined).length);
  }, [cartData]);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-warning fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand p-2 fs-2 fw-bold" href="/">
        <i class="fa-brands fa-react"></i>  REDUX | Cart 
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-center mx-auto fs-4"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto pe-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Account Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-semibold " href="#">
              <i className="fa-solid fa-cart-shopping"></i> Cart ({cartItemCount}) 
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;