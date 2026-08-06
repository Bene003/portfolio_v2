import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import PersonalWork from "@/components/sections/PersonalWork";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import StackMarquee from "@/components/sections/StackMarquee";
import Timeline from "@/components/sections/Timeline";
import Toolkit from "@/components/sections/Toolkit";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <Work />
      <About />
      <Services />
      <Timeline />
      <PersonalWork />
      <Toolkit />
      <Process />
      <Contact />
    </>
  );
}
