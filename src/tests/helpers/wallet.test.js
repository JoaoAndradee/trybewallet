import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe(('Validação da página de carteira'), () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'joao@gmail.com');
    userEvent.type(passwordInput, '1234562');
    userEvent.click(btnEntrar);
  });
  test('Verifica se possui todos os inputs', () => {
    const nameArea = screen.getByRole('heading', {
      name: /joao@gmail.com/i,
    });
    const expenseValue = screen.getByTestId('total-field');
    const despesaInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const coinInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(tagInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(coinInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(despesaInput).toBeInTheDocument();
    expect(expenseValue).toBeInTheDocument();
    expect(nameArea.innerHTML).toBe('joao@gmail.com');
  });
  test('Se adiciona despesas', () => {
    const despesaInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(despesaInput, '1');
    userEvent.type(descInput, 'reforma casa');
    userEvent.click(addExpense);
    const expenseValue = screen.getByTestId('total-field');
    waitFor(() => expect(expenseValue).toBe(5.29));
  });
  test('aleatorio', () => {
    const coins = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    userEvent.click(coins);
  });
});
