import React, { Component } from "react";
import Box from "./../components/parts/Box";
import AddToYourFeed from "./../components/AddToYourFeed";
import { Row, Col } from "react-bootstrap";
import ItemsList from "./../components/parts/ItemsList";
import PostList from "./../components/PostList";
import { withRouter } from "react-router";

class Search extends Component {
  componentDidMount() {
    document.title = `Linkedin - Search`;
  }

  render() {
    const filter = this.props.match.params?.filter;
    return (
      <Row className='mt-5'>
        <Col md={8}>
          {!filter ? (
            <>
              <Box
                title={"People"}
                footerText={"Show more people"}
                render={(state) => (
                  <ItemsList
                    rounded={true}
                    edit={false}
                    onEditButtonClick={this.handleEditButtonClick}
                    items={this.props.profiles}
                    open={state.openCollapse}
                    connect={true}
                  />
                )}
              />
              <Box
                title={"Companies"}
                render={(state) => <div>sometext</div>}
              />
              <Box
                title={"Posts"}
                footerText={"Show more posts"}
                render={(state) => (
                  <PostList
                    posts={this.props.posts}
                    open={state.openCollapse}
                  />
                )}
              />
              <Box title={"Jobs"} render={(state) => <div>sometext</div>} />
            </>
          ) : (
            <>
              {filter === "people" && (
                <Box
                  title={"People"}
                  footerText={"Show more people"}
                  render={(state) => (
                    <ItemsList
                      rounded={true}
                      edit={false}
                      onEditButtonClick={this.handleEditButtonClick}
                      items={this.props.profiles}
                      open={state.openCollapse}
                      connect={true}
                    />
                  )}
                />
              )}
              {filter === "companies" && (
                <Box
                  title={"Companies"}
                  render={(state) => <div>sometext</div>}
                />
              )}
              {filter === "posts" && (
                <Box
                  title={"Posts"}
                  footerText={"Show more posts"}
                  render={(state) => (
                    <PostList
                      posts={this.props.posts}
                      open={state.openCollapse}
                    />
                  )}
                />
              )}
              {filter === "jobs" && (
                <Box title={"Jobs"} render={(state) => <div>sometext</div>} />
              )}
            </>
          )}
        </Col>
        <Col md={4}>
          <AddToYourFeed />
        </Col>
      </Row>
    );
  }
}

export default withRouter(Search);
