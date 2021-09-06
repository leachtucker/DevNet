import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';

import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ profile, auth, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.loading, profile.loading]);

  if (profile.loading || auth.user === null) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome, {auth.user && auth.user.name}
      </p>
      <>
        {profile.profile !== null ? (
          <>
            <DashboardActions />
            <Experience experience={profile.profile.experience} />
          </>
        ) : (
          <>
            <p>You have not yet made a profile.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </>
        )}
      </>
    </>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
