import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";
import "../../css/ItemsList.css";
import Collapsed from "./Collapsed";

class ItemsList extends Component {
  render() {
    const items = this.props?.items;
    let chunks = [];
    let k = 0;
    while (k < items.length) {
      chunks.push(items.slice(k, k + 6));
      k += 6;
    }
    return (
      <ListGroup variant='flush'>
        {chunks[0].map((item) => (
          <ListItem
            key={item._id}
            rounded={this.props.rounded}
            item={item}
            edit={this.props.edit}
            follow={this.props.follow}
            onEditButtonClick={this.props.onEditButtonClick}
            connect={this.props.connect}
          />
        ))}
        {chunks.length > 1 ? (
          <Collapsed
            open={this.props.open}
            children={
              <div>
                {chunks[1].map((item) => {
                  return (
                    <ListItem
                      key={item._id}
                      rounded={this.props.rounded}
                      item={item}
                      edit={this.props.edit}
                      follow={this.props.follow}
                      onEditButtonClick={this.props.onEditButtonClick}
                      connect={this.props.connect}
                    />
                  );
                })}
              </div>
            }
          />
        ) : null}
      </ListGroup>
    );
  }
}

export default ItemsList;
