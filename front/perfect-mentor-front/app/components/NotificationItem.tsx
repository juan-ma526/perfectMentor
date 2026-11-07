"use client";
import Image from "next/image";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Notifications } from "../interfaces";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import avatarDefault from "../assets/avatarDefault.png";

interface Props {
  notification: Notifications;
  userId?: string;
  onAnswered?: () => void;
}

export const NotificationItem = ({ notification, userId, onAnswered }: Props) => {
  const router = useRouter();

  const HandleUpdateNotification = async (id: string, status: "check it" | "cancel") => {
    try {
      const response = await fetch("http://localhost:3001/api/notification/updateNotification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idNotification: id,
          status,
        }),
      });
      const respuesta = await response.json();
      if (!response.ok) {
        toast.error(respuesta.message || "Error en el MATCH");
        return;
      }
      if (status === "check it") toast.success("Hiciste MATCH!!!");
      else toast.success("Pedido rechazado");
      onAnswered?.();
      router.refresh();
    } catch (error) {
      toast.error("Error en el MATCH");
    }
  };

  return (
    <tr className={`${notification.status === "check it" ? "bg-green-100" : "bg-rose-100"}`}>
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
          <div className="font-medium text-gray-700">{notification.nameUserRte}</div>
          <div className="text-gray-400">{notification.emailUserRte}</div>
        </div>
      </th>
      <td className="px-6 py-4 italic">{notification.emailUserDestination}</td>
      <td className="px-6 py-4">
        <span
          className={`w-[80px] md:w-[90px] inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
            notification.status === "check it" ? "text-green-600" : "text-red-600"
          }        `}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              notification.status === "check it" ? "bg-green-600" : "bg-red-600"
            } `}
          ></span>
          {notification.status}
        </span>
      </td>
      <td className="px-6 py-4 text-black uppercase">{notification.rolUserRte}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold text-black">
            {notification.createdAt.split("T")[0]}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        {notification.status === "no answer" && userId === notification.idUserDestination ? (
          <div className="flex gap-2">
            <button
              onClick={() => HandleUpdateNotification(notification._id, "check it")}
              className="w-10 flex items-center justify-center text-principal-1 cursor-pointer"
              aria-label="Aceptar"
            >
              <FaCheckCircle size={30} />
            </button>
            <button
              onClick={() => HandleUpdateNotification(notification._id, "cancel")}
              className="w-10 flex items-center justify-center text-red-600 cursor-pointer"
              aria-label="Rechazar"
            >
              <FaTimesCircle size={30} />
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};
