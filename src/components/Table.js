import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionDeleteRow } from '../redux/actions/actionDeleteRow';

class Table extends Component {
  handleDelete = (tr) => {
    const { expenses, deleteRow } = this.props;
    const teste = expenses.filter((item) => item !== expenses[tr]);
    deleteRow(teste);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {expenses.map((item, index) => (
            <tr key={ index }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{Number(item.value).toFixed(2)}</td>
              <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>
                {Number(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}
              </td>
              <td>Real</td>
              <td id="buttons-edit-delete">
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ this.handleEdit }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ `myBtn-${index}` }
                  onClick={ () => {
                    const btn = document.getElementById(`myBtn-${index}`);
                    const myBtn = document.createElement('button');
                    myBtn.setAttribute('data-testid', 'delete-btn');
                    const paiMyBtn = document.getElementById('buttons-edit-delete');
                    btn.remove();
                    paiMyBtn.appendChild(myBtn);
                    const valor = document.getElementById('la');
                    myBtn.addEventListener('click', () => {
                      valor.innerText = '0.00';
                    });
                    this.handleDelete(index);
                  } }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  deleteRow: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: [...state.wallet.expenses],
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: (row) => dispatch(actionDeleteRow(row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
