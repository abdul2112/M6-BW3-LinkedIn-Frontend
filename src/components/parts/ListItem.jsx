import React, { Component } from "react";
import { ListGroup, Col, Row, Button } from "react-bootstrap";
import EditButton from "./EditButton";
import { format } from "date-fns";
import { AddOutline } from "react-ionicons";
import { Link } from "react-router-dom";
class ListItem extends Component {
  render() {
    const edit = this.props?.edit;
    let sdate = this.props?.item.startDate;
    let edate = this.props?.item.endDate;
    if (sdate) {
      sdate = format(new Date(sdate), "MMM yyyy");
    }
    if (edate) {
      edate = format(new Date(edate), "MMM yyyy");
    }
    return (
      <ListGroup.Item>
        <Row className='d-flex flex-nowrap'>
          <Col md={2} className='pl-0'>
            <img
              src={this.props.item.image}
              alt='Experience'
              className={this.props.rounded && "rounded-circle"}
              style={{ height: "50px", maxWidth: "100px" }}
            />
          </Col>
          <Col md={10} className='ml-2'>
            {/* If this prop exist its a person */}
            {this.props.item.name && (
              <a as={Link} href={`/profile/${this.props.item._id}`}>
                <div className='font-weight-bold d-flex flex-row'>
                  {this.props.item.name} {" · "}
                  <span className='text-muted font-weight-light'>2nd</span>
                </div>
                <span className='font-weight-light'>
                  {this.props.item.title}
                </span>
              </a>
            )}
            {/* If this props exist its a experience */}
            {this.props.item.company && (
              <>
                <a href='/'>
                  <div className='font-weight-bolder d-flex flex-row'>
                    {this.props.item.role}
                    {edit && (
                      <EditButton
                        onClick={(e) =>
                          this.props.onEditButtonClick(e, this.props.item)
                        }
                      />
                    )}
                  </div>
                  <div className='font-weight-bold'>
                    {this.props.item.company}
                  </div>
                  <div className='text-muted font-weight-light'>
                    {sdate} -{edate ? edate : "present"}
                  </div>
                  <span className='font-weight-light'>
                    {this.props.item.area}
                  </span>
                </a>
                <p>{this.props.item.description}</p>
              </>
            )}
            {this.props.connect && (
              <Button
                style={{ borderRadius: "50px", marginRight: "10px" }}
                variant='outline-dark'
                className='d-block'>
                Connect
              </Button>
            )}
            {this.props.follow && (
              <Button
                style={{ borderRadius: "50px", marginRight: "10px" }}
                variant='outline-dark'
                className='d-block d-flex justify-content-center align-items-center'>
                <AddOutline
                  color={"#808080"}
                  title={"cross"}
                  height='25px'
                  width='25px'
                />
                Follow
              </Button>
            )}
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}

export default ListItem;
