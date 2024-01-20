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
            <div className="relative group">
              <div className="flex absolute -left-3 h-full items-center">
                <div
                  className={`${
                    pathname === "/"
                      ? "h-10"
                      : "h-5 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                  } w-1 transition-all duration-200 origin-left bg-white rounded-r`}
                ></div>
              </div>
              <div className="group-active:translate-y-px">
                <div
                  className={`${
                    pathname === "/"
                      ? "rounded-2xl bg-brand text-white"
                      : "bg-gray-700 text-gray-100 rounded-3xl group-hover:bg-brand group-hover:rounded-2xl group-hover:text-white"
                  } size-12  flex items-center justify-center  transition-all duration-200`}
                >
                  <DiscordIcon className="w-7 h-5" />
                </div>
              </div>
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
