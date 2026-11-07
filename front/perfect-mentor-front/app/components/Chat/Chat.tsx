"use client";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../auth-Provider";
import { Loading } from "../Loading";
import { toast } from "sonner";
import { NotVerified } from "./NotVerified";
import { Messages } from "./Messages";
import { ChatMessage, Match } from "../../interfaces";
import { connectSocket } from "../../lib/socket";
import { NOTIFICATIONS_CHANGED } from "../match/NotificationListener";

const API = "http://localhost:3001/api";

const otherOf = (match: Match, userId?: string) =>
  match.idUser === userId
    ? { name: match.usernameDestination, email: match.emailDestination }
    : { name: match.usernameUser, email: match.emailUser };

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [selected, setSelected] = useState<Match | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const selectedId = selected?._id;

  // Devuelve false si no hay sesion valida
  const loadMatchs = async () => {
    try {
      const response = await fetch(`${API}/match/allMatch`, { credentials: "include" });
      if (response.ok) setMatchs(await response.json());
      return response.status !== 401;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  useEffect(() => {
    setSelected(null);
    setMatchs([]);
    loadMatchs().then((hasSession) => {
      if (user !== null || !hasSession) setLoading(false);
    });
  }, [user]);

  // Un match nuevo (aceptado o por like mutuo) llega como notificacion
  useEffect(() => {
    window.addEventListener(NOTIFICATIONS_CHANGED, loadMatchs);
    return () => window.removeEventListener(NOTIFICATIONS_CHANGED, loadMatchs);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    setMessages([]);
    fetch(`${API}/message/allMessage?matchId=${selectedId}`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => active && setMessages(data))
      .catch(() => active && setMessages([]));
    return () => {
      active = false;
    };
  }, [selectedId]);

  useEffect(() => {
    if (user === null) return;
    const socket = connectSocket(user.id);
    const onMessage = (incoming: ChatMessage) => {
      if (incoming.matchId !== selectedId) return;
      setMessages((prev) => (prev.some((m) => m._id === incoming._id) ? prev : [...prev, incoming]));
    };
    socket.on("message", onMessage);
    return () => {
      socket.off("message", onMessage);
    };
  }, [user, selectedId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || !selectedId) return;

    connectSocket().emit("message", { matchId: selectedId, message: text }, (res: any) => {
      if (res?.ok) {
        const saved: ChatMessage = res.message;
        setMessages((prev) => (prev.some((m) => m._id === saved._id) ? prev : [...prev, saved]));
        setMessage("");
      } else {
        toast.error("No se pudo enviar el mensaje");
      }
    });
  };

  if (loading) return <Loading />;
  if (user?.status !== "Verified") return <NotVerified />;

  const showList = !selected;

  return (
    <div className="flex h-[700px] md:h-[600px] w-full overflow-hidden">
      {/* Lista de matchs */}
      <div
        className={`${showList ? "flex" : "hidden"} md:flex flex-col w-full md:w-1/4 bg-white border-r border-gray-300`}
      >
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-principal-1 text-principal-3">
          <h1 className="text-xl font-semibold">Matchs</h1>
        </header>
        <div className="overflow-y-auto flex-1 p-3">
          {matchs.length === 0 && <p className="text-gray-600 text-sm p-2">Todavia no tienes matchs.</p>}
          {matchs.map((match) => {
            const other = otherOf(match, user?.id);
            return (
              <div
                key={match._id}
                onClick={() => setSelected(match)}
                className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
                  selectedId === match._id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex-1 min-w-0 border-b-2 border-lime-400">
                  <h2 className="text-lg font-semibold truncate">{other.name}</h2>
                  <p className="text-gray-600 text-xs truncate">{other.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversacion */}
      <div className={`${showList ? "hidden" : "flex"} md:flex flex-col flex-1 min-w-0`}>
        {selected ? (
          <>
            <header className="bg-white p-4 text-gray-700 border-b border-gray-300 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="md:hidden bg-principal-1 text-principal-3 px-2 py-1 rounded-md"
              >
                Volver
              </button>
              <h2 className="text-xl font-light truncate">{otherOf(selected, user?.id).name}</h2>
            </header>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4" id="content-chat">
              {messages.map((m) => (
                <Messages key={m._id} body={m.message} mine={m.from === user?.id} createdAt={m.createdAt} />
              ))}
              <div ref={endRef} />
            </div>
            <footer className="bg-white border-t border-gray-300 p-2">
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full min-w-0 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button
                  id="btn-message"
                  type="submit"
                  className="bg-principal-1 text-principal-3 px-2 py-2 rounded-md ml-2"
                >
                  Send
                </button>
              </form>
            </footer>
          </>
        ) : (
          <p className="m-auto text-gray-600">Elige un match para chatear.</p>
        )}
      </div>
    </div>
  );
};
