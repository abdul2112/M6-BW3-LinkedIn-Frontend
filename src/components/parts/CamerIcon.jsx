import { Camera } from "react-ionicons";
import "../../css/ProfileTop.css";

const CameraIcon = ({ classname }) => {
  return (
    <Camera
      className={classname}
      color={"#0a66c2"}
      title={"camra"}
      height='30px'
      width='30px'
    />
  );
};
export default CameraIcon;
