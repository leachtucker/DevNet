import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return (
    <div>
      <h3 className="text-dark">{experience.company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{experience.from}</Moment> -{' '}
        {!experience.to ? (
          <span>Current</span>
        ) : (
          <Moment format="YYYY/MM/DD">{experience.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {experience.title}
      </p>
      {experience.description && (
        <p>
          <strong>Description: </strong>
          {experience.description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
