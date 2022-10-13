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
  test('se adiciona despesas na tabela', () => {
    const despesaInput = screen.getByRole('spinbutton', { name: /despesa:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(despesaInput, '5');
    userEvent.type(descriptionInput, 'ifood');
    userEvent.click(btnAddExpense);
    setTimeout(() => {
      const btnEdit = screen.getByRole('button', { name: /editar/i });
      const btnDele = screen.getByRole('button', { name: /deletar/i });
      expect(btnEdit).toBeInTheDocument();
      expect(btnDele).toBeInTheDocument();
      userEvent.click(btnDele);
      userEvent.click(btnEdit);
    }, 2000);
  });
  test('history', () => {
    setTimeout(() => {
      const { history } = renderWithRouterAndRedux(<App />);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/carteira');
    }, 2000);
  });
  test('restante da cobertura', () => {
    renderWithRouterAndRedux(<App />);
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
  });
  test('lalala', () => {
  });
});
