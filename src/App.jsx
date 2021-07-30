import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import theme from "./configs/extendTheme";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import { SocketService } from "./services/SocketService";

const App = () => {
  useEffect(() => {
    SocketService.clientInit();
    return () => {
      if (SocketService.client) {
        SocketService.removeAllListeners();
        SocketService.leaveRoom();
        SocketService.disconnect();
      }
    };
  }, [SocketService]);

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AuthProvider />
          </Router>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
