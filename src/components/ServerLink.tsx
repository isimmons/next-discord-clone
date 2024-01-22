'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const ServerLink = ({ href, children, active }: Props) => {
  const pathname = usePathname();
  const isActive = active || pathname === href;

  return (
    <div className="block">
      <Link href={href}>
        <div className="group relative">
          <div className="absolute -left-3 flex h-full items-center">
            <div
              className={`${
                isActive
                  ? 'h-10'
                  : 'h-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
              } w-1 origin-left rounded-r bg-white transition-all duration-200`}
            ></div>
          </div>
          <div className="group-active:translate-y-px">
            <div
              className={`${
                isActive
                  ? 'rounded-2xl bg-brand text-white'
                  : 'rounded-3xl bg-gray-700 text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white'
              } flex  size-12 items-center justify-center  overflow-hidden transition-all duration-200`}
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
