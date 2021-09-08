import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllPosts } from '../../actions/post';

import Spinner from '../layout/Spinner';

const Posts = ({ posts, loading, getAllPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  if (loading) return <Spinner />;

  return (
    <>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>
    </>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.post.loading
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
