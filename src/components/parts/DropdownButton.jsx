import { Dropdown } from "react-bootstrap";

const DropdownButton = ({ Name, Background, Border }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{ borderRadius: "50px", marginRight: "10px" }}
        variant={Background}
        id='dropdown-basic'
        border={Border}>
        {Name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
        <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default DropdownButton;
