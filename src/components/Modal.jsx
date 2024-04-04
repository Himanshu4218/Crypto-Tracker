import { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useCurrency } from "../Contexts/CryptoContext";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [loginShow, setLoginShow] = useState(true);
  const { user } = useCurrency();

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="login" onClick={handleOpen}>
        Login
      </button>
      {showModal && (
        <div
          className="modal-container"
          onClick={(e) => {
            if (e.target.className === "modal-container") {
              handleClose();
            }
          }}
        >
          <div className="modal">
            <div className="head">
              <span onClick={() => setLoginShow(true)}>LOGIN</span>
              <span onClick={() => setLoginShow(false)}>SIGN UP</span>
            </div>
            {loginShow ? (
              <Login handleClose={handleClose} />
            ) : (
              <Signup handleClose={handleClose} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
