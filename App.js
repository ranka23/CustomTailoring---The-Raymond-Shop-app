import React from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as firebase from "firebase/app";

import authReducer from "./store/reducers/auth";
import customerReducer from "./store/reducers/customer";
import userReducer from "./store/reducers/user";


import AppNavigator from "./AppNavigator";

const firebaseConfig = {
  apiKey: "AIzaSyAcMvdYt_2KeybZtnncEfT-LOgsue3GMV8",
  authDomain: "the-raymond-shop.firebaseapp.com",
  databaseURL: "https://the-raymond-shop.firebaseio.com",
  projectId: "the-raymond-shop",
  storageBucket: "the-raymond-shop.appspot.com",
  messagingSenderId: "924074280749",
  appId: "1:924074280749:web:a7f1e4f02ea2713235f5a4",
  measurementId: "G-7RNQMJBYSH",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
