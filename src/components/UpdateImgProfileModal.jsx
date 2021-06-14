import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function UpdateImgProfileModal(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {}, [image]);

  const showImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    showImage(e);
    props.onHandleFileUpload(e);
  };

  const handleUploadClick = (e) => {
    props.onHandleShowModal();
    props.onUploadClick();
    props.onDidUpdate(true);
  };

  return (
    <>
      <Modal show={props.open} onHide={props.onHandleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center align-items-center flex-column'>
          <div>
            <img
              src={image !== null ? image : props.image}
              alt='profileImage'
              height='300'
              width='300'
            />
          </div>
          <input
            type='file'
            id='myfile'
            name='myfile'
            className='mt-1'
            accept='image/jpeg, image/png'
            onChange={handleFileUpload}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.onHandleShowModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleUploadClick}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateImgProfileModal;
