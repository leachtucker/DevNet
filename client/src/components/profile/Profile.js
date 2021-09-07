import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';

import { getProfileByID } from '../../actions/profile';
import ProfileEducation from './ProfileEducation';

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
      <button className="btn btn-light" onClick={() => history.goBack()}>
        Go Back
      </button>
      {auth.user && auth.user._id === profile.user._id && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit Profile
        </Link>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        {/* Experience List */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {!!profile.experience.length ? (
            <>
              {profile.experience.map((exp) => (
                <ProfileExperience key={exp._id} experience={exp} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        {/* Education List */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {!!profile.education.length ? (
            <>
              {profile.education.map((edu) => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </>
          ) : (
            <>
              <h4>No education credentials</h4>
            </>
          )}
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object,
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
