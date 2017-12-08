import { createReducer } from "redux-act";

const inititalState = {
  running: false,
  result: false,
  error: false
};

const reducer = createReducer(
  {
    [request]: state => ({ ...state, running: true }),
    [success]: (state, result) => ({ running: false, result }),
    [failure]: (state, error) => ({ running: false, error })
  },
  inititalState
);
