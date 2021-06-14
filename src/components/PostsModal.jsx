import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { CaretDownOutline, GlobeOutline, ImageOutline } from "react-ionicons";

function PostsModal(props) {
  const inputRef = useRef();
  const [editor, setEdit] = useState(false);

  useEffect(() => {
    if (
      props?.currentPost?.text &&
      document.querySelector("#postText")?.value
    ) {
      document.querySelector("#postText").value = props.currentPost.text;
      if (props.currentProfileId === props.currentPost?.user?._id) {
        setEdit(true);
      }
    }
  }, [props]);

  const handleCreatePost = (e) => {
    props.onCreatePost(e);
    props.onHandleShowModal();
  };

  const handleUpdatePost = (e, method) => {
    props.onHandleUpdatePost(e, method, props.currentPost._id);
    props.onHandleShowModal();
  };

  const handleFileUpload = (e) => {
    props.onHandleFileUpload(e);
  };

  return (
    <>
      <Modal show={props.open} onHide={props.onHandleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='d-flex flex-nowrap mx-1'>
            <Col md={1} className='pl-0'>
              <img
                src={props.profile.image}
                alt=''
                className={"rounded-circle"}
                style={{ height: "50px" }}
              />
            </Col>
            <Col md={11} className='ml-2'>
              <div>
                <span className='font-weight-bolder'>{props.profile.name}</span>
                <Button
                  style={{ borderRadius: "50px", marginRight: "10px" }}
                  variant='outline-dark'
                  className='rounded-pill d-block p-1'>
                  <GlobeOutline
                    color={"#c0c0c0"}
                    title={"globe"}
                    height='15px'
                    width='15px'
                  />{" "}
                  Anyone{" "}
                  <CaretDownOutline
                    color={"#c0c0c0"}
                    title={"caret"}
                    height='15px'
                    width='15px'
                  />
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='postText' className='mt-2'>
                <Form.Label className='sr-only'>Example textarea</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  className=''
                  placeholder='What do you want to talk about?'
                  style={{ border: "0" }}
                  value={props.text}
                  onChange={props.onHandleChange}
                  ref={inputRef}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant='link'>
                <ImageOutline
                  color={"#400040"}
                  title={"image"}
                  height='15px'
                  width='15px'
                />
                <input
                  type='file'
                  id='myfile'
                  name='myfile'
                  accept='image/jpeg, image/png'
                  onChange={handleFileUpload}></input>
              </Button>

              {!editor ? (
                <Button
                  variant={props.text?.length >= 10 ? "primary" : "light"}
                  className='rounded-pill float-right'
                  onClick={handleCreatePost}>
                  Post
                </Button>
              ) : (
                <>
                  <Button
                    variant={"primary"}
                    className='rounded-pill float-right'
                    onClick={(e) => handleUpdatePost(e, "DELETE")}>
                    Delete
                  </Button>
                  <Button
                    variant={"primary"}
                    className='rounded-pill float-right'
                    onClick={(e) => handleUpdatePost(e, "PUT")}>
                    Edit
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          className='d-flex justify-content-between'
          style={{ backgroundColor: "#F3F2EF" }}>
          <Row>
            <Col md={6} className='w-50'>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Celebrate an occasion
              </Button>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Create a poll
              </Button>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Offer help
              </Button>
            </Col>
            <Col md={6} className=''>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block text-nowrap w-100'>
                Share that you’re hiring
              </Button>
              <Button
                variant={"light"}
                className='rounded-pill mt-1 d-block w-100'>
                Find an expert
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostsModal;
