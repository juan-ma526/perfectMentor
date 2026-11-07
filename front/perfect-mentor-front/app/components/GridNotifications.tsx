"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Notifications } from "../interfaces";
import { NotificationItem } from "./NotificationItem";
import { AuthContext } from "../auth-Provider";
import { Loading } from "./Loading";
import { NOTIFICATIONS_CHANGED } from "./match/NotificationListener";

export const GridNotifications = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const load = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/notification/allNotifications", {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) setNotifications(await response.json());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      load().then(() => setLoading(false));
    }
  }, [user, load]);

  useEffect(() => {
    window.addEventListener(NOTIFICATIONS_CHANGED, load);
    return () => window.removeEventListener(NOTIFICATIONS_CHANGED, load);
  }, [load]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Rte
                </th>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Dest
                </th>

                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Rol
                </th>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Joined Date
                </th>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  userId={user?.id}
                  onAnswered={load}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
