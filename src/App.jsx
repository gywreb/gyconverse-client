import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ROUTE_KEY } from "./configs/routes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route path={ROUTE_KEY.Home} exact component={Home} />
            <Route path={ROUTE_KEY.Login} exact component={Login} />
            <Route path={ROUTE_KEY.Register} exact component={Register} />
          </Router>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
