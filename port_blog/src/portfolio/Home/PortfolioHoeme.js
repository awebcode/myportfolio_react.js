import React from 'react'
import Common from '../../common/Common';


import About from '../About/About';
import Contact from '../contact/Contact';
import Experience from '../Experience/Experience';

import Navbar from '../Navbar/Navbar'
import Offer from '../offer/Offer';
import { offerData } from '../offer/OfferData';
import Portfolio from '../Portfolio/Portfolio';
import Testiminial from '../testimonial/Testiminial';


const PortfolioHoeme = () => {
  return (
    <div>
      <Navbar />{" "}
      <Common
        type0="Full Stack."
        type="Web Developer."
        type1="Web Designer."
        type2="Freelancer."
        type3="Good Teacher."
        type4="Problem Solver."
        title1="Hello There!"
        title2="This Is"
        span2="Asikur Rahman."
        title3="Full-Stack Developer"
        span3="MERN."
        title4="I Am A Full-Stact Web Application Developer!"
        span4="In Three Years Of Experience."
        span5="If Would You Like To Hire Me For Better Experience. Just Send Me A Message Friendly!"
        btntext="Download Cv"
        btncv="/resume.docx"
        img="/port2.png"
      />
      <About />
      <Portfolio />
      <Experience />
      <Offer />
      <Testiminial />
      <Contact />
    </div>
  );
}

export default PortfolioHoeme