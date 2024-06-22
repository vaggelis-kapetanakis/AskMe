import { useContext } from "react";
import Button from "../../ui/Button";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../ui/Loading";
import { Markup } from "interweave";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import notifierMiddleware from "../../ui/notifierMiddleware";

type PreviewTypes = {
  goBackFunc: () => void;
  data: {
    title: string;
    body: string;
    tags: string[];
    category: string;
  };
};

const PreviewQuestion = (props: PreviewTypes) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;

  const handleQuestionUpload = async () => {
    try {
      await axios
        .post(
          "http://localhost:8765/qanda/questions/newquestion",
          JSON.stringify({
            title: props.data.title,
            body: props.data.body,
            tags: props.data.tags,
            category: props.data.category,
            creator: state.user.userId,
            email: state.user.email,
            username: state.user.username,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.user.token}`,
              "X-Content-Type-Options": "nosniff",
            },
          }
        )
        .then((res) => {
          if (res !== undefined) {
            console.log(res);
            return;
          } else {
            navigate("/signedin");
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            notifierMiddleware("error", err.message);
          }
          console.log(err.message);
        });
    } catch (err) {
      if (err instanceof Error) {
        notifierMiddleware("error", err.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-[80vh]">
      <div className="h-full grid grid-cols-[0.1fr_0.9fr] bg-white/20 rounded-xl divide-x-2 divide-white/40">
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
            <p className="text-base text-primary-500 font-semibold">
              {state.user.username}
            </p>
            <p className="text-base text-primary-500 font-semibold text-center">
              {props.data.category}
            </p>
            <p className="text-base text-primary-500 font-semibold">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 px-3 py-2">
          <h2 className="text-xl text-black bg-white/50 rounded-xl p-2 font-semibold">
            <Markup content={props.data.title} />
          </h2>
          <div className="text-black bg-white/50 rounded-xl p-3 h-[27vh] overflow-y-scroll">
            <Markup
              content={props.data.body}
              className="text-justify leading-7"
            />
          </div>
          <div className="w-full flex gap-2 flex-grow-0 items-center justify-end">
            {props.data.tags.map((tag, idx) => (
              <div
                key={idx}
                className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 gap-x-5">
        <Button
          buttonVariant="outline"
          buttonStyle={{
            color: "primary",
            vPadding: "sm",
            rounded: "lg",
            size: "lg",
          }}
          onClick={props.goBackFunc}
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
    </div>
  );
};

export default PreviewQuestion;
