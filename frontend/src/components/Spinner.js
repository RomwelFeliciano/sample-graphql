export default function Spinner() {
  return (
    <div className="flex justify-center items-center pt-96">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-sky-400 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-sky-400 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-400 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
