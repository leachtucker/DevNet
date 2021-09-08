import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createComment } from '../../actions/post';

const initialState = {
  text: ''
};

const PostCommentForm = ({ post_id, createComment }) => {
  const [formData, setFormData] = useState(() => initialState);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createComment(post_id, formData);
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={formData.text}
          onChange={onChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostCommentForm.propTypes = {
  post_id: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired
};

export default connect(null, { createComment })(PostCommentForm);
