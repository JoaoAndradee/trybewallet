import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrencies } from '../redux/actions/currenciesFetch';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="email-field">{email}</h3>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
        <WalletForm />
        <p data-testid="value-input">despesa</p>
        <span data-testid="description-input">Descrição despesa</span>
        <div>
          <select data-testid="currency-input">
            { currencies.map((item) => <option key={ item }>{item}</option>)}
          </select>
        </div>
        <div>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
