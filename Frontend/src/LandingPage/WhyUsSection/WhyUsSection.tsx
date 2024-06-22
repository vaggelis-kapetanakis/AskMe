import {
  WhyUsCard,
  WhyUsContainer,
  WhyUsWrapper,
  WhyUsH1,
  WhyUsH4,
  WhyUsImg,
} from "./WhyUsElements";
import community from "../../assets/images/community.jpg";
import development from "../../assets/images/development.jpg";
import question from "../../assets/images/cards-question.jpg";
import trust from "../../assets/images/cards-trust.jpg";
import correct from "../../assets/images/cards-correct.jpg";
import newTopic from "../../assets/images/cards-newTopic.jpg";

const WhyUsSection = () => {
  return (
    <WhyUsContainer id="whyUs">
      <WhyUsWrapper>
        <WhyUsCard>
          <WhyUsImg src={community} />
          <WhyUsH1>We have an active community</WhyUsH1>
          <WhyUsH4>
            It doesn't matter if your question is difficult to answer or easy,
            what matters is that here, it can be answered.
          </WhyUsH4>
        </WhyUsCard>
        <WhyUsCard>
          <WhyUsImg src={development} />
          <WhyUsH1>Our development team is always there</WhyUsH1>
          <WhyUsH4>
            Even if you find a bug you only need to report it and our
            development team will take care of it in a day.
          </WhyUsH4>
        </WhyUsCard>
        <WhyUsCard>
          <WhyUsImg src={question} />
          <WhyUsH1>Easy way to post a question</WhyUsH1>
          <WhyUsH4>
            We provide an easy yet thorough way to write your question so that
            those who can answer it can be specific about your issue.
          </WhyUsH4>
        </WhyUsCard>
        <WhyUsCard>
          <WhyUsImg src={trust} />
          <WhyUsH1>Don't be afraid to answer a question</WhyUsH1>
          <WhyUsH4>
            Even if you are not 100% sure about your answer we encourage you to
            answer.
          </WhyUsH4>
        </WhyUsCard>
        <WhyUsCard>
          <WhyUsImg src={correct} />
          <WhyUsH1>Get points for answering correctly</WhyUsH1>
          <WhyUsH4>
            The more questions you answer correctly the more points you collect.
          </WhyUsH4>
        </WhyUsCard>
        <WhyUsCard>
          <WhyUsImg src={newTopic} />
          <WhyUsH1>Create a new topic</WhyUsH1>
          <WhyUsH4>
            Start a new topic adding one more block to the variety structure
          </WhyUsH4>
        </WhyUsCard>
      </WhyUsWrapper>
    </WhyUsContainer>
  );
};

export default WhyUsSection;
