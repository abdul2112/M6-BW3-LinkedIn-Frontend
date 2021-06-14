import { Card } from "react-bootstrap";
import React, { Component } from "react";
import "../../css/Box.css";
import EditButton from "./EditButton";
import AddButton from "./AddButton";
import BoxFooter from "./BoxFooter";

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      openCollapse: false,
      item: this.props.item,
    };
  }

  handleOpenCollapse = (bool) => {
    this.setState((state) => ({ openCollapse: bool }));
  };

  render() {
    const title = this.props?.title;
    const color = this.props?.color;
    const padding = this.props?.padding;
    const footerText = this.props?.footerText;
    return (
      <Card
        className={`mt-3 ${
          this.props?.stickyTop !== undefined ? "sticky-top" : ""
        }`}
        style={{
          backgroundColor: color !== undefined ? color : "none",
          overflow: "hidden",
          top: this.props?.stickyTop ? "10vh" : "",
        }}>
        <Card.Body style={{ padding: padding === false ? 0 : null }}>
          {title && (
            <Card.Title style={{ color: "#777777" }}>
              <div className='d-flex'>
                <div>{title}</div>
                {this.props.edit && <EditButton />}
                {this.props.add && (
                  <AddButton onEditButtonClick={this.props.onEditButtonClick} />
                )}
              </div>
            </Card.Title>
          )}
          {this.props?.subtitle && <span>{this.props.subtitle}</span>}
          {this.props.children}
          {this.props.render(this.state)}
        </Card.Body>
        {footerText !== undefined && (
          <BoxFooter
            footerText={footerText}
            onHandleOpenCollapse={this.handleOpenCollapse}
          />
        )}
      </Card>
    );
  }
}

export default Box;
