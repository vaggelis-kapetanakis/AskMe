import { useState } from "react";
import {
  HeroContainer,
  HeroBg,
  HeroWrapper,
  HeroRow,
  Column1,
  Column2,
  HeroH1,
  HeroH2,
  HeroBtnWrapper,
  ArrowRight,
  ArrowForward,
  HeroP,
} from "./HeroElements";
import frontImg from "../../assets/images/background.jpg";
import { Button } from "../ButtonElement";
import LineChartHero from "./LineChartHero";

const Hero = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer id="home">
      <HeroBg
        style={{
          backgroundImage: `url(${frontImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <HeroWrapper>
        <HeroRow>
          <Column1>
            <HeroH1>Join our</HeroH1>
            <HeroH2>Q&A Network</HeroH2>
            <HeroP>
              Start today by signing up on our website so you can find the
              answers you want or answer the questions you know.
            </HeroP>
            <HeroBtnWrapper>
              <Button
                to="/login"
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                exact="true"
              >
                Best around {hover ? <ArrowForward /> : <ArrowRight />}
              </Button>
            </HeroBtnWrapper>
          </Column1>
          <Column2>
            <LineChartHero />
          </Column2>
        </HeroRow>
      </HeroWrapper>
    </HeroContainer>
  );
};

export default Hero;
