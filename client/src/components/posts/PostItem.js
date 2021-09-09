import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost, likePost, unlikePost } from '../../actions/post';

import Moment from 'react-moment';

const PostItem = ({ post, user, deletePost, likePost, unlikePost }) => {
  const onLike = () => likePost(post._id);
  const onUnlike = () => unlikePost(post._id);
  const onDelete = () => deletePost(post._id);

  const hasLikedPost = post.likes
    .map((like) => like.user._id)
    .includes(user._id);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={post.user.avatar} alt="user avatar" />
          <h4>{post.user.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment date={post.date} format="MM/DD/YYYY" /> at{' '}
          <Moment date={post.date} format="hh:ss a" />
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={onLike}
          disabled={hasLikedPost}
        >
          <i className="fas fa-thumbs-up"></i>{' '}
          {!!post.likes.length && <span>{post.likes.length}</span>}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={onUnlike}
          disabled={!hasLikedPost}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>

        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Discussion{' '}
          {!!post.comments.length && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {/* Display delete button only if the user matches the post's user */}
        {post.user._id === user._id && (
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(
  PostItem
);
