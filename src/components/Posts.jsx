import React, { Component } from "react";
import Box from "./parts/Box";
import { Row } from "react-bootstrap";
import { Col, Form, FormControl, Button } from "react-bootstrap";
import PostsModal from "./PostsModal";
import {
  CalendarOutline,
  DocumentTextOutline,
  FilmOutline,
  ImageOutline,
} from "react-ionicons";

class Posts extends Component {
  state = {
    post: {
      text: "",
    },
    formData: undefined,
    showModal: false,
  };

  createPost = async (e) => {
    e.preventDefault();
    if (this.state.post.text.length >= 10) {
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/posts/",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + this.props.bearerToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.post),
          }
        );
        if (response.ok) {
          if (this.state.formData !== undefined) {
            const data = await response.json();
            const id = data._id;
            let newRes = await fetch(
              "https://striveschool-api.herokuapp.com/api/posts/" + id,
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + this.props.bearerToken,
                },
                body: this.state.formData,
              }
            );
            if (newRes.ok) {
              console.log("FileUploaded");
            }
          }
          this.props.onHandleUpdate(e, true);
        } else {
          console.log("Something went wrong!");
        }
      } catch (error) {
        console.log(`Something went wrong! ${error}`);
      }
    }
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    let form_data = new FormData();
    form_data.append("post", file);
    this.setState((state) => {
      return {
        formData: form_data,
      };
    });
  };

  handleChange = (e) => {
    this.setState((state) => {
      return {
        post: { text: e.target.value },
      };
    });
  };

  handleShowModal = () => {
    this.setState((state) => {
      return {
        showModal: !this.state.showModal,
      };
    });
  };

  render() {
    return (
      <Box
        padding={true}
        render={(state) => (
          <>
            <Row className='d-flex flex-nowrap mx-1'>
              <Col md={1} className='pl-0'>
                <img
                  src={this.props.profile.image}
                  alt=''
                  className={this.props.rounded && "rounded-circle"}
                  style={{ height: "50px" }}
                />
              </Col>
              <Col md={11} className='ml-2'>
                <Form inline>
                  <FormControl
                    type='button'
                    placeholder='Start a post'
                    className='mr-sm-2 rounded-pill flex-grow-1 text-left'
                    onClick={this.handleShowModal}
                    style={{ height: "50px" }}
                    value='Start a post'
                  />
                </Form>
              </Col>
            </Row>
            <Row className='mr-2 mt-1 d-flex justify-content-between'>
              <Button variant='' onClick={(e) => this.props.onPostsClick(e)}>
                <ImageOutline
                  color={"#70B5F9"}
                  title={"search"}
                  height='20px'
                  width='20px'
                  className='mx-2'
                />
                Photos
              </Button>
              <Button variant='' onClick={(e) => this.props.onPostsClick(e)}>
                <FilmOutline
                  color={"#7FC15E"}
                  title={"search"}
                  height='20px'
                  width='20px'
                  className='mr-2'
                />
                Video
              </Button>
              <Button variant='' onClick={(e) => this.props.onPostsClick(e)}>
                <CalendarOutline
                  color={"#E7A33E"}
                  title={"search"}
                  height='20px'
                  width='20px'
                  className='mr-2'
                />
                Event
              </Button>
              <Button variant='' onClick={(e) => this.props.onPostsClick(e)}>
                <DocumentTextOutline
                  color={"#F5987E"}
                  title={"search"}
                  height='20px'
                  width='20px'
                  className='mr-2'
                />
                Posts
              </Button>
            </Row>
            <PostsModal
              onCreatePost={this.createPost}
              onHandleFileUpload={this.handleFileUpload}
              open={this.state.showModal}
              onHandleShowModal={this.handleShowModal}
              onHandleChange={this.handleChange}
              rounded={this.props.rounded}
              profile={this.props.profile}
              text={this.state.post.text}
            />
          </>
        )}
      />
    );
  }
}

export default Posts;
