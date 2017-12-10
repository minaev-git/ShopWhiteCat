import { createReducer } from "redux-act";

const makeIsFetching = (requestAction, successAction, failureAction) =>
  createReducer({}, false)
    .on(requestAction, () => true)
    .on(successAction, () => false)
    .on(failureAction, () => false);

export default makeIsFetching;
