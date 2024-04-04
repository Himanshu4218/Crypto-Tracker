import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useCurrency } from "../Contexts/CryptoContext";

const Alert = () => {
  const {alert,setAlert} = useCurrency();

  useEffect(() => {
    if (alert.open) {
      const timeoutId = setTimeout(() => {
        setAlert({ open: false, message: "" });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [alert, setAlert]);

  return (
    <>
      {alert.open && (
        <div className="alert">
          <span>
            <AiOutlineExclamationCircle />
          </span>
          <span>{alert.message}</span>
          <span onClick={() => setAlert({open: false,message: ""})}>
            <RxCross2 />
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
