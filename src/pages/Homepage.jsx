import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Footer from "./../pageSection/footer.jsx";
import GetStartedSection from "./../pageSection/getStarted.jsx";
import Navbar from "./../pageSection/navbar.jsx";

export default function Homepage() {
  const [activeSection, setActiveSection] = useState("");

  const { ref: getStartedRef, inView: getStartedInView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setActiveSection("get-started-section");
      }
    },
  });


  return (
    <div>
      <Navbar activeSection={activeSection} />
      <div ref={getStartedRef}>
        <GetStartedSection />
      </div>
      <Footer />
    </div>
  );
}
