import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllPosts } from '../../actions/post';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const Posts = ({ posts, loading, getAllPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {/* Post Form goes here */}
      <div className="posts">
        {/* Posts go here */}
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            {posts &&
              posts.map((post) => <PostItem key={post._id} post={post} />)}
          </>
        )}
      </div>
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
