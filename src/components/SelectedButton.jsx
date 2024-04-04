import React from "react";

const SelectedButton = ({ data, onClick, selected }) => {
  return (
    <>
      <span
        className="btn"
        onClick={onClick}
        style={{
          backgroundColor: `${selected ? "gold" : ""}`,
          color: `${selected ? "black" : ""}`,
          fontWeight: `${selected ? "700" : ""}`,
        }}
      >
        {data.label}
      </span>
    </>
  );
};

export default SelectedButton;
