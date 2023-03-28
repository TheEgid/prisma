import createSagaMiddleware, { Task } from "redux-saga";
import storage from "redux-persist/lib/storage";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import { configureStore, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
// import { initImageSaga } from "./image/sagas";

export interface IPersistorStore extends Store {
    runSaga: () => void;
    sagaTask: Task;
    __PERSISTOR?: Persistor;
}

let store: IPersistorStore;

const makeStore = () => {
    const isServer = () => {
        return typeof window === "undefined";
    };

    const persistConfig = getPersistConfig({
        key: "primary",
        storage,
        // blacklist: ['dogSlice', 'registeredVisitorSlice', 'userSlice.error'],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        rootReducer,
    });

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const sagaMiddleware = createSagaMiddleware();

    const makeConfiguredStore = (reducer: (state: any, action: any) => any) =>
        configureStore({
            reducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }).concat(sagaMiddleware),
            devTools: process.env.NODE_ENV !== "production",
        });

    store = makeConfiguredStore(isServer() ? rootReducer : persistedReducer) as IPersistorStore;

    if (!isServer()) {
        store.__PERSISTOR = persistStore(store);
    }

    store.runSaga = () => {
        if (store.sagaTask) {
            return;
        }
        store.sagaTask = sagaMiddleware.run(rootSaga);
    };
    store.runSaga();
    // sagaMiddleware.run(initImageSaga);

    return store;
};

export { store };

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
