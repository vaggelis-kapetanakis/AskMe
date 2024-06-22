import { useEffect, useState } from "react";
import axios from "axios";
import ReadQuestion from "./ReadQuestion";
import { QuestionType } from "../../../types/global";
import MainQuestion from "../../../Dashboard/components/MainQuestion/MainQuestion";

type BrowseQuestionsType = {
  randomQuestions: QuestionType[];
};

const Browse = () => {
  const [browseQuestions, setBrowseQuestions] = useState<BrowseQuestionsType>();
  const [readQuestion, setReadQuestion] = useState("listedQuestions");
  const [questionData, setQuestionData] = useState<QuestionType>();

  const fetchBrowseQuestions = async () => {
    try {
      await axios
        .get(`https://askmeback.onrender.com/qanda/questions/browse`)
        .then((res) => {
          setBrowseQuestions(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  const handleQuestion = (question: QuestionType) => {
    setReadQuestion("readQuestion");
    setQuestionData(question);
  };

  const goBackFunction = () => {
    setReadQuestion("listedQuestions");
  };

  useEffect(() => {
    fetchBrowseQuestions();
    // eslint-disable-next-line
  }, [setBrowseQuestions]);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
          {readQuestion === "listedQuestions" && browseQuestions && (
            <div style={{ width: "100%" }}>
              <h1 className="text-4xl text-white mb-10">
                Welcome to the browse section
              </h1>
              <div className="h-[70vh] overflow-y-scroll overflow-x-hidden flex flex-col gap-y-3 backdrop-blur-md">
              {browseQuestions &&
                browseQuestions.randomQuestions.map((question) => {
                  return (
                    <MainQuestion
                      id={question._id}
                      key={question._id}
                      title={question.title}
                      answerCount={question.answerCount}
                      category={question.category}
                      creator={question.creator}
                      dateCreated={question.dateCreated}
                      tags={question.tags}
                      tagsObjId={question.tagsObjId}
                      views={question.views}
                      votes={question.votes}
                      browse={true}
                      onBrowseClick={() => handleQuestion(question)}
                    />
                  );
                })}
                
                </div>
            </div>
          )}
          <div className="w-full h-full relative">
            {readQuestion === "readQuestion" && questionData !== undefined && (
              <ReadQuestion
                goBackFunction={goBackFunction}
                data={questionData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
