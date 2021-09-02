import React from 'react';
import PropTypes from  'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';

const Navbar = (props) => {
  const authLinks = (
      <ul>
        <li><Link to="/dashboard">Developers</Link></li>
        <li><Link onClick={props.logout} to="/login"><i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span></Link></li>
      </ul>
  );

  const guestLinks = (
      <ul>
        <li><Link to="/dashboard">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!props.loading && (<>{ props.isAuthenticated ? authLinks : guestLinks }</>)}
    </nav>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logout })(Navbar)
