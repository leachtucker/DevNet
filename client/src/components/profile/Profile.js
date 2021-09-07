import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Spinner from '../layout/Spinner';

import { getProfileByID } from '../../actions/profile';

const Profile = ({ match, profile, loading, auth, getProfileByID }) => {
  const history = useHistory();

  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);

  if (loading || profile === null || auth.loading) {
    return <Spinner />;
  }

  return (
    <>
      Profile
      <button className="btn btn-light" onClick={() => history.goBack()}>
        Go Back
      </button>
      {auth.user && auth.user._id === profile.user._id && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit Profile
        </Link>
      )}
    </>
  );
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileByID: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
