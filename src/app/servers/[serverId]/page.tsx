import { notFound } from "next/navigation";

type Props = {
  params: { serverId: string };
};

const ServerPage = ({ params }: Props) => {
  const serverId = parseInt(params.serverId);
  if (isNaN(serverId)) notFound();

  return <div>Server {serverId}</div>;
};

export default ServerPage;
