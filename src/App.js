import "./App.css";
import Router from "./Router/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux/store";
import { StrictMode } from "react";

import AppProvider from './AppProvider';

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <Router />
        </AppProvider>
        </PersistGate>
      </Provider>
    </StrictMode>);
}

export default App;
