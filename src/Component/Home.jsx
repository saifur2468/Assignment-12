import React from 'react';
import Hero from "../Component/Hero";
import About from './About';
import Coupons from './Coupons';
import Map from './Map';
import Login from "../Component/Authsection/login"
import Register from './Authsection/Register';
import { Contact } from 'lucide-react';
import FeaturesAndSteps from './FeaturesAndSteps';
import Testimonials from './Testimonials';
import TopApartments from './TopApartments';
// import ContactSection from './ContactSection';
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <TopApartments></TopApartments>
            <About></About>
            <Coupons></Coupons>
            <FeaturesAndSteps></FeaturesAndSteps>
            <Testimonials></Testimonials>
            <Map></Map>
            {/* <ContactSection></ContactSection> */}
        </div>
    );
};

export default Home;