import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const rootReducers = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducers);

export default store;
