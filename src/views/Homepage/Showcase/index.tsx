import React from "react";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container } from "~/components";

import styles from "./styles.module.css";
import 'swiper/css';
import 'swiper/css/navigation';

export const Showcase = () => {
  return (
    <Container>
      <section className={styles.showcase}>
        <style global jsx>{`
          .swiper{
            overflow: initial
          }
          .swiper-slide{
            width: 200px;
            height: 228px;
          }
          .swiper-slide::before{
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            background-image: url("/images/showcase-bg.png");
            background-repeat: no-repeat;
            background-position: left top;
            background-size: contain;
            opacity: 0;
            transition: opacity .3s ease
          }
          .swiper-slide .content{
            transition: opacity .3s ease;
            width: 396px;
            position: absolute;
            left: calc(100% + 160px);
            bottom: 0px;
            opacity: 0
          }
          .swiper-slide .content h3{
            
          }
          .swiper-slide-prev{
            width: 420px;
            height: 490px;
          }
          .swiper-slide-prev::before{
            opacity: 1
          }
          .swiper-slide-prev figure{
            animation: changeShapes .3s ease forwards;
            width: 353px;
            height: 391px;
            transition: transform .3s ease;
            transform: translate(86px, 78px)
          }
          .swiper-slide-prev figure img{
            filter: grayscale(0)!important;
          }
          .swiper-slide-prev .content{ opacity: 1 }
          .swiper-slide-prev figure::before,
          .swiper-slide-prev figure::after{opacity: 0}
          @keyframes changeShapes {
            from {
              clip-path: path('M0.030766 136.327C1.44292 77.7242 27.5678 64.3091 65.6961 24.7699C122.889 -22.5358 161.017 2.17614 188.554 62.897C216.091 123.618 194.202 199.872 120.064 222.466C45.9259 245.06 -1.38139 194.93 0.030766 136.327Z');
            }
            to {
              clip-path: path('M2.89357 139.809C18.3936 52.8089 65.0582 19.5455 138.394 3.30895C239.943 -19.1744 354.894 77.3089 353.894 159.809C352.894 242.309 242.394 396.809 138.394 391.309C34.3936 385.809 -12.6064 226.809 2.89357 139.809Z')
            }
          }
        `}</style>
        <svg className={styles.svg}>
          <defs>
            <clipPath id="clipping">
              <path d="M0.030766 136.327C1.44292 77.7242 27.5678 64.3091 65.6961 24.7699C122.889 -22.5358 161.017 2.17614 188.554 62.897C216.091 123.618 194.202 199.872 120.064 222.466C45.9259 245.06 -1.38139 194.93 0.030766 136.327Z"/>
            </clipPath>
          </defs>
        </svg>
        <div className={styles.header}>
          <h1 className={styles.title}>Showcase</h1>
        </div>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={100}
          grabCursor={true}
          loop={true}
          modules={[Navigation]}
          navigation={true}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-1.jpg" />
            </figure>
            <div className="content">
              <div className={styles.title}>
                <h3 className={styles.h3}>2022 Oracle Machine</h3>
              </div>
              <div className={styles.text}>
                <p>On December 31, 2022, the number of new coronavirus cases worldwide once again exceeded 1 million daily. The new coronavirus has mutated more than 10 times in 2022. The United States announced that it will abandon the announcement of daily new cases of new crowns, and believes that the new crown will, like the flu, become a virus that coexists with human society for a long time. China has become the only country in the world that adheres to the zero policy.</p>
              </div>
              <div className={styles.wallet}>
                <div className={styles.avatar}>
                </div>
                <div className={styles.address}>0xDE...431c</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-2.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-3.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-4.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-5.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-6.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-7.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-8.jpg" />
            </figure>
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <figure className={styles.figure}>
              <img className={styles.image} src="/images/showcase-9.jpg" />
            </figure>
          </SwiperSlide>
        </Swiper>
      </section>
    </Container>
  );
};
