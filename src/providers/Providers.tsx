"use client";

import UserProvider from "@/context/UserContext";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};

export default Providers;

//! then go to root layout (app/layout) to wrap it with this Provider function

//! go to UserProvider component to create some hooks
