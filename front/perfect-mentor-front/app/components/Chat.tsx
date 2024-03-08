"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from ".";

export const Chat = () => {
  const scroll = useRef<HTMLSpanElement>(null);

  return (
    <>
      <main className="flex flex-col p-3 relative">
        <Message />
      </main>
      {/*Enviar mensaje*/}
      <span ref={scroll}></span>
    </>
  );
};
