"use client";
import { User } from "../interfaces";
import { Loading, Page404, UserItem } from ".";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-Provider";

interface Props {
  users: User[];
}

export const GridUsers = ({ users }: Props) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  const dontRenderUser = () => <Page404 />;
  const renderUser = () => (
    <>
      <div className="overflow-hidden overflow-y-auto rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Role
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Joined Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((userDestination, index) => (
              <UserItem key={index} userDestination={userDestination} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  return <>{loading ? dontRenderUser() : renderUser()}</>;
};
