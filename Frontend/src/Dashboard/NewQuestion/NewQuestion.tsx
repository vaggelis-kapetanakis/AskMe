import React, { useState, useCallback, useMemo } from "react";
import EditorComp from "../../ui/EditorComp";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Button from "../../ui/Button";
import PreviewQuestion from "./PreviewQuestion";
import notifierMiddleware from "../../ui/notifierMiddleware";

type CategoryType = {
  value: number;
  label: string;
};

const CATEGORIES: CategoryType[] = [
  { value: 1, label: "Technology" },
  { value: 2, label: "Programming" },
  { value: 3, label: "Science" },
  { value: 4, label: "Education" },
  { value: 5, label: "Health" },
  { value: 6, label: "Business & Finance" },
  { value: 7, label: "Society & Politics" },
];

const NewQuestion: React.FC = () => {
  const [questionData, setQuestionData] = useState({
    title: "",
    body: "",
    tags: [] as string[],
    category: "",
  });
  const [preview, setPreview] = useState<"newQuestion" | "previewQuestion">(
    "newQuestion"
  );

  const handleInputChange = useCallback(
    (field: keyof typeof questionData, value: string | string[]) => {
      setQuestionData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    const { title, body, tags, category } = questionData;

    if (new Set(tags).size !== tags.length) {
      notifierMiddleware("info", "You can't use the same tag twice.");
      return;
    }

    if (title.length < 15) {
      notifierMiddleware("info", "Title must be at least 15 characters");
    } else if (body.length < 25) {
      notifierMiddleware("info", "Body must be at least 25 characters");
    } else if (category.length < 5) {
      notifierMiddleware("info", "You must choose a category");
    } else if (tags.length < 1) {
      notifierMiddleware("info", "You must insert at least one tag");
    } else {
      setPreview("previewQuestion");
      notifierMiddleware("success", "You are good to go");
    }
  }, [questionData]);

  const goBackFunc = useCallback(() => {
    setPreview("newQuestion");
  }, []);

  const questionForm = useMemo(
    () => (
      <div className="backdrop-blur-md w-full h-full grid grid-cols-[0.7fr_0.3fr] gap-x-5 p-5 bg-white/40 rounded-xl">
        <div className="flex flex-col gap-y-5 overflow-y-scroll h-[85vh] px-3">
          <QuestionInput
            title="Title"
            description="Be specific and imagine you're asking a question to another person"
            value={questionData.title}
            onChange={(value) => handleInputChange("title", value)}
          />
          <QuestionBody
            value={questionData.body}
            onChange={(value) => handleInputChange("body", value)}
          />
          <QuestionTags
            tags={questionData.tags}
            onChange={(tags) => handleInputChange("tags", tags)}
          />
          <QuestionCategory
            category={questionData.category}
            onChange={(category) => handleInputChange("category", category)}
          />
          <div className="flex items-center justify-end">
            <Button
              buttonVariant="solid"
              buttonStyle={{
                color: "primary",
                rounded: "lg",
                vPadding: "sm",
              }}
              onClick={handleSubmit}
            >
              Preview
            </Button>
          </div>
        </div>
        <QuestionGuidelines />
      </div>
    ),
    [questionData, handleInputChange, handleSubmit]
  );

  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div>
          {preview === "newQuestion" ? (
            questionForm
          ) : (
            <PreviewQuestion goBackFunc={goBackFunc} data={questionData} />
          )}
        </div>
      </div>
    </div>
  );
};

const QuestionInput: React.FC<{
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ title, description, value, onChange }) => (
  <div className="text-black/60 mb-3">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <p>{description}</p>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl my-3 bg-white text-black py-1 px-2"
    />
  </div>
);

const QuestionBody: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="text-black/60 mb-3">
    <h1 className="text-2xl font-semibold">Body</h1>
    <p>
      Include all the information someone would need to answer your question
    </p>
    <EditorComp
      value={value}
      onChange={onChange}
      customClass="bg-white h-96 rounded-xl border-none my-3"
    />
  </div>
);

const QuestionTags: React.FC<{
  tags: string[];
  onChange: (tags: string[]) => void;
}> = ({ tags, onChange }) => (
  <div className="text-black/60 mb-3 mt-3">
    <h1 className="text-2xl font-semibold">Tags</h1>
    <p>
      Add up to 5 tags to describe what your question is about (separate by
      pressing space)
    </p>
    <TagsInput
      onlyUnique={true}
      maxTags={5}
      value={tags}
      onChange={onChange}
      addKeys={[13, 32]}
    />
  </div>
);

const QuestionCategory: React.FC<{
  category: string;
  onChange: (category: string) => void;
}> = ({ category, onChange }) => (
  <div className="text-black/60 mb-3">
    <h1 className="text-2xl font-semibold">Category</h1>
    <p>Please select the category that best suits your question</p>
    <div className="grid grid-cols-3 grid-rows-3 gap-5 rounded-2xl bg-white/20 my-3 p-3">
      {CATEGORIES.map((cate) => (
        <div
          className={`
            ${
              category === cate.label
                ? "bg-white text-sky-500 border-sky-500 opacity-100"
                : "bg-white/40 border-none opacity-60"
            } flex items-center justify-center px-3 py-1
            text-base rounded-2xl cursor-pointer font-semibold
          `}
          onClick={() => onChange(cate.label)}
          key={cate.value}
        >
          {cate.label}
        </div>
      ))}
    </div>
  </div>
);

const QuestionGuidelines: React.FC = () => (
  <div className="flex flex-col items-start justify-start gap-y-5 bg-white/90 rounded-xl p-5">
    <GuidelineSection
      title="1. Summarize the problem"
      points={[
        "Include details about your goal",
        "Describe expected and actual results",
      ]}
    />
    <GuidelineSection
      title="2. Describe what you've tried"
      points={[
        "Show what you've tried and tell us what you found (on this site or elsewhere) and why it didn't meet your needs. You can get better answers when you provide research.",
      ]}
    />
    <GuidelineSection
      title="3. Show some code"
      points={[
        "When appropriate, share the minimum amount of code others need to reproduce your problem",
      ]}
    />
  </div>
);

const GuidelineSection: React.FC<{
  title: string;
  points: string[];
}> = ({ title, points }) => (
  <div className="flex flex-col gap-y-3">
    <h2 className="text-primary-500 text-xl font-bold">{title}</h2>
    {points.map((point, index) => (
      <p key={index} className="text-justify text-black">
        {point}
      </p>
    ))}
  </div>
);

export default NewQuestion;
