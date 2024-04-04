import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-container">
        <div className="title">
          <h1>Crypto Hunter</h1>
          <h5>Get All The Info Regarding Your Favorite Crypto Currency</h5>
        </div>
        <Carousel/>
      </div>
    </div>
  );
};

export default Banner;
