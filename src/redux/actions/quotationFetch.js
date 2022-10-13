const GET_QUOTATION = 'GET_QUOTATION';

const actionGetQuotation = (payload) => ({
  type: GET_QUOTATION,
  payload,
});

function getQuotation(objInfo) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const coins = Object.keys(data);
    const exchangeObj = {};
    for (let index = 0; index < coins.length; index += 1) {
      const coinUnit = coins[index];
      exchangeObj[coinUnit] = {
        ...data[coinUnit],
      };
    }
    const {
      id,
      description,
      value,
      currency,
      method,
      tag,
    } = objInfo;

    const exchangeRates = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: { ...exchangeObj },
    };
    dispatch(actionGetQuotation(exchangeRates));
  };
}

export { GET_QUOTATION, actionGetQuotation, getQuotation };
