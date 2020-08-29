import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  CREATE_POST,
  DELETE_POST,
  ADD_COMMENT,
  LIKE_POST,
} from "../reducers/postReducer";
class Post extends React.Component {
  state = {
    title: "",
    comment_body: "",
  };

  inputHandler = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  inputCommentHandler = (e) => {
    this.setState({
      comment_body: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.createPost(this.state.title);
    this.setState({ title: "" });
  };

  commentSubmitHandler = (id) => (e) => {
    e.preventDefault();
    console.log(id);
    console.log(this.state.comment_body);
    this.props.addComment(id, this.state.comment_body);
    this.setState({ comment_body: "" });
  };

  deletePostHandler = (id) => {
    this.props.deletePost(id);
  };

  addLikeHandler = (id) => {
    this.props.addLike(id);
  };

  clickedLogoutButton = async (e) => {
    e.preventDefault();
    console.log("logout button clicked");
    const { history } = this.props;
    localStorage.clear();
    history.push("/sign-in");
  };
  render() {
    const { posts } = this.props;
    const { title, comment_body } = this.state;
    return (
      <>
        <div className="auth-inner">
          <div className="container">
            <div className="row">
              <div className="span4 well">
                <div className="row">
                  <div className="aboutus">
                    <h2 className="aboutus-title">Posts</h2>
                    <div>
                      <form onSubmit={this.submitHandler}>
                        <input
                          type="text"
                          name="title"
                          value={title}
                          onChange={this.inputHandler}
                          style={{ width: "300px", marginBottom: "20px" }}
                          placeholder="Add a post"
                        />
                        <button
                          type="submit"
                          className="btn btn-primary"
                          title="add"
                          disabled={!title}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                    <div>
                      <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
                        {posts.map((post, idx) => {
                          return (
                            <Fragment key={idx}>
                              {post.title}
                              <button
                                className="btn btn-danger"
                                title="delete"
                                onClick={() => this.deletePostHandler(post.id)}
                              >
                                Delete
                              </button>
                              {post.liked ? (
                                <button
                                  className="btn btn-warning"
                                  title="like"
                                  onClick={() => this.addLikeHandler(post.id)}
                                >
                                  Unlike
                                </button>
                              ) : (
                                <button
                                  className="btn btn-info"
                                  title="like"
                                  onClick={() => this.addLikeHandler(post.id)}
                                >
                                  Like
                                </button>
                              )}
                              <form
                                onSubmit={this.commentSubmitHandler(post.id)}
                              >
                                <input
                                  type="text"
                                  name="comment_body"
                                  value={comment_body}
                                  onChange={this.inputCommentHandler}
                                  style={{
                                    width: "150px",
                                    marginBottom: "20px",
                                  }}
                                  placeholder="Add a comment"
                                />
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  title="add"
                                  disabled={!comment_body}
                                >
                                  Comment
                                </button>
                              </form>
                              <ul>
                                {post.comments.map((comment, idx) => {
                                  return (
                                    <li key={`${idx}-comment`}>
                                      Comment : {comment}
                                    </li>
                                  );
                                })}
                              </ul>
                            </Fragment>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          id="logout"
          type="button"
          className="btn btn-danger btn-block btn-sm"
          onClick={this.clickedLogoutButton}
        >
          Sign Out
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (title) => dispatch({ type: CREATE_POST, payload: title }),
    deletePost: (id) => dispatch({ type: DELETE_POST, payload: id }),
    addComment: (id, comment_body) =>
      dispatch({ type: ADD_COMMENT, payload: { id, comment_body } }),
    addLike: (id) => dispatch({ type: LIKE_POST, payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
