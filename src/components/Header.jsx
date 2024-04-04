import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import { useCurrency } from "../Contexts/CryptoContext.jsx";
import UserSidebar from "./UserSidebar.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency,user } = useCurrency();
  return (
    <nav>
      <div className="navbar">
        <span className="brand" onClick={() => navigate("/")}>
          Crypto Hunter
        </span>
        <div style={{display: "flex",alignItems: "center"}}>
          <select
            name=""
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
          {user? <UserSidebar/> :<Modal/> }
        </div>
      </div>
    </nav>
  );
};

export default Header;
