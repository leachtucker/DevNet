import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

import { getAllProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';

const Profiles = ({ profiles, loading, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">Browse and connect with fellow devs</p>
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
