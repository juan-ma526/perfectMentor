interface Props {
  body: string;
  mine: boolean;
  createdAt?: string;
}

export const Messages = ({ body, mine, createdAt }: Props) => {
  return (
    <div className={`flex mb-4 ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col max-w-[80%] rounded-lg p-3 gap-1 ${
          mine ? "bg-principal-4 text-white" : "bg-white text-gray-700"
        }`}
      >
        <p className="break-words [overflow-wrap:anywhere]">{body}</p>
        {createdAt && <p className="text-xs opacity-70 self-end">{new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>}
      </div>
    </div>
  );
};
