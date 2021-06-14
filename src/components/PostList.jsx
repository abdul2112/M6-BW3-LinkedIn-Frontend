import React, { Component } from "react";
import { Link } from "react-router-dom";
import dateDiff from "./../helper/datediff";
import comments from "../assets/img/comments.PNG";
import Box from "./parts/Box";
import { Col, ListGroup } from "react-bootstrap";
import Collapsed from "./parts/Collapsed";

class PostList extends Component {
  render() {
    const now = new Date();
    const posts = this.props?.posts;
    let chunks = [];
    let k = 0;
    while (k < posts.length) {
      chunks.push(posts.slice(k, k + 6));
      k += 6;
    }
    return (
      <ListGroup>
        {chunks[0].map((post) => (
          <Box
            key={post._id}
            item={post}
            render={(state) => (
              <>
                <ListGroup.Item
                  style={{ paddingLeft: "0", paddingBottom: "0" }}>
                  <div className='d-flex flex-row'>
                    <Col md={1} className='pl-0'>
                      <img
                        src={post.user?.image}
                        alt=''
                        className={"rounded-circle"}
                        style={{ height: "50px" }}
                      />
                    </Col>
                    <Col md={11} className='ml-2'>
                      <div>
                        <a as={Link} href={`/profile/${post.user?._id}`}>
                          <span className='font-weight-bolder'>
                            {post.user?.name}
                          </span>
                        </a>

                        {" · "}
                        <span className='text-muted font-weight-light'>
                          2nd
                        </span>
                      </div>
                      <div
                        className='text-muted'
                        style={{ fontSize: "0.8rem" }}>
                        <span>{dateDiff(post.createdAt, now)}</span>
                        {post.user?.title}
                      </div>
                    </Col>
                  </div>
                  <div className='my-2'>{post.text}</div>
                  <div style={{ fontSize: "0.8rem" }} className='mt-1'>
                    <img src={comments} alt='comment' /> <a href='/'>35 </a>
                    <a href='/'>23 comments</a>
                  </div>
                </ListGroup.Item>
              </>
            )}
          />
        ))}
        {chunks.length > 1 ? (
          <Collapsed
            open={this.props.open}
            children={
              <div>
                {chunks[1].map((post) => {
                  return (
                    <Box
                      key={post._id}
                      item={post}
                      render={(state) => (
                        <>
                          <ListGroup.Item
                            style={{ paddingLeft: "0", paddingBottom: "0" }}>
                            <div className='d-flex flex-row'>
                              <Col md={1} className='pl-0'>
                                <img
                                  src={post.user?.image}
                                  alt=''
                                  className={"rounded-circle"}
                                  style={{ height: "50px" }}
                                />
                              </Col>
                              <Col md={11} className='ml-2'>
                                <div>
                                  <a
                                    as={Link}
                                    href={`/profile/${post.user?._id}`}>
                                    <span className='font-weight-bolder'>
                                      {post.user?.name}
                                    </span>
                                  </a>

                                  {" · "}
                                  <span className='text-muted font-weight-light'>
                                    2nd
                                  </span>
                                </div>
                                <div
                                  className='text-muted'
                                  style={{ fontSize: "0.8rem" }}>
                                  <span>{dateDiff(post.createdAt, now)}</span>
                                  {post.user?.title}
                                </div>
                              </Col>
                            </div>
                            <div>{post.text}</div>
                            <div
                              style={{ fontSize: "0.8rem" }}
                              className='mt-1'>
                              <img src={comments} alt='comment' />{" "}
                              <a href='/'>35 </a>
                              <a href='/'>23 comments</a>
                            </div>
                          </ListGroup.Item>
                        </>
                      )}
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
export default PostList;
