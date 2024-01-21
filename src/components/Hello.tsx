import Image from 'next/image';

const Hello = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-700 text-white">
        <div className="max-w-lg">
          <div className="flex px-4 py-1 hover:bg-slate-800 hover:bg-opacity-30">
            <Image
              src="/images/adam-wathan.jpg"
              alt="Adam Wathan"
              className="mr-4 size-10 rounded-full"
            />
            <div>
              <p className="flex items-baseline">
                <span className="mr-2 text-sm font-medium text-emerald-600">
                  adamwathan
                </span>
                <span className="text-xs text-slate-500">01/15/2021</span>
              </p>
              <p className="text-slate-300">
                You should never use something like leading relaxed with a big
                font size, it goes against all typography best practices. Line
                height should decrease as font size gets bigger
              </p>
            </div>
          </div>
          <div className="mt-1 px-4 py-1 hover:bg-slate-800 hover:bg-opacity-30">
            <p className="pl-14 text-slate-300">
              You can override it in your config if you want but ultimately we
              chose the defaults they did because they let you get results
              closest to what a professional designer would do more easily
            </p>
          </div>
          <div className="mt-1 px-4 py-1 hover:bg-slate-800 hover:bg-opacity-30">
            <p className="pl-14 text-slate-300">
              Since we changed this in tailwind 2 I&apos;ve almost never used a
              leading class at all
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hello;
