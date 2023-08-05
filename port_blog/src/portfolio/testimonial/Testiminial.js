import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./testimoni.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import TestimonialApi from "./TestimonialApi";

export default function Testiminial() {
  return (
    <>
      <div className="testimonial" id="testimonial">
        <div className="container">
          <h1 className="main-title">
            What My <span>Client's Say?.</span>
          </h1>
          <div className="testimonial-main">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={
                (true,
                {
                  clickable: true,
                })
              }
              autoplay={true}
              onDurationChange={200}
              autoHeight={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {TestimonialApi.map((v) => {
                return (
                  <>
                    <SwiperSlide>
                      <img className="img" src={v.image} alt="" />
                      <h2>
                        <span>{v.name}</span>
                      </h2>
                      <h3>{v.offcer}</h3>
                      <span>{v.post}</span>
                      <h5>{v.design}</h5>
                      <p>{v.desc}</p>
                      <span>{v.date}</span>
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
