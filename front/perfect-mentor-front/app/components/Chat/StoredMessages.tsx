interface Props {
  message: string;
  from: string;
  nickname: string;
  createdAt?: string;
  updatedAt?: string;
}

export const StoredMessages = ({ message, from, nickname, createdAt, updatedAt }: Props) => {
  return (
    <div className={`flex mb-4 cursor-pointer ${from === nickname ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-96 rounded-lg p-3 gap-3 ${
          from === nickname ? "bg-principal-4 text-white" : "bg-white text-gray-600"
        }  `}
      >
        <div className="flex gap-2 justify-center items-center">
          <p className={`${from === nickname ? "hidden" : "bg-lime-200"} p-2 rounded-lg`}>{from}:</p>
          <p>{message}</p>
          <p className="text-xs">{createdAt?.slice(0, -5)}</p>
        </div>
      </div>
    </div>
  );
};
