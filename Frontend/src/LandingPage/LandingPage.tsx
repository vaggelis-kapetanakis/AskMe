import MainNavigation from "./Navbar/MainNavigation";
import HeroSection from "./HeroSection/Hero";
import DemoSection from "./DemoSection/DemoSection";
import Footer from "./Footer/Footer";
import TopicsSection from "./TopicsSection/TopicsSection";
import ServicesSection from "./ServiceSection/ServicesSection";
import WhyUsSection from "./WhyUsSection/WhyUsSection";

const LandingPage = () => {
  return (
    <>
      <section className="glass">
        <MainNavigation />
        <HeroSection />
        <DemoSection />
        <ServicesSection />
        <TopicsSection />
        <WhyUsSection />
        <Footer />
      </section>
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="circle4"></div>
      <div className="circle5"></div>
      <div className="circle6"></div>
      <div className="circle7"></div>
    </>
  );
};

export default LandingPage;
