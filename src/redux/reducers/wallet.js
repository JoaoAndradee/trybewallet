import { DELETE_ROW } from '../actions/actionDeleteRow';
import { GET_CURRENCIES } from '../actions/currenciesFetch';
import { GET_QUOTATION } from '../actions/quotationFetch';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_QUOTATION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ROW: {
    return {
      ...state,
      expenses: [...action.payload],
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
