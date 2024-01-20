export default function Home() {
  return (
    <>
      <div className="bg-gray-800 w-60 flex flex-col">
        <div className="px-3 h-12 shadow-md flex items-center font-title text-white">
          Dashboard
        </div>
        <div className="text-gray-300 font-medium flex-1 p-3 overflow-y-scroll scrollbar-fix space-y-2">
          <p className="text-white">Friends</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-gray-700"></div>
    </>
  );
}
