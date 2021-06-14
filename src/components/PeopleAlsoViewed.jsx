import React, { Component } from "react";
import Box from "./parts/Box";
import ItemsList from "./parts/ItemsList";
import people from "../data/people.json";
class PeopleAlsoViewed extends Component {
  componentDidMount() {
    try {
    } catch (error) {}
  }

  render() {
    return (
      <Box
        title={
          <span className='font-weight-bold' style={{ color: "black" }}>
            People also viewed
          </span>
        }
        footerText={"Show more"}
        render={(open) => (
          <ItemsList
            rounded={true}
            connect={true}
            items={people}
            open={open.openCollapse}
          />
        )}
      />
    );
  }
}

export default PeopleAlsoViewed;
