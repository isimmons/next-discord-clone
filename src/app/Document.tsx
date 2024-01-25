import ServerLinks from '~/components/ServerLinks';
import { data as servers } from '~/data/categories';

type Props = {
  children: React.ReactNode;
};

const Document = ({ children }: Props) => {
  return (
    <main>
      <div className="flex h-screen text-gray-100">
        <ServerLinks servers={servers} />

        {children}
      </div>
    </main>
  );
};

export default Document;
