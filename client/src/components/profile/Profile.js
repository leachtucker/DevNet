import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

import { getProfileByID } from '../../actions/profile';

const Profile = ({ match, profile, loading, getProfileByID }) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return <div>Profile</div>;
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  getProfileByID: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
