import React, { useRef, useEffect, useState, useContext } from "react";
import Context from "../Context/Context";

const Loader = () => {
  const { tl } = useContext(Context);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      // setTimeout(() => {
      setShowLoader(false);
      tl.play();
      // }, 4000);
    }
    window.addEventListener("load", () => {
      // setTimeout(() => {
      setShowLoader(false);
      tl.play();
      // }, 4000);
    });
  }, []);

  return showLoader ? (
    <div className="bg-textGrey h-[100vh] w-[100vw] overflow-hidden flex items-center justify-center fixed top-0 left-0 z-50">
      <img
        width={1000}
        height={1000}
        src="/loading-new.gif"
        alt="Loading"
        priority={true}
        unoptimized={true}
        className="invert w-full md:w-6/12 mx-auto"
      />
    </div>
  ) : null;
};

export default Loader;
