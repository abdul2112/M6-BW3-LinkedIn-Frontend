import React, { Component } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { withRouter } from "react-router";

class FilterBar extends Component {
  render() {
    return (
      <div style={{ maxHeight: "56px", borderTop: "1px solid #E5E5E5" }}>
        <Container sm='fluid'>
          <Row>
            <Col>
              <Button
                id='people'
                variant={
                  this.props.filter === "people"
                    ? "outline-primary"
                    : "outline-secondary"
                }
                className='rounded-pill m-1 p-1 px-2'
                onClick={(e) => {
                  this.props.onFilterChange(e);
                }}>
                People
              </Button>{" "}
              <Button
                id='companies'
                className='rounded-pill m-1 p-1 px-2'
                variant={
                  this.props.filter === "companies"
                    ? "outline-primary"
                    : "outline-secondary"
                }
                onClick={(e) => {
                  this.props.onFilterChange(e);
                }}>
                Companies
              </Button>{" "}
              <Button
                id='posts'
                className='rounded-pill m-1 p-1 px-2'
                variant={
                  this.props.filter === "posts"
                    ? "outline-primary"
                    : "outline-secondary"
                }
                onClick={(e) => {
                  this.props.onFilterChange(e);
                }}>
                Posts
              </Button>{" "}
              <Button
                id='jobs'
                className='rounded-pill m-1 p-1 px-2'
                variant={
                  this.props.filter === "posts"
                    ? "outline-primary"
                    : "outline-secondary"
                }
                onClick={(e) => {
                  this.props.onFilterChange(e);
                }}>
                Jobs
              </Button>{" "}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(FilterBar);
