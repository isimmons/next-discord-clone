import { notFound } from "next/navigation";
import {
  AddPersonIcon,
  BookIcon,
  CheckIcon,
  ChevronIcon,
  SpeakerphoneIcon,
  VerifiedIcon,
} from "~/components/Icons";
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

        <div className="text-gray-300 font-medium flex-1 overflow-y-scroll scrollbar-fix mt-[17px]">
          <div className="space-y-0.5">
            <a
              href="#"
              className="flex group items-center px-2 mx-2 py-1 rounded text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100"
            >
              <BookIcon className="size-5 mr-1.5 text-gray-400 " />
              welcome
              <AddPersonIcon className="size-4 ml-auto text-gray-200 opacity-0 group-hover:opacity-100 hover:text-gray-100" />
            </a>
            <a
              href="#"
              className="flex group items-center px-2 mx-2 py-1 rounded text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100"
            >
              <SpeakerphoneIcon className="size-5 mr-1.5 text-gray-400 " />
              announcements
              <AddPersonIcon className="size-4 ml-auto text-gray-200 opacity-0 group-hover:opacity-100 hover:text-gray-100" />
            </a>
          </div>
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
