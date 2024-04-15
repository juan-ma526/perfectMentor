"use client";
import { useContext, useEffect, useState } from "react";
import { Notifications } from "../interfaces";
import { NotificationItem } from "./NotificationItem";
import { AuthContext } from "../auth-Provider";
import { Loading } from "./Loading";

interface Props {
  notifications: Notifications[];
}

export const GridNotifications = ({ notifications }: Props) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  const userNotifications = notifications.filter((notification) => notification.emailUserRte === user?.email);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-hidden overflow-y-auto rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 md:w-1/6 font-medium text-gray-900">
                  Rte
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
              {userNotifications.map((notification, index) => (
                <NotificationItem key={index} notification={notification} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
