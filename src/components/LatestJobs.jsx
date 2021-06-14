import React, { Component } from "react";
import Box from "./parts/Box";
import Ad from "./Ad";
import fist from "../assets/img/fist.jpg";

class LatestJobs extends Component {
  render() {
    return (
      <Box
        stickyTop={true}
        render={(state) => (
          <div>
            <div className='d-flex justify-content-end'>
              <Ad />
            </div>

            <p className='text-muted mt-3' style={{ fontSize: "0.8rem" }}>
              Get the latest jobs and industry news
            </p>
            <div className='d-flex flex-row justify-content-center'>
              <img
                src={this.props.profile.image}
                alt=''
                className='img-fluid rounded-circle mr-2'
                style={{ height: "75px" }}
              />
              <img src={fist} alt='ddd' style={{ height: "75px" }} />
            </div>
            <p
              className='text-muted text-center mt-3'
              style={{ fontSize: "0.8rem" }}>
              {this.props.profile.name}, explore relevant opportunities with
              Riot Games
            </p>
          </div>
        )}
      />
    );
  }
}

export default LatestJobs;
