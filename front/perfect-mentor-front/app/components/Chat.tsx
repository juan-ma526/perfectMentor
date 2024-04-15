import Image from "next/image";
import avatarDefault from "../assets/avatarDefault.png";

export const Chat = () => {
  return (
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
      <div className="flex-1">
        {/* Chat Header  */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>
        {/* Chat Messages  */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <Image src={avatarDefault} alt="User Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">So, pizza next week, right?</p>
            </div>
          </div>
          {/* Outgoing Message  */}
          <div className="flex justify-end mb-4 cursor-pointer">
            <div className="flex max-w-96 bg-lime-700 text-white rounded-lg p-3 gap-3">
              <p>Absolutely! Cant wait for our pizza date. 🍕</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <Image src={avatarDefault} alt="My Avatar" className="w-8 h-8 rounded-full" />
            </div>
          </div>
          {/* Incoming Message */}
          <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <Image src={avatarDefault} alt="User Avatar" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p className="text-gray-700">Hoorayy!!</p>
            </div>
          </div>
        </div>
        {/*  Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-2 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-principal-1 text-principal-3 px-2 py-2 rounded-md ml-2">Send</button>
          </div>
        </footer>
      </div>
    </div>
  );
};
