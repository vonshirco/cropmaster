import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Landing-components/Navbar/Navbar'
import Hero from './Components/Landing-components/Hero/Hero'
import Features from './Components/Landing-components/Features/Features'
import Title from './Components/Landing-components/Title/Title'
import About from './Components/Landing-components/About/About'
import Contact from './Components/Landing-components/Contact/Contact'
import Footer from './Components/Landing-components/Footer/Footer'
import Benefits from './Components/Landing-components/Benefits/Benetifs'
import Testimonials from './Components/Landing-components/Testimonials/Testimonials';
// import Application from './Components/Landing-components/Application/Application'

const App = () => {
  return (
     <div>
      <Navbar />
      <Hero />
      <div className="container">
        <About />
        {/* <Title subTitle='Our Services' title='What We Offer'/> */}
        <Features />
        <Title subTitle='' title='Why Should You Choose Us'/>
        <Benefits />
        <Title subTitle='' title='Testimonials'/>
        <Testimonials />
        <Title subTitle='' title='Get in Touch'/>
        <Contact />
        <Footer />
      </div>
      {/* <Routes>
        <Route path='/application' element={<Application />} />
      </Routes> */}
      
    </div>
  );
}

export default App