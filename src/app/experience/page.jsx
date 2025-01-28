import React, { useContext, useEffect } from "react";
import Context from "../../Context/Context";
import useLocoScroll from "../scrollConfig";
import Footer from "../Components/Utils/Footer";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import experience from "../data/experience";

const Experience = () => {
  const context = useContext(Context);
  const timeline = gsap.timeline();
  const location = useLocation();

  // useLocoScroll(true, context?.handleScroll);

  const animateBox = (boxId, xStart, xEnd, startTrigger, endTrigger) => {
    gsap.fromTo(
      `#${boxId}`,
      {
        opacity: 0,
        x: xStart,
      },
      {
        x: xEnd,
        opacity: 1,
        zIndex: 0,
        duration: 3,
        ease: "none",
        scrollTrigger: {
          scrub: 1,
          start: startTrigger,
          end: endTrigger,
          trigger: `#${boxId}`,
        },
      }
    );
  };

  useEffect(() => {
    timeline.fromTo(
      "#expIdText span",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.05 }
    );
    if (context?.width > 600) {
      timeline.fromTo(".mainLineExpertise", { width: "0%" }, { width: "80%" });
    } else {
      timeline.fromTo(".mainLineExpertise", { width: "0%" }, { width: "95%" });
    }
  }, [location]);

  useEffect(() => {
    window.scroll(0, 0);
    context?.setNavColor(false);
    gsap.fromTo(
      "#height",
      {
        height: "0px",
      },
      {
        height: "1950px",
        zIndex: 0,
        duration: 3,
        ease: "none",
        scrollTrigger: {
          scrub: true,
          start: "top 43%",
          end: "top -100%",
          trigger: "#height",
        },
      }
    );
    if (context?.width > 600) {
      for (let i = 0; i < experience.length; i++) {
        if (context?.width < 600) {
          animateBox(
            `box${i + 1}`,
            i % 2 === 0 ? 200 : -200,
            0,
            "top 85%",
            "top 86%"
          );
        } else {
          animateBox(
            `box${i + 1}`,
            i % 2 === 0 ? 200 : -200,
            0,
            "top 50%",
            "top 70%"
          );
        }
      }
    } else {
      timeline.fromTo(
        `.boxExp`,
        {
          opacity: 0,
          y: -10,
        },
        { y: 0, opacity: 1, stagger: 0.4 }
      );
    }
  }, [location]);

  return (
    <div
      data-scroll-container
      className="bg-white w-full flex flex-col items-center justify-center App"
    >
      <div className="w-full mt-[25vw] md:mt-[8vw]" data-scroll-section>
        <h1
          id="expIdText"
          className="h1-text text-textGrey px-5 md:px-[12vw] md:w-10/12"
        >
          {"Transforming Expertise into Impactful Journeys"
            .split("")
            .map((e, i) => {
              return <span key={i}>{e}</span>;
            })}
        </h1>
        <div className="mainLineExpertise h-[1px] mx-5 md:mx-[12vw] mx-auto bg-gray-400/50 mt-5 md:mt-16"></div>
        <div className="flex flex-col justify-center overflow-x-hidden">
          <div className="relative w-10/12 md:w-9/12 mx-auto mt-0 md:mt-10">
            <div
              id="height"
              className="height absolute hidden mt-2 w-1 h-full transform -translate-x-1/2 bg-textGrey lg:block left-1/2"
            ></div>
            <div className="space-y-1 md:space-y-4 md:pt-0 pt-16">
              {experience.map((e, i) => {
                return <Card e={e} key={i} i={i + 1} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Card = ({ e, i }) => {
  return (
    <div id={`box${i}`} className="boxExp">
      <div
        onClick={(element) => {
          element.preventDefault();
          if (e?.url) {
            window.open(e?.url);
          }
        }}
        className="flex flex-col cursor-pointer items-center md:mb-0 mb-5"
      >
        <div
          className={`flex items-center ${
            i % 2 === 0
              ? "justify-center md:justify-start"
              : "justify-center md:justify-end"
          } w-full mx-auto`}
        >
          <div
            className={`w-full lg:w-1/2 ${
              i % 2 === 0 ? "md:pr-10" : "md:pl-10"
            }`}
          >
            <div className="relative flex-1 mb-10 bg-white rounded-lg shadow lg:mb-8 dark:bg-white greyHover cursor-pointer">
              <div
                className={`static md:absolute inline-block w-4 overflow-hidden -translate-y-1/2 top-3 ${
                  i % 2 === 0 ? "-right-4" : "-left-4 rotate-[180deg] mt-4"
                }`}
              >
                <div
                  className={`hidden h-10 origin-bottom-left transform -rotate-[45deg] bg-white shadow lg:block dark:bg-white`}
                ></div>
              </div>
              <div className=" relative z-20 pb-2 text-textGrey">
                <div
                  className={`flex flex-col flex-wrap px-4 ${
                    i % 2 === 0
                      ? "text-center md:text-end"
                      : "text-center md:text-start"
                  }`}
                >
                  <div
                    className={`flex items-center mt-2 justify-between ${
                      i % 2 !== 0
                        ? "flex-col md:flex-row"
                        : "flex-col md:flex-row-reverse"
                    }`}
                  >
                    <h2 className="font-bold text-xl md:text-2xl">
                      {e?.title}
                    </h2>
                    <h3 className="font-medium md:text-base text-sm md:mt-0 mt-1">
                      {e?.timeline}
                    </h3>
                  </div>
                  <h2 className="md:text-lg font-semibold my-1">
                    {e?.name}{" "}
                    {e?.link && (
                      <span
                        onClick={() => {
                          window.open(e?.link);
                        }}
                      >
                        | <span className="text-newBlue underline">Link</span>
                      </span>
                    )}
                    {e?.url && (
                      <span
                        onClick={() => {
                          window.open(e?.url);
                        }}
                        className="ml-2"
                      >
                        |{" "}
                        <span className="text-newBlue underline">Document</span>
                      </span>
                    )}
                  </h2>
                  <p className="text-sm md:text-base">{e?.about}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center w-14 md:w-8 h-14 md:h-8 transform -translate-x-1/2 -translate-y-8 md:-translate-y-4 bg-blue-500 rounded-full dark:bg-textGrey left-1/2 lg:translate-y-[4px]">
          <span className="text-white dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-7 md:w-4 h-7 md:h-4 bi bi-globe"
              viewBox="0 0 16 16"
            >
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Experience;
