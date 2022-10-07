import { GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userEmail(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_EMAIL:
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
}

export default userEmail;
