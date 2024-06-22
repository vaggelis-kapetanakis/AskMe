import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../ui/Loading";
import { BsBell, BsPerson, BsX } from "react-icons/bs";
import { Markup } from "interweave";
import { NotificationType } from "../../types/global";
import QuestSearch from "./QuestSearch";
import axios from "axios";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState<"none" | "positive">(
    "none"
  );
  const [dropdown, setDropdown] = useState<boolean>(false);

  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;
  const [alteredNot, setAlteredNot] = useState(state.user.notifications);

  const handleDeleteNotification = async (notification: NotificationType) => {
    try {
      await axios
        .delete(
          "http://localhost:8765/qanda/notifications/deletenotification",
          {
            data: {
              username: state.user.username,
              notificationID: notification._id,
            },
            headers: {
              Authorization: `Bearer ${state.user.token}`,
              "X-Content-Type-Options": "nosniff",
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      var removeIndex = state.user.notifications
        .map(function (item) {
          return item._id;
        })
        .indexOf(notification._id);
      state.user.notifications.splice(removeIndex, 1);
      setAlteredNot(state.user.notifications);
      let userData = localStorage.getItem("user");
      if (!userData) return;
      let value = JSON.parse(userData);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: value.userId,
          token: value.token,
          username: value.username,
          email: value.email,
          notifications: state.user.notifications,
          expiration: value.expiration,
          userQuestions: value.userQuestions,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!state.user.notifications) {
      setNotifications("none");
    } else {
      setNotifications("positive");
    }
  }, [state.user.notifications]);

  return (
    <div className="bg-white/20 rounded-xl overflow-x-hidden relative">
      <div className="flex items-center justify-between h-full px-5">
        <div>
          <QuestSearch />
        </div>
        <div className="flex flex-row justify-evenly items-center gap-x-5 h-full">
          {dropdown && notifications === "none" && (
            <div
              className={`
                      w-[35vw] h-[35vh] relative top-[120%] backdrop-blur-lg bg-white/40 overflow-y-scroll overflow-x-hidden
                      rounded-xl z-50 transition-all ease-in-out duration-300 flex items-center justify-evenly
                      `}
            >
              <h2 className="text-white text-lg">You have no notifications</h2>
            </div>
          )}
          {alteredNot?.length}
          <div
            className={`${
              dropdown
                ? "opacity-100 -translate-x-52"
                : "opacity-0 translate-x-[300%]"
            } flex flex-col top-12 gap-y-3 w-[25vw] h-[35vh] fixed transition-all ease-in-out duration-300 bg-white/40 backdrop-blur-lg
                    rounded-xl p-5 z-50 overflow-y-scroll`}
          >
            {dropdown &&
              notifications === "positive" &&
              alteredNot.map((notification, index) => {
                return (
                  <div
                    className="flex flex-row gap-x-5 items-start justify-center"
                    key={Math.random().toString(36)}
                  >
                    <div className="text-black/80">
                      <Markup
                        content={notification.body}
                        key={Math.random().toString(36)}
                      />
                    </div>
                    <button
                      onClick={() => {
                        handleDeleteNotification(
                          state.user.notifications[index]
                        );
                      }}
                      className="w-10 h-10 flex items-center justify-center bg-transparent p-0"
                    >
                      <BsX className="w-8 h-8 text-red-500" />
                    </button>
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => setDropdown((prev) => !prev)}
            className={`${
              dropdown ? "bg-white/40 text-black" : "bg-transparent text-white"
            } px-2 py-1`}
          >
            <BsBell />
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer">
            <BsPerson className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
