"use client";
import Image from "next/image";
import avatarDefault from "../assets/avatarDefault.png";
import io from "socket.io-client";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-Provider";
import { Loading } from "./Loading";
import { toast } from "sonner";

interface Message {
  body: string;
  from: string;
}
interface storedMessage {
  message: string;
  from: string;
}

//Conexion para recibir y mandar eventos

const socket = io("http://localhost:3001");

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [storedMessages, setStoredMessages] = useState<storedMessage[]>([]);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const recievedMessage = (message: any) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", recievedMessage);
    return () => {
      socket.off("message", recievedMessage);
    };
  }, [messages]);

  if (!firstTime) {
    const getAllMessages = async () => {
      const response = await fetch("http://localhost:3001/api/message/allMessage", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }).then((res) => res.json());
      const data = await response;
      console.log(data);
      setStoredMessages(data);
    };
    getAllMessages();
    setFirstTime(true);
  }

  const handleSubmitNickname = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNickname(nickname);
    setDisabled(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickname !== "") {
      socket.emit("message", message, nickname);

      const newMessage = {
        body: message,
        from: "Yo",
      };

      setMessages([newMessage, ...messages]);
      setMessage("");

      // Peticion post

      const postMessage = async () => {
        const response = await fetch("http://localhost:3001/api/message/saveMessage", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: message, from: nickname }),
        }).then((res) => res.json());
        const data = await response;
        console.log(data);
      };
      postMessage();
    } else {
      toast.error("Para enviar un mensaje debes establecer un nickname");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen overflow-hidden z-[1000]">
          {/* Sidebar */}
          <div className="w-[30%] md:w-1/4 bg-white border-r border-gray-300">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-principal-1 text-principal-3">
              <h1 className="text-xl font-semibold">Chat Web</h1>
              <div className="relative"></div>
            </header>
            {/* Contact List */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
              {/* Item contact list */}
              <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                <div className="flex-1 border-b-2 border-lime-400 ">
                  <h2 className="text-lg font-semibold ">Alice</h2>
                  <p className="text-gray-600 text-xs">Hoorayy!!</p>
                </div>
              </div>
            </div>
          </div>
          {/* Main Chat Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Chat Header  */}
            <form onSubmit={handleSubmitNickname} className="bg-white p-4 text-gray-700">
              <input
                onChange={(e) => setNickname(e.target.value)}
                type="text"
                placeholder="Nickname..."
                id="nickname"
                className="text-2xl font-light border-b-2 border-principal-1"
                disabled={disabled}
              />
              <button
                id="btn-nickname"
                type="submit"
                className="bg-principal-1 text-principal-3 px-2 py-2 rounded-md ml-2"
                disabled={disabled}
              >
                Establecer
              </button>
            </form>
            {/* Chat Messages  */}
            <div className="h-screen overflow-y-auto p-4 pb-36" id="content-chat">
              <small className="text-center opacity-1">... Mensajes guardados...</small>
              {storedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-4 cursor-pointer ${message.from === nickname ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-96 rounded-lg p-3 gap-3 ${
                      message.from === nickname ? "bg-principal-4 text-white" : "bg-white text-gray-600"
                    }  `}
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <p className={`${message.from === nickname ? "hidden" : "bg-lime-200"} p-2 rounded-lg`}>
                        {message.from}:
                      </p>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Incoming Message */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-4 cursor-pointer ${message.from === "Yo" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex justify-center items-center max-w-96 rounded-lg p-3 gap-3 ${
                      message.from === "Yo" ? "bg-lime-700 text-white" : "bg-white text-gray-700"
                    }  `}
                  >
                    <p
                      className={`${message.from === "Yo" ? "hidden" : "block bg-lime-800 text-white rounded-xl p-2"}`}
                    >
                      {message.from}:
                    </p>
                    <p>{message.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/*  Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-2 absolute bottom-0 w-3/4">
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
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
          </div>
        </div>
      )}
    </>
  );
};
