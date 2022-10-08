export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

const failedRequest = (payload) => ({
  type: FAILED_REQUEST,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      delete data.USDT;
      dispatch(getCurrencies(Object.keys(data)));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
