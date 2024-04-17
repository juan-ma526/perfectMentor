interface Props {
  body: string;
  from: string;
}

export const Messages = ({ body, from }: Props) => {
  return (
    <div className={`flex mb-4 cursor-pointer ${from === "Yo" ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex justify-center items-center max-w-96 rounded-lg p-3 gap-3 ${
          from === "Yo" ? "bg-lime-700 text-white" : "bg-white text-gray-700"
        }  `}
      >
        <p className={`${from === "Yo" ? "hidden" : "block bg-lime-800 text-white rounded-xl p-2"}`}>{from}:</p>
        <p>{body}</p>
      </div>
    </div>
  );
};
