import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { graphqlClient } from "services/graphql";
import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "appContext/SnackbarUtils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={graphqlClient}>
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <App />
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </ApolloProvider>
  </React.StrictMode>
);
