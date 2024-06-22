type LoadingProps = {
  asOverlay?: boolean;
};

const Loading = ({ asOverlay }: LoadingProps) => {
  return (
    <div
      className={`${
        asOverlay ? "w-full h-full" : "w-full h-fit p-5"
      } z-50 absolute flex items-center justify-center rounded-xl`}
    >
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
};

export default Loading;
