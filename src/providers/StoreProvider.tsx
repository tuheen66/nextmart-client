"use client";
import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined);

  //* to prevent store to be created multiple times

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const persistedStore = persistStore(storeRef.current);

  //* need to call this provider in Provider.tsx
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistedStore}>
        
        
        {children}</PersistGate>
    </Provider>
  );
};

export default StoreProvider;
