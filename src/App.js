import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./app/Components/Utils/Navbar";
import MouseBalls from "./app/Components/Animations/MouseBalls";
import TransitionTemplate from "./TransitionTemplate";
import ScrollWrapper from "./app/ScrollWrapper";
import Loader from "./app/Loader";

// Lazy load components
import Home from "./app/Home";
const Projects = React.lazy(() => import("./app/projects/page"));
const Experience = React.lazy(() => import("./app/experience/page"));
const About = React.lazy(() => import("./app/about/page"));
const Contact = React.lazy(() => import("./app/contact/page"));
const Hackathons = React.lazy(() => import("./app/achievements/page"));
const IndividualProject = React.lazy(() =>
  import("./app/individual-project/page")
);

const App = () => {
  return (
    <TransitionTemplate>
      <Navbar />
      <MouseBalls />
      <ScrollWrapper>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<IndividualProject />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<About />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </ScrollWrapper>
    </TransitionTemplate>
  );
};

export default App;
