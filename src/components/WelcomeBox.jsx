import React from "react";
import { Card, ListGroupItem, ListGroup, Image } from "react-bootstrap";
import "./../css/WelcomeBox.css";
import { Link } from "react-router-dom";

class WelcomeBox extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Card className='roundedCircle'>
          <Card.Img
            id='bg-img'
            variant='top'
            src='https://via.placeholder.com/300x85'
          />

          <Image
            id='image-icon'
            as={Link}
            to='/profile'
            src={this.props.profile.image}
            roundedCircle
            style={{ cursor: "pointer" }}
          />

          <Card.Body>
            <Card.Title className='text-center mt-5 text-dark mb-2 pb-0 underline'>
              <strong>Welcome, {this.props.profile.name}!</strong>
            </Card.Title>
            <a
              className='d-flex justify-content-center mt-0 pt-0 underline'
              href='/'>
              Add a photo
            </a>
            <Card.Text></Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>
              <div className='d-flex justify-content-between'>
                <div className='text-muted '>Connections</div>
                <span className='mt-2 text-primary'>66</span>
              </div>

              <strong className='text-dark mt-0 pt-0'>Grow your network</strong>

              <div className='d-flex justify-content-between'>
                <div className='text-muted mt-2'>Who viewed your profile</div>
                <span className=' mt-2 text-primary'>66</span>
              </div>
            </ListGroupItem>
            <ListGroupItem className='my-0 py-0 mx-0 px-0'>
              <hr className=' ' />
            </ListGroupItem>
            <ListGroupItem>
              <span className='text-muted ' style={{ display: "inline-block" }}>
                Access exclusive tools & insights
              </span>
              <span style={{ display: "inline-block" }}>
                Try Premium free for 1 Month
              </span>
            </ListGroupItem>
            <ListGroupItem className=' my-0 py-0 mx-0 px-0'>
              <hr className=' ' />
            </ListGroupItem>
            <ListGroupItem>My Items</ListGroupItem>
          </ListGroup>
        </Card>
      </>
    );
  }
}

export default WelcomeBox;
