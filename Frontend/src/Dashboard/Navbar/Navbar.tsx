import React, { useEffect, useState, useCallback } from "react";
import { BsBell, BsPerson, BsX } from "react-icons/bs";
import { Markup } from "interweave";
import { NotificationType } from "../../types/global";
import QuestSearch from "./QuestSearch";
import axios from "axios";
import { useAuth } from "../../contexts/useAuth";

const Navbar: React.FC = () => {
  const { state } = useAuth();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (state.user.notifications && state.user.notifications.length > 0) {
      setHasNotifications(true);
      setNotifications(state.user.notifications);
    } else {
      setHasNotifications(false);
      setNotifications([]);
    }
  }, [state.user.notifications]);

  const handleDeleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BACKEND_URL}/notifications/deletenotification`,
          {
            data: {
              username: state.user.username,
              notificationID: notificationId,
            },
            headers: {
              Authorization: `Bearer ${state.user.token}`,
              "X-Content-Type-Options": "nosniff",
            },
          }
        );

        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );

        // Update localStorage
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        userData.notifications = notifications;
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    },
    [state.user.username, state.user.token, notifications]
  );

  return (
    <div className="bg-white/20 rounded-xl overflow-x-hidden relative">
      <div className="flex items-center justify-between h-full px-5">
        <QuestSearch />
        <div className="flex flex-row justify-evenly items-center gap-x-5 h-full">
          <NotificationDropdown
            dropdown={dropdown}
            hasNotifications={hasNotifications}
            notifications={notifications}
            handleDeleteNotification={handleDeleteNotification}
          />
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

interface NotificationDropdownProps {
  dropdown: boolean;
  hasNotifications: boolean;
  notifications: NotificationType[];
  handleDeleteNotification: (notificationId: string) => Promise<void>;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  dropdown,
  hasNotifications,
  notifications,
  handleDeleteNotification,
}) => {
  if (!dropdown) return null;

  return (
    <div
      className={`
      w-[25vw] h-[35vh] fixed top-12 -translate-x-52
      bg-white/40 backdrop-blur-lg rounded-xl p-5 z-50 
      overflow-y-scroll transition-all ease-in-out duration-300
      ${dropdown ? "opacity-100" : "opacity-0 translate-x-[300%]"}
    `}
    >
      {!hasNotifications ? (
        <h2 className="text-white text-lg">You have no notifications</h2>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
            onDelete={() => handleDeleteNotification(notification._id)}
          />
        ))
      )}
    </div>
  );
};

interface NotificationItemProps {
  notification: NotificationType;
  onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onDelete,
}) => (
  <div className="flex flex-row gap-x-5 items-start justify-center mb-3">
    <div className="text-black/80">
      <Markup content={notification.body} />
    </div>
    <button
      onClick={onDelete}
      className="w-10 h-10 flex items-center justify-center bg-transparent p-0"
    >
      <BsX className="w-8 h-8 text-red-500" />
    </button>
  </div>
);

export default Navbar;
