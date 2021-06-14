import React from "react";

const LinkButton = (props) => {
  return (
    <button
      className='btn p-0'
      style={{
        color: props.color,
        fontWeight: "bold",
      }}
      href='#'>
      {props.title}
    </button>
  );
};

export default LinkButton;
