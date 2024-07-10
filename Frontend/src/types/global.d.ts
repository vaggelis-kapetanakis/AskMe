export type IUserCount = {
  _id: string;
  count?: number;
};

export type IVotedItem = {
  _id: string;
  vote?: number;
};

export type UserType = {
  _id: string;
  email?: string;
  username: string;
  password: string;
  userID?: number;
  apiKey?: string;
  tags?: string[];
  questions?: QuestionType[];
  answers?: AnswerType[];
  votedQuestions?: IVotedItem[];
  votedAnswers?: IVotedItem[];
  notifications?: NotificationType[];
  tagsObjId?: ITagCount[];
  tagsAnsweredObjId?: ITagAnswered[];
};

export type QuestionType = {
  _id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  creator: UserType;
  dateCreated: string;
  queryDateCreated: Date;
  votes?: number;
  answerCount?: number;
  views?: number;
  answerObjId: AnswerType[];
  tagsObjId: string[];
};

export type QuestionTypeSec = {
  _id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  creator: UserType[];
  dateCreated: string;
  queryDateCreated: Date;
  votes: number;
  answerCount?: number;
  views?: number;
  answerObjId: AnswerType[];
  tagsObjId: string[];
};

export type QuestionTypeThrd = {
  _id: string;
  title: string;
  tags: string[];
  dateCreated: string;
  votes: number;
  answerCount: number;
  views: number;
  tagsObjId: string[];
};

export type AnswerType = {
  _id: string;
  body: string;
  category: string;
  tags: string[];
  answeredBy: UserType;
  answeredByUsername: string;
  answeredDate: string;
  queryAnsweredDate: Date;
  votes?: number;
  answers?: number;
  answeredQuestion: QuestionType;
  tagsObjId: TagType[];
};

export type NotificationType = {
  _id: string;
  creator: UserType;
  answeredBy: UserType;
  title: string;
  body: string;
  createdAt: Date;
};

export type TagType = {
  _id: string;
  name: string;
  dateCreated: string;
  queryDateCreated: Date;
  questionsCount?: number;
  answersCount?: number;
  answerObjId: AnswerType[];
  questionObjId: QuestionType[];
  userQuestionObjId: IUserCount[];
  userAnswerObjId: IUserCount[];
};

export type TagReturnType = {
  answersCount: number;
  name: string;
  questions: QuestionType;
  questionsCount: number;
  _id: string;
};

export type TagProfileType = {
  name: string;
  _id: string;
};

export type ITagCount = {
  _id: string;
  count?: number;
};

export type ITagAnswered = ITagCount & {
  name?: string;
};
