import React from 'react';
import Hero from "../Component/Hero";
import About from './About';
import Coupons from './Coupons';
import Map from './Map';
import Login from "../Component/Authsection/login"
import Register from './Authsection/Register';
import { Contact } from 'lucide-react';
// import ContactSection from './ContactSection';
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <About></About>
            <Coupons></Coupons>
            <Map></Map>
            {/* <ContactSection></ContactSection> */}
        </div>
    );
};

export default Home;