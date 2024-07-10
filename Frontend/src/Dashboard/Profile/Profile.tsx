import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { BsPerson, BsPlusCircle } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Loading from "../../ui/Loading";
import Button from "../../ui/Button";
import notifierMiddleware from "../../ui/notifierMiddleware";
import MainQuestion from "../components/MainQuestion/MainQuestion";
import { useFetchUserTags } from "../../utils/questionReqs";
import ErrorModal from "../../ui/ErrorModal";
import { QuestionType, TagProfileType } from "../../types/global";
import { useAuth } from "../../contexts/useAuth";

interface ProfileSectionProps {
  title: string;
  value: string;
  isDisabled: boolean;
  onEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  children?: React.ReactNode;
}

interface TagSectionProps {
  title: string;
  tags: TagProfileType[];
}

interface UserQuestionsSectionProps {
  userHasQuestions: boolean;
  questions?: QuestionType[];
}

const Profile: React.FC = () => {
  const { state } = useAuth();
  const [isUsernameDisabled, setIsUsernameDisabled] = useState<boolean>(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true);
  const [userHasQuestions, setUserHasQuestions] = useState<boolean>(false);

  const [newEntries, setNewEntries] = useState({
    username: state.user.username || "",
    email: state.user.email || "",
  });
  const [answeredTags, setAnsweredTags] = useState<TagProfileType[]>([]);
  const [questionTags, setQuestionTags] = useState<TagProfileType[]>([]);

  const { data, error, isFetching } = useFetchUserTags(
    state.user.userId,
    state.user.token
  );

  useEffect(() => {
    if (data) {
      setAnsweredTags(data._answeredTags);
      setQuestionTags(data._questionTags);
    }
  }, [data]);

  useEffect(() => {
    if (!state.user.userQuestions) {
      return;
    }
    setUserHasQuestions(state.user.userQuestions?.length > 0 || false);
  }, [state.user.userQuestions]);

  if (!state || isFetching) return <Loading asOverlay />;
  if (error)
    return <ErrorModal message={error.message || "An error occurred"} />;

  const handleInputChange = (field: "username" | "email", value: string) => {
    setNewEntries((prev) => ({ ...prev, [field]: value }));
  };

  const changeUserValues = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/users/updateuser`,
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

      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userData,
          username: newEntries.username,
          email: newEntries.email,
        })
      );
      window.location.reload();
    } catch (err) {
      notifierMiddleware(
        "error",
        err instanceof Error ? err.message : "An error occurred"
      );
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
              <ProfilePictureSection />
              <ProfileSection
                title="Username"
                value={newEntries.username}
                isDisabled={isUsernameDisabled}
                onEdit={() => setIsUsernameDisabled(!isUsernameDisabled)}
                onChange={(e) => handleInputChange("username", e.target.value)}
                onSave={changeUserValues}
              >
                <TagSection
                  title="Top 5 tags you have answered"
                  tags={answeredTags}
                />
              </ProfileSection>
              <ProfileSection
                title="Email"
                value={newEntries.email}
                isDisabled={isEmailDisabled}
                onEdit={() => setIsEmailDisabled(!isEmailDisabled)}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onSave={changeUserValues}
              >
                <TagSection
                  title="Top 5 tags you have asked questions about"
                  tags={questionTags}
                />
              </ProfileSection>
            </div>
            <UserQuestionsSection
              userHasQuestions={userHasQuestions}
              questions={state.user.userQuestions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfilePictureSection: React.FC = () => (
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
);

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  value,
  isDisabled,
  onEdit,
  onChange,
  onSave,
  children,
}) => (
  <div className="flex flex-col items-center justify-center gap-y-3 px-10">
    <div className="flex items-center justify-between w-full">
      <h2>{title}</h2>
      <FaPencilAlt
        onClick={onEdit}
        className="text-primary-500 w-5 h-5 cursor-pointer"
      />
    </div>
    <input
      type="text"
      disabled={isDisabled}
      value={value}
      className="bg-white disabled:bg-white/40 rounded-2xl w-full text-black px-5"
      onChange={onChange}
    />
    <Button
      buttonVariant="solid"
      buttonStyle={{
        color: "primary",
        rounded: "full",
        vPadding: "xs",
      }}
      onClick={onSave}
      disabled={isDisabled}
    >
      Change {title}
    </Button>
    {children}
  </div>
);

const TagSection: React.FC<TagSectionProps> = ({ title, tags }) => (
  <div className="w-full flex flex-col mt-3">
    <div className="w-full flex items-center justify-start p-3">
      <h2 className="font-bold text-white text-xl">{title}</h2>
    </div>
    <div className="p-5 flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          to={`/signedin/tags/${tag._id}`}
          key={tag._id}
          className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  </div>
);

const UserQuestionsSection: React.FC<UserQuestionsSectionProps> = ({
  userHasQuestions,
  questions,
}) => (
  <div className="w-full h-full flex flex-col gap-y-3">
    <div className="w-full flex items-center justify-start p-3">
      <h2 className="font-bold text-white text-4xl">Your Questions</h2>
    </div>
    <div className="w-full h-full flex items-center gap-y-3 flex-col py-5 overflow-y-scroll overflow-x-hidden">
      {!userHasQuestions ? (
        <NoQuestionsPrompt />
      ) : (
        <QuestionsList questions={questions} />
      )}
    </div>
  </div>
);

const NoQuestionsPrompt: React.FC = () => (
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
);

const QuestionsList: React.FC<{ questions?: QuestionType[] }> = ({
  questions,
}) => (
  <div className="relative w-full h-[40vh] flex items-center gap-y-3 flex-col py-5 overflow-y-scroll overflow-x-hidden">
    {questions?.map((quest: QuestionType) => (
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
    ))}
  </div>
);
