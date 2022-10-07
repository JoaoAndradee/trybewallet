import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValid: true,
    redirect: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.verifyEmailAndPassword());
  };

  verifyEmailAndPassword = () => {
    const { email, password } = this.state;
    const minLengthPassword = 6;
    const verify = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (password.length >= minLengthPassword && verify.test(email)) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  };

  render() {
    const { isValid, email, redirect } = this.state;
    const { dispatch } = this.props;

    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ isValid }
          onClick={ () => {
            dispatch(getEmail(email));
            this.setState({ redirect: true });
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
