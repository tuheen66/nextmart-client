"use client";

import { useUser } from "@/context/UserContext";

const HomePage = () => {
  //! we can access user info from UserContext

  const user = useUser();

  console.log(user);

  return (
    <div>
      <h1>Welcome to Next Mart Home Page</h1>
    </div>
  );
};

export default HomePage;
