import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const rootReducers = combineReducers({
  form: formReducer,
});

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
