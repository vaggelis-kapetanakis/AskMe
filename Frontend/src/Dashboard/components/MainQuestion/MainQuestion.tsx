import React from "react";
import { UserType } from "../../../types/global";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/Tooltip";
import { Link } from "react-router-dom";
import { Markup } from "interweave";

export type MainQuestionProps = {
  id: string;
  title: string;
  category?: string;
  tags?: string[];
  tagsObjId?: string[];
  creator?: UserType;
  dateCreated?: string;
  votes?: number;
  answerCount?: number;
  views?: number;
  browse?: boolean;
  onBrowseClick?: () => void;
};

const MainQuestion: React.FC<MainQuestionProps> = React.memo(
  ({
    id,
    category,
    creator,
    dateCreated,
    tags,
    tagsObjId,
    title,
    answerCount = 0,
    views = 0,
    votes = 0,
    browse = false,
    onBrowseClick,
  }: MainQuestionProps) => {
    return (
      <div
        className="hover:scale-105 hover:bg-white/50 bg-white/20 backdrop-blur-lg w-full h-auto grid grid-cols-[0.12fr_0.76fr_0.12fr] 
   transition-all duration-300 ease-in-out gap-x-5 p-3 rounded-lg shadow-lg will-change-transform"
      >
        <div className="flex flex-col items-end justify-center gap-y-2">
          {votes !== undefined && (
            <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-sky-500/90 text-white flex-row gap-x-2">
              <p className="font-bold">{votes}</p>
              <p>votes</p>
            </div>
          )}
          {answerCount !== undefined && (
            <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-green-500/90 text-white flex-row gap-x-2">
              <p className="font-bold">{answerCount}</p>
              <p>answers</p>
            </div>
          )}
          {views !== undefined && (
            <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-red-500/90 text-white flex-row gap-x-2">
              <p className="font-bold">{views}</p>
              <p>views</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-5 overflow-hidden relative">
          {browse ? (
            <button
              onClick={onBrowseClick}
              className="bg-transparent flex items-center justify-start"
            >
              <h1 className="hover:text-sky-500 cursor-pointer text-primary-600 text-2xl font-semibold truncate">
                <Markup content={title} />
              </h1>
            </button>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <Link to={`/signedin/questions/${id}`} className="block">
                  <h1 className="hover:text-sky-500 cursor-pointer text-primary-600 text-2xl font-semibold truncate">
                    <Markup content={title} />
                  </h1>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="Tooltip">
                <Markup content={title} />
              </TooltipContent>
            </Tooltip>
          )}

          {tags !== undefined && tagsObjId !== undefined && (
            <div className="w-full flex gap-2 flex-grow-0">
              {browse
                ? tags.map((tag, idx) => (
                    <div
                      key={tagsObjId[idx]}
                      className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                    >
                      {tag}
                    </div>
                  ))
                : tags.map((tag, idx) => (
                    <Link
                      to={`/signedin/tags/${tagsObjId[idx]}`}
                      key={tagsObjId[idx]}
                      className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                    >
                      {tag}
                    </Link>
                  ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-evenly items-start overflow-hidden">
          {creator !== undefined && (
            <div className="text-primary-500">{creator.username}</div>
          )}
          <div className="text-primary-500">{category}</div>
          {dateCreated !== undefined && (
            <div className="text-primary-500">
              {new Date(dateCreated).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export const MainQuestionRelated = ({
  votes,
  views,
  answerCount,
  title,
  id,
}: {
  votes?: number;
  views?: number;
  answerCount?: number;
  title: string;
  id: string;
}) => {
  return (
    <div
      className="hover:scale-105 hover:bg-white/75 bg-white/60 w-full h-auto flex flex-col
transition-all duration-300 ease-in-out gap-x-5 p-3 rounded-lg shadow-lg will-change-transform"
    >
      <div className="flex flex-col gap-y-5 overflow-hidden relative">
        <Tooltip>
          <TooltipTrigger>
            <Link to={`/signedin/questions/${id}`} className="block">
              <h1 className="hover:text-sky-500 cursor-pointer text-primary-600 text-lg font-semibold truncate flex-wrap flex break-words whitespace-normal">
                <Markup content={title} />
              </h1>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">
            <Markup content={title} />
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-row items-end justify-center gap-x-2">
        {votes !== undefined && (
          <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-sky-500/90 text-white flex-row gap-x-2">
            <p className="font-bold">{votes}</p>
            <p>votes</p>
          </div>
        )}
        {answerCount !== undefined && (
          <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-green-500/90 text-white flex-row gap-x-2">
            <p className="font-bold">{answerCount}</p>
            <p>answers</p>
          </div>
        )}
        {views !== undefined && (
          <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-red-500/90 text-white flex-row gap-x-2">
            <p className="font-bold">{views}</p>
            <p>views</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const MainQuestionTitleOnly = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  return (
    <div
      className="hover:scale-105 hover:bg-white/75 bg-white/40 inline-block w-full
 transition-all duration-300 ease-in-out gap-x-5 p-3 rounded-lg shadow-lg will-change-transform"
    >
      <Link to={`/signedin/questions/${id}`} className="block">
        <h1 className="cursor-pointer text-primary-600 text-lg font-semibold truncate whitespace-normal">
          <Markup content={title} />
        </h1>
      </Link>
    </div>
  );
};

export const MainQuestionReduced: React.FC<
  Omit<MainQuestionProps, "category" | "creator">
> = React.memo(
  ({
    id,
    dateCreated,
    tags,
    tagsObjId,
    title,
    answerCount = 0,
    views = 0,
    votes = 0,
  }: MainQuestionProps) => {
    return (
      <div
        className="hover:scale-105 hover:bg-white/50 bg-white/20 backdrop-blur-lg w-full h-auto grid grid-cols-[0.12fr_0.88fr] 
   transition-all duration-300 ease-in-out gap-x-5 p-3 rounded-lg shadow-lg will-change-transform"
      >
        <div className="flex flex-col items-end justify-center gap-y-2">
          {votes !== undefined && (
            <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-sky-500/90 text-white flex-row gap-x-2">
              <p className="font-bold text-sm">{votes}</p>
              <p className="text-xs">votes</p>
            </div>
          )}
          {answerCount !== undefined && (
            <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-green-500/90 text-white flex-row gap-x-2">
              <p className="font-bold text-sm">{answerCount}</p>
              <p className="text-xs">answers</p>
            </div>
          )}
          {views !== undefined && (
            <div className="w-auto h-min py-1 px-2 flex items-center justify-between rounded-lg bg-red-500/90 text-white flex-row gap-x-2">
              <p className="font-bold text-sm">{views}</p>
              <p className="text-xs">views</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-5 overflow-hidden relative">
          <Link to={`/signedin/questions/${id}`} className="block">
            <h1 className="hover:text-sky-500 cursor-pointer text-primary-600 text-base font-semibold">
              <Markup content={title} />
            </h1>
          </Link>
          <div className="flex flex-row justify-between">
            {tags !== undefined && tagsObjId !== undefined && (
              <div className="grid grid-cols-2">
                {tags.map((tag, idx) => (
                  <Link
                    to={`/signedin/tags/${tagsObjId[idx]}`}
                    key={tagsObjId[idx]}
                    className="flex-1 text-xs hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            {dateCreated !== undefined && (
              <div className="text-primary-500 text-xs">
                {new Date(dateCreated).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default MainQuestion;
