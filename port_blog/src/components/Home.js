import React from 'react'
import Common from '../common/Common'
import Contact from '../portfolio/contact/Contact';
import About from './About/About';
import Blog from './Blogs/Blogs';
import Experience from './Experience/Experience';
import Navbar from './Navbar/Navbar'
import Portfolio from './Portfolio/Portfolio';

const Home = () => {
    return (
      <>
        <Navbar />
        <Common
          ty="Html."
          ty1="Css."
          ty2="Tailwind Css."
          ty3="Javascript."
          ty4="React Js."
          ty5="Node Js."
          ty6="Mongo DB."
          title1="Hello There!"
          title2="Welcome To"
          span2="You In Here."
          title3={
            <>
              <span>Full-Stack</span> Dual Website
            </>
          }
          span3="MERN."
          title4="I Am A Full-Stact Web Application Developer!"
          span4="In Three Years Of Experience."
          span5="If Would You Like To Hire Me For Better Experience. Just Send Me A Message Friendly!"
          btntext="Enjoy Here!"
          img="/home.png"
        />

        <About />
        <Experience />
        <Portfolio />
        <Blog />
        <Contact />
      </>
    );
}

export default Home