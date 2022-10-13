import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuotation } from '../redux/actions/quotationFetch';

class WalletForm extends Component {
  state = {
    despesa: {
      id: -1,
      value: '',
      description: 'lalala',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  };

  handleChange = ({ target }) => {
    const { despesa } = this.state;
    this.setState({
      despesa: {
        ...despesa,
        [target.name]: target.value,
      },
    });
  };

  handleAdd = () => {
    const { addExpense } = this.props;
    const { despesa } = this.state;
    addExpense(despesa);
    const { despesa: { id } } = this.state;
    this.setState({ ...despesa.id = id + 1 });
    document.getElementById('description').value = '';
    document.getElementById('value').value = '';
  };

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Despesa:
            <input
              id="value"
              name="value"
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="selected-currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="selected-currency"
              name="currency"
              onChange={ this.handleChange }
            >
              {currencies.map((item) => <option key={ item }>{item}</option>)}
            </select>
          </label>
          <br />
          <label htmlFor="payment-form">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="payment-form"
              name="method"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="tag">
            Motivo:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <br />
          <br />
          <button
            type="button"
            onClick={ this.handleAdd }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (obj) => dispatch(getQuotation(obj)),
});

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
