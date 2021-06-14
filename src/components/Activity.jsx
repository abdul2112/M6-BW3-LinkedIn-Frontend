import React from "react";
import Box from "./parts/Box";
import LinkButton from "./parts/LinkButton";
const Activity = (props) => {
  return (
    <Box
      edit={false}
      subtitle={<LinkButton title={"296 followers"} color='#67A0D9' />}
      title={"Activity"}
      footerText={"See all Activity"}
      render={(state) => (
        <div className='d-flex flex-row'>
          <img
            src={props.profile.image}
            alt=''
            className='img-fluid'
            style={{ height: "70px" }}
          />
          <a href='/' style={{ color: "black" }}>
            <p className='ml-5'>Some more text</p>
          </a>
        </div>
      )}
    />
  );
};

export default Activity;
