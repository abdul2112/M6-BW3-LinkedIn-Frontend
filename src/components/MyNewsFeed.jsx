import React from 'react';
import { Col, ListGroup, Spinner } from 'react-bootstrap';
import {
  ThumbsUpOutline,
  ChatbubblesOutline,
  ArrowRedoOutline,
  SendOutline,
  EllipsisHorizontalOutline,
} from 'react-ionicons';

import Box from './parts/Box';
import comments from '../assets/img/comments.PNG';
import '../css/MyNewsFeed.css';
import dateDiff from '../helper/datediff';
import PostsModal from './PostsModal';
import MyLoader from './ContentLoader';
import { Link } from 'react-router-dom';
class MyNewsFeed extends React.Component {
  state = {
    post: {
      text: '',
    },
    formData: undefined,
    showModal: false,
    currentPost: {
      text: '',
    },
  };

  handleUpdatePost = async (e, method, id) => {
    e.preventDefault();
    try {
      let response = await fetch(
        'https://bw-3-linkedn.herokuapp.com/api/posts/' + id,
        {
          method: method,
          headers: {
            Authorization: 'Bearer ' + this.props.bearerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.post),
        }
      );
      if (response.ok) {
        console.log('Post successfully updated');
        if (this.state.formData !== undefined && method !== 'DELETE') {
          const data = await response.json();
          const id = data._id;
          let newRes = await fetch(
            'https://bw-3-linkedn.herokuapp.com/api/posts/' + id,
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + this.props.bearerToken,
              },
              body: this.state.formData,
            }
          );
          if (newRes.ok) {
            console.log('FileUploaded');
          }
        }
        this.props.onHandleUpdate(e, true);
      } else {
        console.log('Something went wrong!');
      }
    } catch (error) {
      console.log(`Something went wrong! ${error}`);
    }
  };

  handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    let form_data = new FormData();
    form_data.append('post', file);
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
        currentPost: {
          ...this.state.currentPost,
          text: e.target.value,
        },
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
  handleEditButtonClick = (e, post = {}) => {
    e.preventDefault();
    this.setState((state) => {
      return { currentPost: post, showModal: !this.state.showModal };
    });
  };

  render() {
    const now = new Date();
    return (
      <>
        {this.props.posts.length > 0 ? (
          this.props.posts.map((post) => (
            <Box
              key={post._id}
              item={post}
              render={(state) => (
                <>
                  <ListGroup>
                    <ListGroup.Item
                      style={{ paddingLeft: '0', paddingRight: '0' }}
                    >
                      <div className="d-flex flex-row">
                        <Col className="pl-0">
                          <a as={Link} href={`/profile/${post.user?._id}`}>
                            {' '}
                            <span className="font-weight-bolder">
                              {post.user?.name}{' '}
                            </span>
                          </a>

                          <span
                            className="font-weight-lighter"
                            style={{ fontSize: '0.8rem' }}
                          >
                            like this.
                          </span>
                          <EllipsisHorizontalOutline
                            color={'#808080'}
                            title={'thumb'}
                            height="25px"
                            width="25px"
                            className="float-right btn"
                            onClick={(e) =>
                              this.handleEditButtonClick(e, state.item)
                            }
                          />
                        </Col>
                      </div>
                      <hr></hr>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ paddingLeft: '0', paddingBottom: '0' }}
                    >
                      <div className="d-flex flex-row">
                        <Col md={1} className="pl-0">
                          <img
                            src={post.user?.image}
                            alt=""
                            className={'rounded-circle'}
                            style={{ height: '50px' }}
                          />
                        </Col>
                        <Col md={11} className="ml-2">
                          <div>
                            <a as={Link} href={`/profile/${post.user?._id}`}>
                              <span className="font-weight-bolder">
                                {post.user?.name}
                              </span>
                            </a>

                            {' · '}
                            <span className="text-muted font-weight-light">
                              2nd
                            </span>
                          </div>
                          <div
                            className="text-muted"
                            style={{ fontSize: '0.8rem' }}
                          >
                            <span>{dateDiff(post.createdAt, now)}</span>
                            {post.user?.title}
                          </div>
                        </Col>
                      </div>
                      <div>{post.text}</div>
                      <div>
                        {' '}
                        {post?.image && (
                          <img
                            src={post.image}
                            alt="post"
                            className="img-fluid"
                          />
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem' }} className="mt-5">
                        <img src={comments} alt="comment" /> <a href="/">35 </a>
                        <a href="/">23 comments</a>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ paddingLeft: '0', paddingTop: '0' }}
                      className=""
                    >
                      <hr></hr>
                      <div className="d-flex flex-row">
                        <Col md={2} className=" d-flex flex-row">
                          <ThumbsUpOutline
                            color={'#808080'}
                            title={'thumb'}
                            height="25px"
                            width="25px"
                          />
                          Like
                        </Col>
                        <Col md={2} className="d-flex flex-row">
                          <ChatbubblesOutline
                            color={'#808080'}
                            title={'thumb'}
                            height="25px"
                            width="25px"
                          />
                          Comment
                        </Col>
                        <Col md={2} className="d-flex flex-row ml-5">
                          <ArrowRedoOutline
                            color={'#808080'}
                            title={'thumb'}
                            height="25px"
                            width="25px"
                          />
                          Share
                        </Col>
                        <Col md={2} className="d-flex flex-row ml-3">
                          <SendOutline
                            color={'#808080'}
                            title={'thumb'}
                            height="25px"
                            width="25px"
                          />
                          Send
                        </Col>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </>
              )}
            />
          ))
        ) : (
          <MyLoader />
          // <div className='d-flex justify-content-center mt-5'>
          //   <Spinner animation='border' variant='primary' className='' />
          // </div>
        )}
        <PostsModal
          currentPost={this.state.currentPost}
          onHandleUpdatePost={this.handleUpdatePost}
          currentProfileId={this.props.profile._id}
          onHandleFileUpload={this.handleFileUpload}
          open={this.state.showModal}
          onHandleShowModal={this.handleShowModal}
          onHandleChange={this.handleChange}
          rounded={this.props.rounded}
          profile={this.props.profile}
          text={this.state.currentPost.text}
        />
      </>
    );
  }
}

export default MyNewsFeed;
