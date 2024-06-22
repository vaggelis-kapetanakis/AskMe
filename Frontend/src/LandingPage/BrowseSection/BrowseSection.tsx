import Browse from "./components/Browse";
import BrowseMainNavigation from "./components/BrowseMainNavigation";

const BrowseSection = () => {
  return (
    <>
      <div className="bg-dashboard-bg w-screen h-screen grid grid-rows-[0.1fr_0.9fr] gap-y-5">
        <BrowseMainNavigation />
        <div className="w-full h-full flex items-center justify-center">
          <Browse />
        </div>
      </div>
    </>
  );
};

export default BrowseSection;
