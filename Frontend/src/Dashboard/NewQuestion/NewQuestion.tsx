import { useState } from "react";
import EditorComp from "../../ui/EditorComp";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Button from "../../ui/Button";
import PreviewQuestion from "./PreviewQuestion";
import notifierMiddleware from "../../ui/notifierMiddleware";

type CategType = {
  value: number;
  label: string;
};

const data: CategType[] = [
  {
    value: 1,
    label: "Technology",
  },
  {
    value: 2,
    label: "Programming",
  },
  {
    value: 3,
    label: "Science",
  },
  {
    value: 4,
    label: "Education",
  },
  {
    value: 5,
    label: "Health",
  },
  {
    value: 6,
    label: "Business & Finance",
  },
  {
    value: 7,
    label: "Society & Politics",
  },
];

const NewQuestion = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [tagsState, setTagsState] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [preview, setPreview] = useState("newQuestion");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleTagChange = (tags: string[]) => {
    setTagsState(tags);
  };

  const handleTitle = (val: string) => {
    setTitle(val);
  };

  const handleCategory = (e: CategType) => {
    setCategory(e.label);
  };

  const hasDuplicates = (arr: any[]) => {
    return new Set(arr).size !== arr.length;
  };

  const handleSubmit = () => {
    if (hasDuplicates(tagsState)) {
      notifierMiddleware("info", "You can't use the same tag twice.");
    } else {
      if (
        title.length >= 10 &&
        tagsState.length >= 1 &&
        editorContent &&
        editorContent.length > 25 &&
        category.length > 5
      ) {
        setEditorContent(editorContent);
        setPreview("previewQuestion");
        notifierMiddleware("success", "You are good to go");
      } else {
        if (title.length < 15) {
          notifierMiddleware("info", "Title must be at least 15 characters");
        } else if (editorContent.length < 25) {
          notifierMiddleware("info", "Body must be at least 25 characters");
        } else if (category.length < 5) {
          notifierMiddleware("info", "You must choose a category");
        } else {
          notifierMiddleware("info", "You must insert at least one tag");
        }
        return;
      }
    }
  };

  const goBackFunc = () => {
    setPreview("newQuestion");
  };

  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div>
          {preview === "newQuestion" && (
            <div className="backdrop-blur-md w-full h-full grid grid-cols-[0.7fr_0.3fr] gap-x-5 p-5 bg-white/40 rounded-xl">
              <div className="flex flex-col gap-y-5 overflow-y-scroll h-[85vh] px-3">
                <div className="text-black/60 mb-3">
                  <h1 className="text-2xl font-semibold">Title</h1>
                  <p>
                    Be specific and imagine you're asking a question to another
                    person
                  </p>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => handleTitle(e.target.value)}
                    className="w-full rounded-xl my-3 bg-white text-black py-1 px-2"
                  />
                </div>
                <div className="text-black/60 mb-3">
                  <h1 className="text-2xl font-semibold">Body</h1>
                  <p>
                    Include all the information someone would need to answer
                    your question
                  </p>
                  <EditorComp
                    value={editorContent}
                    onChange={handleEditorChange}
                    customClass="bg-white h-96 rounded-xl border-none my-3"
                  />
                </div>
                <div className="text-black/60 mb-3 mt-3">
                  <h1 className="text-2xl font-semibold">Tags</h1>
                  <p>
                    Add up to 5 tags to describe what your question is about
                    (separate by pressing space)
                  </p>
                  <TagsInput
                    onlyUnique={true}
                    maxTags={5}
                    value={tagsState}
                    onChange={handleTagChange}
                    addKeys={[13, 32]}
                  />
                </div>
                <div className="text-black/60 mb-3">
                  <h1 className="text-2xl font-semibold">Category</h1>
                  <p>
                    Please select the category that best suits your question
                  </p>
                  <div
                    className="grid grid-cols-3 grid-rows-3 gap-5 rounded-2xl
                bg-white/20 my-3 p-3"
                  >
                    {data.map((cate: CategType) => {
                      return (
                        <div
                          className={`
                        ${
                          category === cate.label
                            ? "bg-white text-sky-500 border-sky-500 opacity-100"
                            : "bg-white/40 border-none opacity-60"
                        } flex items-center justify-center px-3 py-1
                        text-base rounded-2xl cursor-pointer font-semibold
                        `}
                          onClick={() => {
                            handleCategory(cate);
                          }}
                          key={cate.value}
                        >
                          {cate.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
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
              <div className="flex flex-col items-start justify-start gap-y-5 bg-white/90 rounded-xl p-5">
                <div className="flex flex-col gap-y-3">
                  <h2 className="text-primary-500 text-xl font-bold">
                    1. Summarize the problem
                  </h2>
                  <p className="text-justify text-black">
                    Include details about your goal
                  </p>
                  <p className="text-justify text-black mb-3">
                    Describe expected and actual results
                  </p>
                </div>
                <div className="flex flex-col gap-y-3">
                  <h2 className="text-primary-500 text-xl font-bold">
                    2. Describe what you've tried
                  </h2>
                  <p className="text-justify text-black mb-3">
                    Show what you’ve tried and tell us what you found (on this
                    site or elsewhere) and why it didn’t meet your needs. You
                    can get better answers when you provide research.
                  </p>
                </div>
                <div className="flex flex-col gap-y-3">
                  <h2 className="text-primary-500 text-xl font-bold">
                    3. Show some code
                  </h2>
                  <p className="text-justify text-black">
                    When appropriate, share the minimum amount of code others
                    need to reproduce your problem
                  </p>
                </div>
              </div>
            </div>
          )}
          {preview === "previewQuestion" && (
            <PreviewQuestion
              goBackFunc={goBackFunc}
              data={{
                title: title,
                body: editorContent,
                tags: tagsState,
                category: category,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
