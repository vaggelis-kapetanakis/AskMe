import { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../ui/Loading";
import { BsPerson, BsPlusCircle } from "react-icons/bs";
import Button from "../../ui/Button";
import axios from "axios";
import notifierMiddleware from "../../ui/notifierMiddleware";
import { FaPencilAlt } from "react-icons/fa";
import { QuestionType, TagProfileType } from "../../types/global";
import { Link, NavLink } from "react-router-dom";
import MainQuestion from "../components/MainQuestion/MainQuestion";

const Profile = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [userHasQuestions, setUserHasQuestions] = useState(false);
  const entries = {
    username: state.user.username,
    email: state.user.email,
  };
  const [newEntries, setNewEntries] = useState(entries);
  const [answeredTags, setAnsweredTags] = useState<TagProfileType[]>();
  const [questionTags, setQuestionTags] = useState<TagProfileType[]>();

  const handleUsernameEdit = () => {
    setIsUsernameDisabled(!isUsernameDisabled);
  };
  const handleEmailEdit = () => {
    setIsEmailDisabled(!isEmailDisabled);
  };

  const fetchUserTags = async () => {
    try {
      await axios
        .get<{
          _answeredTags: TagProfileType[];
          _questionTags: TagProfileType[];
        }>(`http://localhost:8765/qanda/tags/user/${state.user.userId}`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        })
        .then((res) => {
          setAnsweredTags(res.data._answeredTags);
          setQuestionTags(res.data._questionTags);
        });
    } catch (err) {
      if (err instanceof Error) {
        notifierMiddleware("error", err.message);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (
      state.user.userQuestions === undefined ||
      state.user.userQuestions === null
    ) {
      setUserHasQuestions(false);
    } else if (state.user.userQuestions.length === 0) {
      setUserHasQuestions(false);
    } else {
      setUserHasQuestions(true);
    }
    fetchUserTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputUsernameValueChange = (e: string) => {
    let newEntry = { ...newEntries };

    newEntry.username = e;
    setNewEntries(newEntry);
  };

  const onInputEmailValueChange = (e: string) => {
    let newEntry = { ...newEntries };

    newEntry.email = e;
    setNewEntries(newEntry);
  };

  const changeUserValues = async () => {
    try {
      await axios.post(
        `http://localhost:8765/qanda/users/updateuser`,
        {
          oldUsername: state.user.username,
          newUsername: newEntries.username,
          oldEmail: state.user.email,
          newEmail: newEntries.email,
        },
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      let userData = localStorage.getItem("user");
      if (!userData) return;
      let value = JSON.parse(userData);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: value.userId,
          token: value.token,
          username: newEntries.username,
          email: newEntries.email,
          notifications: value.notifications,
          expiration: value.expiration,
          userQuestions: value.userQuestions,
        })
      );
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        notifierMiddleware("error", err.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div className="w-full h-full">
          <div className="backdrop-blur-md w-full h-full flex flex-col gap-y-3 p-5 bg-white/40 rounded-xl">
            <div className="grid grid-cols-3 gap-x-3">
              <div className="flex flex-col items-center justify-center gap-y-3">
                <div className="h-24 w-24 ring-2 ring-white rounded-full flex items-center justify-center">
                  <BsPerson className="w-20 h-20 text-black" />
                </div>
                <Button
                  buttonStyle={{
                    color: "primary",
                    rounded: "full",
                    vPadding: "sm",
                  }}
                  buttonVariant="outline"
                >
                  Change Profile Picture
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center gap-y-3 px-10">
                <div className="flex items-center justify-between w-full">
                  <h2>Username</h2>
                  <FaPencilAlt
                    onClick={handleUsernameEdit}
                    className="text-primary-500 w-5 h-5 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  disabled={isUsernameDisabled}
                  value={entries.username}
                  className="bg-white disabled:bg-white/40 rounded-2xl w-full text-black px-5"
                  onChange={(e) => onInputUsernameValueChange(e.target.value)}
                />
                <Button
                  buttonVariant="solid"
                  buttonStyle={{
                    color: "primary",
                    rounded: "full",
                    vPadding: "xs",
                  }}
                  onClick={changeUserValues}
                  disabled={isUsernameDisabled}
                >
                  Change Username
                </Button>
                <div className="w-full flex flex-col mt-3">
                  <div className="w-full flex items-center justify-start p-3">
                    <h2 className="font-bold text-white text-xl">
                      Top 5 tags you have answered
                    </h2>
                  </div>
                  <div className="p-5 flex flex-wrap gap-3">
                    {answeredTags &&
                      answeredTags.map((answeredTag) => {
                        return (
                          <Link
                            to={`/signedin/tags/${answeredTag._id}`}
                            key={answeredTag._id}
                            className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                          >
                            {answeredTag.name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-y-3 px-10">
                <div className="flex items-center justify-between w-full">
                  <h2>Email</h2>
                  <FaPencilAlt
                    onClick={handleEmailEdit}
                    className="text-primary-500 w-5 h-5 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  disabled={isEmailDisabled}
                  value={entries.email}
                  className="bg-white disabled:bg-white/40 rounded-2xl w-full text-black px-5"
                  onChange={(e) => onInputEmailValueChange(e.target.value)}
                />
                <Button
                  buttonVariant="solid"
                  buttonStyle={{
                    color: "primary",
                    rounded: "full",
                    vPadding: "xs",
                  }}
                  disabled={isEmailDisabled}
                  onClick={changeUserValues}
                >
                  Change Email
                </Button>
                <div className="w-full flex flex-col mt-3">
                  <div className="w-full flex items-center justify-start p-3">
                    <h2 className="font-bold text-white text-xl">
                      Top 5 tags you have asked questions about
                    </h2>
                  </div>
                  <div className="p-5 flex flex-wrap gap-3">
                    {questionTags &&
                      questionTags.map((questionTag) => {
                        return (
                          <Link
                            to={`/signedin/tags/${questionTag._id}`}
                            key={questionTag._id}
                            className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                          >
                            {questionTag.name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-y-3">
              <div className="w-full flex items-center justify-start p-3">
                <h2 className="font-bold text-white text-4xl">
                  Your Questions
                </h2>
              </div>
              <div className="w-full h-full flex items-center gap-y-3 flex-col py-5 overflow-y-scroll overflow-x-hidden">
                {!userHasQuestions && (
                  <div>
                    <div className="w-full flex items-center justify-start p-3">
                      <h2 className="font-bold text-white text-xl">
                        Looks like you haven't asked a question yet.
                      </h2>
                    </div>
                    <NavLink
                      to="/signedin/askquestion"
                      className="border-b-2 border-sky-500 bg-sky-700 w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
                    >
                      <BsPlusCircle />
                      Add a Question
                    </NavLink>
                  </div>
                )}
                <div className="relative w-full h-[40vh] flex items-center gap-y-3 flex-col py-5 overflow-y-scroll overflow-x-hidden">
                  {userHasQuestions &&
                    state.user.userQuestions?.map((quest: QuestionType) => {
                      return (
                        <MainQuestion
                          key={quest._id}
                          id={quest._id}
                          category={quest.category}
                          creator={quest.creator}
                          dateCreated={quest.dateCreated}
                          tags={quest.tags}
                          tagsObjId={quest.tagsObjId}
                          title={quest.title}
                          answerCount={quest.answerCount}
                          views={quest.views}
                          votes={quest.votes}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
