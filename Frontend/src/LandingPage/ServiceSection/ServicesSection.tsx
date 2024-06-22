import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
  ServicesButton,
  ServicesLi,
  ServicesUl,
  ServicesI,
  ServicesH4,
  ServicesTitle,
} from "./ServiceElements";
import { FaCheck, FaTimes } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <>
      <ServicesContainer id="services">
        <ServicesTitle>Our Services</ServicesTitle>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon style={{ color: "rgba(192,192,192,1)" }} />
            <ServicesH1>Average Plan</ServicesH1>
            <ServicesP>What you get:</ServicesP>
            <ServicesUl>
              <ServicesLi>
                <ServicesI planYes={true}>
                  <FaCheck />
                </ServicesI>
                <ServicesH4>All of our app features</ServicesH4>
              </ServicesLi>
              <ServicesLi>
                <ServicesI planYes={true}>
                  <FaCheck />
                </ServicesI>
                <ServicesH4>Choose questions based on tags</ServicesH4>
              </ServicesLi>
              <ServicesLi>
                <ServicesI planYes={false}>
                  <FaTimes />
                </ServicesI>
                <ServicesH4>Unlimited questions</ServicesH4>
              </ServicesLi>
            </ServicesUl>
            <ServicesH2>3,99 € / month</ServicesH2>
            <ServicesButton>Choose Average Plan</ServicesButton>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon style={{ color: "rgba(255,215,0,0.5)" }} />
            <ServicesH1>Premium Plan</ServicesH1>
            <ServicesP>What you get:</ServicesP>
            <ServicesUl>
              <ServicesLi>
                <ServicesI planYes={true}>
                  <FaCheck />
                </ServicesI>
                <ServicesH4>All of our app features</ServicesH4>
              </ServicesLi>
              <ServicesLi>
                <ServicesI planYes={true}>
                  <FaCheck />
                </ServicesI>
                <ServicesH4>Choose questions based on tags</ServicesH4>
              </ServicesLi>
              <ServicesLi>
                <ServicesI planYes={true}>
                  <FaCheck />
                </ServicesI>
                <ServicesH4>Unlimited questions</ServicesH4>
              </ServicesLi>
            </ServicesUl>
            <ServicesH2>6,99 € / month</ServicesH2>
            <ServicesButton>Choose Premium Plan</ServicesButton>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon style={{ color: "rgba(205,127,50,0.5)" }} />
            <ServicesH1>Free Plan</ServicesH1>
            <ServicesP>What you get:</ServicesP>
            <ServicesUl>
              <ServicesLi>
                <ServicesI planYes={true}>
                  <FaCheck />
                </ServicesI>
                <ServicesH4>Most of our app features</ServicesH4>
              </ServicesLi>
              <ServicesLi>
                <ServicesI planYes={false}>
                  <FaTimes />
                </ServicesI>
                <ServicesH4>Choose questions based on tags</ServicesH4>
              </ServicesLi>
              <ServicesLi>
                <ServicesI planYes={false}>
                  <FaTimes />
                </ServicesI>
                <ServicesH4>Unlimited questions</ServicesH4>
              </ServicesLi>
            </ServicesUl>
            <ServicesH2>0 € / month</ServicesH2>
            <ServicesButton>Choose Free Plan</ServicesButton>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default ServicesSection;

/**
 * 
 * <ServicesCard
              icon={<FaCrown style={{ color: "rgba(192,192,192,1)" }} />}
              title={"Average Plan"}
              info={[
                "true,Free something",
                "true,Free something",
                "false,You don't get that",
              ]}
              price={"3,99 € / month"}
              plan={"Average"}
            /> 

            <ServicesCard
              icon={<FaCrown style={{ color: "rgba(255,215,0,0.5)" }} />}
              title={"Premium Plan"}
              info={[
                "true,Free something",
                "true,Free something",
                "true,Free something",
              ]}
              price={"6,99 € / month"}
              plan={"Premium"}
            />


            <ServicesCard
              icon={<FaCrown style={{ color: "rgba(205,127,50,0.5)" }} />}
              title="Free Plan"
              info={[
                "true,Free something",
                "false,Free something",
                "false,You don't get that",
              ]}
              price={"0 €"}
              plan={"Free"}
            />
 */
