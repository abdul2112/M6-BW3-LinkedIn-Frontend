import React, { Component } from "react";
import Box from "../components/parts/Box";
class About extends Component {
  render() {
    return (
      <Box
        edit={true}
        title={<span className='font-weight-bold'>About</span>}
        render={(state) => this.props.bio}
      />
    );
  }
}

export default About;
