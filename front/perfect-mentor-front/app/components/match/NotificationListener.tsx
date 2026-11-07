"use client";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../auth-Provider";
import { connectSocket, disconnectSocket } from "../../lib/socket";

export const NOTIFICATIONS_CHANGED = "notifications:changed";

interface Payload {
  type: "request" | "match" | "rejected";
  nameUserRte?: string;
}

export const NotificationListener = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket(user.id);
    const onNotification = (payload: Payload) => {
      if (payload.type === "request") toast.info(`${payload.nameUserRte} quiere hacer match contigo`);
      else if (payload.type === "match") toast.success(`Hiciste MATCH con ${payload.nameUserRte}!!!`);
      else toast.error("Tu pedido de match fue rechazado");
      window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED));
    };

    socket.on("notification", onNotification);
    return () => {
      socket.off("notification", onNotification);
    };
  }, [user]);

  return null;
};
