import React, { Component } from "react";
import Box from "./parts/Box";
import ItemsList from "./parts/ItemsList";
import people from "../data/people.json";
class AddToYourFeed extends Component {
  componentDidMount() {
    try {
    } catch (error) {}
  }

  render() {
    return (
      <Box
        title={
          <span className='font-weight-bold' style={{ color: "black" }}>
            Add to your feed
          </span>
        }
        footerText={"View all recommendations"}
        render={(open) => (
          <ItemsList
            rounded={true}
            follow={true}
            items={people}
            open={open.openCollapse}
          />
        )}
      />
    );
  }
}

export default AddToYourFeed;
