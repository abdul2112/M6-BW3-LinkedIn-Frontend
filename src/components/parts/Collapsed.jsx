import { Collapse } from "react-bootstrap";

function Collapsed(props) {
  return (
    <>
      <Collapse in={props.open} style={{ border: "none" }}>
        {props.children}
      </Collapse>
    </>
  );
}
export default Collapsed;
