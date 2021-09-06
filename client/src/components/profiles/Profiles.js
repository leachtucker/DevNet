import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ profiles, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profiles.length) {
    return <Spinner />;
  }

  return <div></div>;
};

Profiles.propTypes = {
  profiles: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
