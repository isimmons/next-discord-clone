import ServerLinks from '~/components/ServerLinks';

type Props = {
  children: React.ReactNode;
};

const Document = ({ children }: Props) => {
  return (
    <main>
      <div className="flex h-screen text-gray-100">
        <ServerLinks />

        {children}
      </div>
    </main>
  );
};

export default Document;
