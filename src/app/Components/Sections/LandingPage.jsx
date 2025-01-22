import gsap from "gsap";
import React, { useContext, useEffect } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import BallAnimation from "../Animations/BallAnimation";
import Context from "../../../Context/Context";

const LandingPage = ({ location }) => {
  const { tl, headingRightScroll, width } = useContext(Context);
  useEffect(() => {
    headingRightScroll();
  }, []);

  let n = 2;
  const handleMouseEnter = (e) => {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    const parent = e.target.parentNode;
    const children = parent.children;
    for (let i = index - n; i <= index + n; i++) {
      if (children[i]) {
        gsap.to(children[i], { color: "#000" });
      }
    }
    gsap.to(".mouse", {
      width: "80px",
      height: "80px",
      border: "2px solid #fff",
    });
  };
  const handleMouseLeave = (e) => {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    const parent = e.target.parentNode;
    const children = parent.children;

    for (let i = index - n; i <= index + n; i++) {
      if (children[i]) {
        gsap.to(children[i], { color: "#fff" }); // Assuming the original color is black
      }
    }
    gsap.to(".mouse", {
      width: "25px",
      height: "25px",
      border: "1px solid #000",
    });
  };

  useEffect(() => {
    if (width > 600) {
      tl.fromTo("#arrow", { x: 10, opacity: 0 }, { x: 0, opacity: 1 });
      tl.fromTo(
        "#expertise",
        { x: 10, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.2 }
      );
      tl.fromTo("#mainBg", { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
      tl.fromTo("#resumeBox", { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
      tl.fromTo("#nameBox", { x: 100, opacity: 0 }, { x: 0, opacity: 1 });
    } else {
      tl.fromTo("#mainBg", { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
      tl.fromTo("#resumeBox", { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
      tl.fromTo("#nameBox", { x: 100, opacity: 0 }, { x: 0, opacity: 1 });
    }
  }, [location]);

  return (
    <div
      data-scroll-section
      className="h-[90vh] md:h-[100vh] relative bg-darkGrey overflow-hidden Landingpage"
    >
      <img
        src={"/data/bg2.png"}
        width={10000}
        height={10000}
        alt={"Bg"}
        priority={true}
        id="mainBg"
        className="w-full h-full bottom-0 relative z-20 pt-[8vh] object-contain object-bottom bg2"
      />
      <div className="px-[4vw] w-full h-[90vh] z-30 absolute top-0 left-0 flex items-start md:items-center justify-between">
        <div className="text-white md:block hidden">
          <IoIosArrowRoundDown
            id="arrow"
            className="text-7xl mb-[2vw] ml-[-2vw] rotate-[-45deg]"
          />
          <div>
            {[
              "MERN Stack Web Developer",
              "Approaching 2 Years of Experience",
              "Experienced 8+ Startups",
              "Passionate Data Science Learner",
              "SIH 2023 Hackathon Winner",
            ].map((e) => {
              return (
                <p
                  id="expertise"
                  key={e}
                  className="text-3xl leading-relaxed relative z-50"
                >
                  {e?.split("").map((e, i) => {
                    return (
                      <span
                        key={i}
                        data-index={i}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {e}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>
        </div>{" "}
        <div
          className="mb-[5vw] absolute z-40 right-3 md:right-10 top-[8vh]"
          id="resumeBox"
        >
          <BallAnimation
            className="w-[40vw] md:w-[25vw] h-[40vw] md:h-[25vw]"
            ballSize={
              "w-[23vw] md:w-[8vw] h-[23vw] md:h-[8vw] md:text-2xl font-semibold"
            }
            text="Resume"
            cnt={0}
            onClick={(e) => {
              window.open(
                "https://drive.google.com/file/d/1NnKntQW4trbt0rwlHyAZEXnyRj-YcGZW/view?usp=sharing"
              );
            }}
          />
        </div>
      </div>
      <div
        id="nameBox"
        className={`absolute z-30 md:z-10 bottom-0 flex whitespace-nowrap w-full`}
      >
        <h1
          id="nameBoxHeading"
          className="text-[30vw] md:text-[15vw] font-semibold text-white lg:text-white/80 pl-5 md:pl-20 bg2"
        >
          - Anekant Jain
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
