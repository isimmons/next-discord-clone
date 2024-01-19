"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import DiscordIcon from "~/components/DiscordIcon";

type Props = {
  children: React.ReactNode;
};

const Document = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <main>
      <div className="flex text-gray-100 h-screen">
        <div className="bg-gray-900 p-3 px-4 space-y-2 overflow-y-scroll scrollbar-fix">
          <Link href="/">
            <div
              className={`${
                pathname === "/"
                  ? "rounded-2xl bg-brand text-white"
                  : "bg-gray-700 text-gray-100 rounded-3xl hover:bg-brand hover:rounded-2xl hover:text-white"
              } size-12  flex items-center justify-center  transition-all duration-200`}
            >
              <DiscordIcon className="w-7 h-5" />
            </div>
          </Link>
          <Link href="/servers/1" className="block">
            <div className="bg-gray-700 text-gray-100 size-12 rounded-3xl flex items-center justify-center hover:bg-brand hover:rounded-2xl hover:text-white transition-all duration-200">
              S1
            </div>
          </Link>
        </div>

        {children}
      </div>
    </main>
  );
};

export default Document;
