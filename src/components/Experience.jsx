import React, { Component } from "react";
import Box from "../components/parts/Box";
import ItemsList from "../components/parts/ItemsList";
import ModalExperience from "./ModelExperience";
class Experience extends Component {
  state = {
    experiences: [],
    currentExperience: {},
    updated: false,
    open: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.updated !== this.state.updated) {
      this.postExp();
    }
  }

  postExp = async () => {
    try {
      const identity = this.props.profileId;
      const newUrl =
        "https://striveschool-api.herokuapp.com/api/profile/" +
        identity +
        "/experiences";
      const response = await fetch(newUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.bearerToken,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState((state) => {
          return { experiences: data, updated: false };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.postExp();
  }

  handleEditButtonClick = (e, item = {}) => {
    e.preventDefault();
    this.setState((state) => {
      return { currentExperience: item, open: true };
    });
  };

  handleShowModal = () => {
    this.setState((state) => {
      return {
        open: !this.state.open,
      };
    });
  };

  handleUpdate = (bool) => {
    console.log("Updating...");
    this.setState((state) => {
      return { updated: bool, open: false, currentExperience: {} };
    });
  };

  render() {
    return this.state.experiences.length !== 0 ? (
      <Box
        add={true}
        onEditButtonClick={this.handleEditButtonClick}
        title='Experience'
        render={(state) => (
          <>
            <ItemsList
              rounded={false}
              edit={true}
              onEditButtonClick={this.handleEditButtonClick}
              items={this.state.experiences}
            />
            <ModalExperience
              profileId={this.props.profileId}
              bearerToken={this.props.bearerToken}
              onUpdate={this.handleUpdate}
              item={this.state.currentExperience}
              open={this.state.open}
              onShowModal={this.handleShowModal}
            />
          </>
        )}
      />
    ) : null;
  }
}

export default Experience;
