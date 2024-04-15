"use client";
import Image from "next/image";
import { User } from "../interfaces";
import { FaCheckCircle } from "react-icons/fa";
import avatarDefault from "../assets/avatarDefault.png";

interface Props {
  user: User;
}

export const UserItem = ({ user }: Props) => {
  return (
    <tr className="hover:bg-gray-50">
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <Image
            className="h-full w-full rounded-full object-cover object-center"
            src={avatarDefault}
            alt="Imagen de Avatar"
            width={100}
            height={100}
          />
          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{user.username}</div>
          <div className="text-gray-400">{user.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
            user.status === "Verified" ? "text-green-600" : "text-red-600"
          }        `}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${user.status === "Verified" ? "bg-green-600" : "bg-red-600"} `}
          ></span>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4">{user.rol}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
            {user.createdAt.split("T")[0]}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        {user.status === "Verified" ? (
          <button
            onClick={() => console.log("click")}
            className="w-10 flex items-center justify-center text-principal-1 cursor-pointer"
          >
            <FaCheckCircle size={30} />
          </button>
        ) : (
          <button className="text-principal-4 cursor-not-allowed w-10 flex items-center justify-center" disabled>
            <FaCheckCircle size={30} />
          </button>
        )}
      </td>
    </tr>
  );
};
