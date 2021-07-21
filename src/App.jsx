import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ROUTE_KEY } from "./configs/routes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Route path={ROUTE_KEY.Home} exact component={Login} />
        <Route path={ROUTE_KEY.Login} exact component={Login} />
        <Route path={ROUTE_KEY.Register} exact component={Register} />
      </Router>
    </ChakraProvider>
  );
};

export default App;
