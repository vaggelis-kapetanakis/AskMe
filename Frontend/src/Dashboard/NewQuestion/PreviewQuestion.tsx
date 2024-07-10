import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Markup } from "interweave";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

import Button from "../../ui/Button";
import { useAuth } from "../../contexts/useAuth";
import notifierMiddleware from "../../ui/notifierMiddleware";

interface PreviewQuestionProps {
  goBackFunc: () => void;
  data: {
    title: string;
    body: string;
    tags: string[];
    category: string;
  };
}

const PreviewQuestion: React.FC<PreviewQuestionProps> = ({
  goBackFunc,
  data,
}) => {
  const navigate = useNavigate();
  const { state } = useAuth();

  const handleQuestionUpload = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/questions/newquestion`,
        {
          title: data.title,
          body: data.body,
          tags: data.tags,
          category: data.category,
          creator: state.user.userId,
          email: state.user.email,
          username: state.user.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );

      if (response.data) {
        console.log(response.data);
      } else {
        navigate("/signedin");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      notifierMiddleware("error", errorMessage);
      console.error(errorMessage);
    }
  }, [data, state.user, navigate]);

  return (
    <div className="h-[80vh]">
      <div className="h-full grid grid-cols-[0.1fr_0.9fr] bg-white/20 rounded-xl divide-x-2 divide-white/40">
        <UserInfoColumn
          username={state.user.username}
          category={data.category}
        />
        <QuestionPreviewColumn data={data} />
      </div>
      <ActionButtons
        goBackFunc={goBackFunc}
        handleQuestionUpload={handleQuestionUpload}
      />
    </div>
  );
};

const UserInfoColumn: React.FC<{ username: string; category: string }> = ({
  username,
  category,
}) => (
  <div className="h-[50vh] flex flex-col">
    <div className="flex items-center justify-center flex-1">
      <div className="rounded-full bg-white/60 p-3">
        <BsPerson className="w-8 h-8 text-black/60" />
      </div>
    </div>
    <div className="flex flex-col gap-y-3 items-center justify-center flex-1">
      <button className="bg-white/40 disabled:bg-transparent">
        <IoIosArrowDropup className="w-8 h-8 text-green-500" />
      </button>
      <button className="bg-white/40 disabled:bg-transparent">
        <IoIosArrowDropdown className="w-8 h-8 text-red-500 cursor-pointer" />
      </button>
    </div>
    <div className="flex flex-col items-center justify-center flex-1 gap-y-2">
      <p className="text-base text-primary-500 font-semibold">{username}</p>
      <p className="text-base text-primary-500 font-semibold text-center">
        {category}
      </p>
      <p className="text-base text-primary-500 font-semibold">
        {new Date().toLocaleDateString()}
      </p>
    </div>
  </div>
);

const QuestionPreviewColumn: React.FC<{
  data: PreviewQuestionProps["data"];
}> = ({ data }) => (
  <div className="flex flex-col gap-y-5 px-3 py-2">
    <h2 className="text-xl text-black bg-white/50 rounded-xl p-2 font-semibold">
      <Markup content={data.title} />
    </h2>
    <div className="text-black bg-white/50 rounded-xl p-3 h-[27vh] overflow-y-scroll">
      <Markup content={data.body} className="text-justify leading-7" />
    </div>
    <div className="w-full flex gap-2 flex-grow-0 items-center justify-end">
      {data.tags.map((tag, idx) => (
        <div
          key={idx}
          className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
        >
          {tag}
        </div>
      ))}
    </div>
  </div>
);

const ActionButtons: React.FC<{
  goBackFunc: () => void;
  handleQuestionUpload: () => void;
}> = ({ goBackFunc, handleQuestionUpload }) => (
  <div className="flex items-center justify-center mt-5 gap-x-5">
    <Button
      buttonVariant="outline"
      buttonStyle={{
        color: "primary",
        vPadding: "sm",
        rounded: "lg",
        size: "lg",
      }}
      onClick={goBackFunc}
    >
      Edit
    </Button>
    <Button
      buttonVariant="solid"
      buttonStyle={{
        color: "primary",
        vPadding: "sm",
        rounded: "lg",
        size: "lg",
      }}
      onClick={handleQuestionUpload}
    >
      Upload
    </Button>
  </div>
);

export default PreviewQuestion;
