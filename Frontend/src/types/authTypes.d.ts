import { NotificationType, QuestionType } from "./global";

export type AuthProps = {
  userId: string;
  token: string;
  username: string;
  notifications: NotificationType[];
  email: string;
  userQuestions: QuestionType[] | null;
};

export type AuthAction =
  | { type: "SET_USERID"; payload: string }
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string };
