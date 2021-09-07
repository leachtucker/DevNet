import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ profiles, loading, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i class="fab fa-connectdevelop"></i> Browse and connect with fellow
        devs
      </p>
      <div className="profiles">
        {!!profiles.length === true ? (
          profiles.map((prof) => <ProfileItem key={prof._id} profile={prof} />)
        ) : (
          <h4>There are no profiles yet</h4>
        )}
      </div>
    </>
  );
};

Profiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
