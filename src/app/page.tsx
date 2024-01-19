import Link from "next/link";
import { fakeChannels, fakeMessages } from "~/data";
import DiscordIcon from "~/components/DiscordIcon";

export default function Home() {
  return (
    <>
      <div>
        {/* {fakeServers.map((server, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 size-12 rounded-full flex items-center justify-center"
          >
            {server}
          </div>
        ))} */}
      </div>
      <div className="bg-gray-800 w-60 flex flex-col">
        <div className="px-3 h-12 shadow-md flex items-center font-title text-white">
          Tailwind CSS
        </div>
        <div className="text-gray-300 font-medium flex-1 p-3 overflow-y-scroll scrollbar-fix space-y-2">
          <p className="text-white">channel (unread)</p>
          <p className="text-white">channel (unread)</p>
          {fakeChannels.map((channel, index) => (
            <p key={index}>{channel}</p>
          ))}
        </div>
      </div>
      <div className="bg-gray-700 flex-1 flex flex-col">
        <div className="h-12 px-3 shadow-md flex items-center font-title">
          General
        </div>
        <div className="flex-1 px-3 overflow-y-scroll space-y-4 scrollbar-fix">
          {fakeMessages.map((value, index) => (
            <p key={index}>{`Message ${index + 1}: ${value}`}</p>
          ))}
        </div>
      </div>
    </>
  );
}
