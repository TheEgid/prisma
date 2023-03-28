import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Persistor } from "redux-persist";
import { wrapper } from "src/redux/store";
import { SSRProvider } from "react-bootstrap";

import theme from "../theme";
import "../styles/globals.scss";

const App = ({ Component, ...rest }: AppProps) => {
    const { store } = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <PersistGate persistor={store.__PERSISTOR as Persistor}>
                <SessionProvider
                    session={
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        rest.pageProps.session
                    }>
                    <SSRProvider>
                        <ChakraProvider theme={theme}>
                            <Component {...rest.pageProps} />
                        </ChakraProvider>
                    </SSRProvider>
                </SessionProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
