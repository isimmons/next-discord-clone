import { notFound } from "next/navigation";
import {
  AddPersonIcon,
  BookIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronDownSmallIcon,
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
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 size-4">
            <VerifiedIcon className="absolute size-4 text-gray-550" />
            <CheckIcon className="absolute size-4" />
          </div>
          {server.name}
          <ChevronDownIcon className="ml-auto size-[18px] opacity-80" />
        </button>

        <div className="scrollbar-fix mt-[17px] flex-1 overflow-y-scroll font-medium text-gray-300">
          <div className="space-y-0.5">
            <a
              href="#"
              className="group mx-2 flex items-center rounded px-2 py-1 text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100"
            >
              <BookIcon className="mr-1.5 size-5 text-gray-400 " />
              welcome
              <AddPersonIcon className="ml-auto size-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
            </a>
            <a
              href="#"
              className="group mx-2 flex items-center rounded px-2 py-1 text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100"
            >
              <SpeakerphoneIcon className="mr-1.5 size-5 text-gray-400 " />
              announcements
              <AddPersonIcon className="ml-auto size-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
            </a>
          </div>

          <div className="mt-5">
            <button className="flex items-center px-1 font-title text-xs uppercase">
              <ChevronDownSmallIcon className="size-3" />
              Tailwind CSS
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-3 font-title shadow-sm">
          General
        </div>
        <div className="scrollbar-fix flex-1 space-y-4 overflow-y-scroll px-3">
          {fakeMessages.map((value, index) => (
            <p key={index}>{`Message ${index + 1}: ${value}`}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServerPage;
