import "../../css/Buttons.css";
import { AddOutline } from "react-ionicons";

import React from "react";

const AddButton = (props) => {
  return (
    <div
      className='edit-button btn'
      onClick={(e) => props.onEditButtonClick(e)}>
      <AddOutline color={"#5E5E5E"} title={"add"} height='20px' width='20px' />
    </div>
  );
};

export default AddButton;
