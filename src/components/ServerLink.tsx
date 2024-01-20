"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
};

const ServerLink = ({ href, children }: Props) => {
  const pathname = usePathname();
  return (
    <div className="block">
      <Link href={href}>
        <div className="relative group">
          <div className="flex absolute -left-3 h-full items-center">
            <div
              className={`${
                pathname === href
                  ? "h-10"
                  : "h-5 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
              } w-1 transition-all duration-200 origin-left bg-white rounded-r`}
            ></div>
          </div>
          <div className="group-active:translate-y-px">
            <div
              className={`${
                pathname === href
                  ? "rounded-2xl bg-brand text-white"
                  : "bg-gray-700 text-gray-100 rounded-3xl group-hover:bg-brand group-hover:rounded-2xl group-hover:text-white"
              } size-12  flex items-center justify-center  transition-all duration-200 overflow-hidden`}
            >
              {children}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServerLink;
