"use client"
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Slider from "./components/slider/slider";
import Products from "./components/products/products";
import OwnRig from "./components/ownrig/ownRig";
import AboutUs from "./components/aboutus/aboutUs";
import ContacUs from "./components/contactUs/contacUs";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";



import { UserProvider } from "./providers/userProvider";


const Home = () => {
  

  

  return (
    <UserProvider>
      <main>
      {/* <Navbar />  */}
      <Slider />
      <Products />
      <OwnRig />
      <AboutUs />
      <ContacUs />
      <Footer />
      </main>
    </UserProvider>
  );
}
export default Home;
