import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPostByID } from '../../actions/post';
import { useHistory } from 'react-router';

import Spinner from '../layout/Spinner';
import PostCommentForm from './PostCommentForm';

const Post = ({ match, post, loading, getPostByID }) => {
  const history = useHistory();

  useEffect(() => {
    getPostByID(match.params.id);
  }, [getPostByID, match.params.id]);

  if (loading || post === null) return <Spinner />;

  return (
    <>
      <button className="btn" onClick={() => history.goBack()}>
        Go Back
      </button>
      {post && (
        <>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user._id}`}>
                <img
                  className="round-img"
                  src={post.user.avatar}
                  alt="user avatar"
                />
                <h4>{post.user.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>

          <PostCommentForm post_id={post._id} />

          <div className="comments">
            <div className="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img
                    className="round-img"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                  <h4>John Doe</h4>
                </a>
              </div>
              <div>
                <p className="my-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  possimus corporis sunt necessitatibus! Minus nesciunt soluta
                  suscipit nobis. Amet accusamus distinctio cupiditate
                  blanditiis dolor? Illo perferendis eveniet cum cupiditate
                  aliquam?
                </p>
                <p className="post-date">Posted on 04/16/2019</p>
              </div>
            </div>

            <div className="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img
                    className="round-img"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                  <h4>John Doe</h4>
                </a>
              </div>
              <div>
                <p className="my-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  possimus corporis sunt necessitatibus! Minus nesciunt soluta
                  suscipit nobis. Amet accusamus distinctio cupiditate
                  blanditiis dolor? Illo perferendis eveniet cum cupiditate
                  aliquam?
                </p>
                <p className="post-date">Posted on 04/16/2019</p>
                <button type="button" className="btn btn-danger">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object,
  post: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  post: state.post.post,
  loading: state.post.loading
});

export default connect(mapStateToProps, { getPostByID })(Post);
