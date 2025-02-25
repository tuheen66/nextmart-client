"use client"
import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import {Provider } from "react-redux"

const StoreProvider = ({children}:{children:ReactNode}) => {

    const storeRef = useRef<AppStore>(undefined)

    //* to prevent store to be created multiple times

    if (!storeRef.current){
        storeRef.current= makeStore()
    }

    //* need to call this provider in Provider.tsx
    return (
        <Provider store={storeRef.current}>
            
            {children}
        </Provider>
    );
};

export default StoreProvider;