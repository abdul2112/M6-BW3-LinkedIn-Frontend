import React, { useState } from "react";
import { Card } from "react-bootstrap";

const BoxFooter = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <Card.Footer
      className='text-muted text-center btn'
      onClick={() => {
        setOpen(!open);
        props.onHandleOpenCollapse(open);
      }}>
      {props.footerText}
    </Card.Footer>
  );
};

export default BoxFooter;
