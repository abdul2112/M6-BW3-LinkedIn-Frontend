import "../../css/Buttons.css";
import { PencilOutline } from "react-ionicons";
import Pencil from './PencilIcon'

import React from "react";

const EditButton = (props) => {
  return (
    <div className='edit-button btn pb-3' onClick={props.onClick}>
      <Pencil />
    </div>
  );
};

export default EditButton;
