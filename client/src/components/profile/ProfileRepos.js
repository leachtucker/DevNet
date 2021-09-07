import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileRepo from './ProfileRepo';

import { getGitHubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileRepos = ({ githubusername, loading, repos, getGitHubRepos }) => {
  useEffect(() => {
    getGitHubRepos(githubusername);
  }, [githubusername, getGitHubRepos]);

  if (loading || repos === null) {
    return <Spinner />;
  }

  if (!githubusername || !repos.length) {
    return <h4>No repos</h4>;
  }

  return (
    <>
      {repos.map((repo) => (
        <ProfileRepo key={repo.id} repo={repo} />
      ))}
    </>
  );
};

ProfileRepos.propTypes = {
  githubusername: PropTypes.string,
  repos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getGitHubRepos: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getGitHubRepos })(ProfileRepos);
