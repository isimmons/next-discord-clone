import { notFound } from "next/navigation";
import { CheckIcon, ChevronIcon, VerifiedIcon } from "~/components/Icons";
import { servers, fakeChannels, fakeMessages } from "~/data";

type Props = {
  params: { serverId: string };
};

const ServerPage = ({ params }: Props) => {
  const serverId = parseInt(params.serverId);
  if (isNaN(serverId)) notFound();

  const server = servers.find((s) => parseInt(s.id) === serverId);
  if (!server) notFound();
  return (
    <>
      <div className="bg-gray-800 w-60 flex flex-col">
        <button className="px-4 h-12 shadow-sm flex items-center font-title text-white text-[15px] hover:bg-gray-550/[0.16] transition">
          <div className="relative size-4 mr-1">
            <VerifiedIcon className="size-4 text-gray-550 absolute" />
            <CheckIcon className="size-4 absolute" />
          </div>
          {server.name}
          <ChevronIcon className="size-[18px] ml-auto opacity-80" />
        </button>
        <div className="text-gray-300 font-medium flex-1 p-3 overflow-y-scroll scrollbar-fix space-y-2">
          <p className="text-white">channel (unread)</p>
          <p className="text-white">channel (unread)</p>
          {fakeChannels.map((channel, index) => (
            <p key={index}>{channel}</p>
          ))}
        </div>
      </div>
      <div className="bg-gray-700 flex-1 flex flex-col">
        <div className="h-12 px-3 shadow-sm flex items-center font-title">
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
};

export default ServerPage;
