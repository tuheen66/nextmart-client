"use client";


import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  //! we can access user info from UserContext

  const user = useUser();



  return (
    <div>
      <HeroSection/>
     <Category/>
     <FeaturedProducts/>
    </div>
  );
};

export default HomePage;
