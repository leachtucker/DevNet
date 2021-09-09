import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';

import { deleteComment } from '../../actions/post';

const CommentItem = ({ post_id, comment, user, deleteComment }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user._id}`}>
          <img className="round-img" src={comment.user.avatar} alt="" />
          <h4>{comment.user.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment date={comment.date} format="DD/MM/YYYY" /> at{' '}
          <Moment date={comment.date} format="hh:mm A" />
        </p>
        {user._id === comment.user._id && user !== null && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(post_id, comment._id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  post_id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  user: PropTypes.object,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
