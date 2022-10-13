import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <span data-testid="total-field">{total.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses.reduce((item, curr) => {
    item += curr.value
      * Number(curr.exchangeRates[curr.currency].ask);
    return item;
  }, 0),
});

export default connect(mapStateToProps)(Header);
