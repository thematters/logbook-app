import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "~/components";

import styles from "./styles.module.css";
import "swiper/css";
import "swiper/css/navigation";

export const Showcase = () => {
  return (
    <section className={styles.showcase}>
      <style global jsx>{`
        .swiper-wrapper {
          position: relative;
          left: 0;
        }
        .swiper-slide {
          width: 199px;
          height: auto;
        }
        .swiper-slide .content {
          opacity: 0;
        }
        .swiper-slide-active::before {
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          background-image: url(/images/showcase-bg.png);
          background-repeat: no-repeat;
          background-position: left top;
          background-size: contain;
        }
        .swiper-slide-active figure {
          width: 191px;
          height: 212px;
          transition: transform 0.5s ease;
          transform: translate(18px, 24px);
        }
        .swiper-slide-active figure img {
          filter: grayscale(0) !important;
        }
        .swiper-slide-active .content {
          transition: opacity 0.5s ease;
          transition-delay: 0.25s;
          opacity: 1;
        }
        .swiper-slide-active figure::before,
        .swiper-slide-active figure::after {
          opacity: 0;
        }
        .swiper-button-prev,
        .swiper-button-next {
          width: 48px;
          height: 48px;
          top: initial;
          left: 0;
          right: 0;
          bottom: 48px;
          margin: 0 auto;
        }
        .swiper-button-prev {
          transform: translateX(-148px);
        }
        .swiper-button-next {
          transform: translateX(148px);
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          transition: border 0.5s ease;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px solid #e7dcfa;
          border-radius: 50%;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 16px;
        }
        .swiper-button-prev:hover::after,
        .swiper-button-next:hover::after {
          border-color: #9c69f1;
        }
        .swiper-button-prev::after {
          background-image: url(/images/showcase-arr-prev.svg);
        }
        .swiper-button-next::after {
          background-image: url(/images/showcase-arr-next.svg);
        }
        @media (min-width: 992px) {
          .swiper-wrapper {
            left: -335px;
          }
          .swiper-slide {
            width: 420px;
            height: 498px;
          }
          .swiper-slide-active figure {
            width: 353px;
            height: 391px;
            transform: translate(43px, 72px);
            animation: changeShapes 0.5s ease forwards;
          }
          .swiper-slide .content {
            width: 396px;
            position: absolute;
            left: calc(100% + 196px);
            bottom: 0;
          }
          .swiper-button-prev {
            transform: translateX(24px);
          }
          .swiper-button-next {
            transform: translateX(516px);
          }
        }
        @media (max-width: 991px) {
          .swiper-slide-active figure {
            clip-path: path(
              M1.562,
              75.717c9.927,
              28.6,
              35.112,
              10.585,
              74.691,
              1.792,
              129.5-10.384,
              191.536,
              41.868,
              191,
              86.548s130.82,
              214.9,
              74.691,
              211.923-6.8,
              122.834,
              1.562,
              75.717z
            );
            margin: 0 0 60px;
          }
        }
        @keyframes changeShapes {
          from {
            clip-path: path(
              "M0.030766 136.327C1.44292 77.7242 27.5678 64.3091 65.6961 24.7699C122.889 -22.5358 161.017 2.17614 188.554 62.897C216.091 123.618 194.202 199.872 120.064 222.466C45.9259 245.06 -1.38139 194.93 0.030766 136.327Z"
            );
          }
          to {
            clip-path: path(
              "M2.89357 139.809C18.3936 52.8089 65.0582 19.5455 138.394 3.30895C239.943 -19.1744 354.894 77.3089 353.894 159.809C352.894 242.309 242.394 396.809 138.394 391.309C34.3936 385.809 -12.6064 226.809 2.89357 139.809Z"
            );
          }
        }
      `}</style>
      <svg
        className={styles.svg}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath
            id="clipping"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.005, 0.004385964912281)"
          >
            <path d="M0.030766 136.327C1.44292 77.7242 27.5678 64.3091 65.6961 24.7699C122.889 -22.5358 161.017 2.17614 188.554 62.897C216.091 123.618 194.202 199.872 120.064 222.466C45.9259 245.06 -1.38139 194.93 0.030766 136.327Z" />
          </clipPath>
        </defs>
      </svg>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>Showcase</h1>
        </div>
      </Container>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={0}
        loop={true}
        modules={[Navigation]}
        navigation={true}
        allowTouchMove={false}
        grabCursor={false}
      >
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-1.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                On December 31, 2022, the number of new coronavirus cases
                worldwide once again exceeded 1 million daily. The new
                coronavirus has mutated more than 10 times in 2022. The United
                States announced that it will abandon the announcement of daily
                new cases of new crowns, and believes that the new crown will,
                like the flu, become a virus that coexists with human society
                for a long time. China has become the only country in the world
                that adheres to the zero policy.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0xDE...431c</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-2.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                In 2022, the 96-year-old Queen Elizabeth passed away. Affected
                by the epidemic, no large-scale public mourning ceremony will be
                held. After Crown Prince Charles succeeded to the throne as King
                of the United Kingdom, he insisted on granting the title of
                Queen Camilla, which caused a strong rebound in British public
                opinion, which once triggered a royal crisis. After much
                coordination, Camilla will not receive the title of Queen and
                will participate in royal affairs with the title of Duchess of
                Cornwall.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0xD4...Aded</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-3.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                In 2022, the Taiwan Gay Parade will be held online again and
                again due to the epidemic. Beijing unilaterally announced that,
                except for students in Taiwan and Lu Pei, it would prohibit any
                mainlander from contacting Taiwan.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0xb4...3A1f</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-4.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                In 2022, Trump announced his candidacy for the 2024 presidential
                race. With the unpopularity of the Biden administration's
                epidemic policy and international issues in 2021, many analysts
                believe that Trump is still very likely to win the election.
                Hollywood and the fame and fortune circles, suffering from
                cancel culture, began to change the trend of one-sided support
                for the Democratic Party two years ago, and the division of the
                United States has further intensified.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>yihanhuang.eth</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-5.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                A small-scale war broke out in the Taiwan Strait, the People's
                Liberation Army attempted to capture the Matsu Islands, and U.S.
                ships sailed into the Taiwan Strait. Taiwan and the United
                States officially announced the launch of military cooperation
                to build a US military base in Zuoying Port in Kaohsiung.
                Taiwan, the United States, and Japan form a military joint
                defense. Cross-strait relations have entered a period of rapid
                freezing, and airlines have announced that they will suspend
                cross-strait flights due to safety factors until the end of the
                war.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0x35...f691</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-6.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                In 2022, more feminist bloggers and self-media accounts will
                emerge, and an anonymous white paper on Chinese feminism will
                begin to circulate on the Internet. The preface is a capitalized
                slogan from the Xianzi v. Zhu Jun case: If we don’t get justice,
                we justify society; if we don’t get justice now, we justify
                history.” Despite many controversies, it is still one of the
                milestones on the road to gender equality in China.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>beryliu.eth</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-7.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                In the 2022 FIFA, Italy win the FIFA again. The previous
                champions, France, did not make it to the quarter-finals.
                Although this time it was held in Qatar, an Asian country, no
                Asian team entered the top 8. Messi and Cristiano Ronaldo still
                didn’t win this time. These two footballers who have ruled the
                world for ten years have bid farewell to the World Cup and moved
                towards the end of the golden age. Countless fans cried for
                this.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0x73...DAf8</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-8.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                Hong Kong people in exile announced the establishment of a
                provisional government-in-exile in London. Coinciding with the
                25th anniversary of the establishment of the Hong Kong Special
                Administrative Region government, Beijing pressured the United
                Kingdom not to provide support for the government in exile,
                otherwise it would seriously damage Sino-British relations, but
                the move infuriated the British government. The Hong Kong
                government in exile has also received support from the United
                States, Japan, and Australia. At the end of the year, the
                British government announced that it would find a piece of land
                for the government-in-exile to use as its headquarters,
                following the example of Dharamsala.
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0xf1...40D3</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <figure className={styles.figure}>
            <img className={styles.image} src="/images/showcase-9.jpg" />
          </figure>
          <div className="content">
            <div className={styles.content_title}>
              <h3 className={styles.content_title_h3}>2022 Oracle Machine</h3>
            </div>
            <div className={styles.content_text}>
              <p className={styles.content_text_p}>
                In 2022, the last few small countries such as Kiribati, Tuvalu,
                and Nauru that have not yet been diagnosed with the new crown
                epidemic will also have infected people one after another. At
                the same time, the sixth mutated virus strain of Covid-19 is
                extremely infectious, with an R0 value of 10~13 within a few
                months of its discovery. An anthropologist brought this virus
                into the life of the Kágaba people in the Andes Mountains. land,
                resulting in the death of more than half of the population
              </p>
            </div>
            <div className={styles.wallet}>
              <div className={styles.wallet_avatar}></div>
              <div className={styles.wallet_address}>0xD8...35a1</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
