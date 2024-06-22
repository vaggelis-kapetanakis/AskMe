import { useState } from "react";
import {
  TopicsAnswerImg,
  TopicsAnswerInfo,
  TopicsArrowLeft,
  TopicsArrowRight,
  TopicsContainer,
  TopicsImg,
  TopicsQuestionImg,
  TopicsQuestionInfo,
  TopicsSlide,
  TopicsTitleH1,
  TopicsTitleP,
  TopicsTitleWrapper,
  TopicsUsername,
  TopicsWrapper,
  TopicsUserIcon,
} from "./TopicsElements";
import { SliderData } from "./components/SliderData";
import questionImg from "../../assets/images/question.svg";
import answerImg from "../../assets/images/answer.svg";

const TopicsSection = () => {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <TopicsContainer id="topics">
      <TopicsWrapper className="text-black">
        <TopicsArrowLeft onClick={prevSlide} />
        <TopicsArrowRight onClick={nextSlide} />
        {SliderData.map((slide, index) => {
          return (
            <TopicsSlide
              key={Math.random().toString(36)}
              className={`text-black ${
                index === current
                  ? "opacity-100 duration-1000 grid grid-cols-[0.2fr_0.8fr] grid-rows-[0.2fr_0.4fr_0.4fr] gap-5 scale-110"
                  : "opacity-0"
              }`}
            >
              {index === current && (
                <>
                  <TopicsImg
                    key={Math.random().toString(36)}
                    src={slide.image}
                  />
                  <TopicsTitleWrapper
                    key={Math.random().toString(36)}
                  >
                    <TopicsTitleH1
                      key={Math.random().toString(36)}
                    >
                      {slide.title}
                    </TopicsTitleH1>
                    <TopicsTitleP key={Math.random().toString(36)}>
                      {slide.questionsNumber + " questions"}
                    </TopicsTitleP>
                  </TopicsTitleWrapper>
                  <TopicsQuestionImg
                    key={Math.random().toString(36)}
                    src={questionImg}
                  />
                  <TopicsQuestionInfo
                    key={Math.random().toString(36)}
                  >
                    <TopicsUsername
                      key={Math.random().toString(36)}
                    >
                      <TopicsUserIcon
                        key={Math.random().toString(36)}
                      />
                      {slide.questionUsername}
                    </TopicsUsername>
                    {slide.question}
                  </TopicsQuestionInfo>
                  <TopicsAnswerImg
                    key={Math.random().toString(36)}
                    src={answerImg}
                  />
                  <TopicsAnswerInfo
                    key={Math.random().toString(36)}
                  >
                    <TopicsUsername
                      key={Math.random().toString(36)}
                    >
                      <TopicsUserIcon
                        key={Math.random().toString(36)}
                      />
                      {slide.answerUsername}
                    </TopicsUsername>{" "}
                    {slide.answer}
                  </TopicsAnswerInfo>
                </>
              )}
            </TopicsSlide>
          );
        })}
      </TopicsWrapper>
    </TopicsContainer>
  );
};

export default TopicsSection;
