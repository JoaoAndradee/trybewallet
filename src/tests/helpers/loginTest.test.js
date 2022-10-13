import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe(('Validação da página de Login'), () => {
  const emailArea = 'email-input';
  const passwordArea = 'password-input';

  test('Se existe o input de email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailArea);
    expect(emailInput).toBeInTheDocument();
  });
  test('Se existe o input de password', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId(passwordArea);
    expect(passwordInput).toBeInTheDocument();
  });
  test('Se existe o botão de entrar', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).toBeInTheDocument();
  });
  test('Se o botão está desabilitado sem digitar os campos', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).toBeDisabled();
  });
  test('Se ao digitar os inputs o botão fica habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailArea);
    const passwordInput = screen.getByTestId(passwordArea);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'joao@gmail.com');
    userEvent.type(passwordInput, '1234562');
    expect(btnEntrar).not.toBeDisabled();
  });
  test('Se a home esta pathname /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('Se ao clicar em entrar a página é redirecionada para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailArea);
    const passwordInput = screen.getByTestId(passwordArea);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'joao@gmail.com');
    userEvent.type(passwordInput, '1234562');
    userEvent.click(btnEntrar);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
