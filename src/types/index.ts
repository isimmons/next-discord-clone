export type Channel = {
  id: number;
  label: string;
  icon?: string;
  unread?: boolean;
};

export type Category = {
  id: number;
  label: string;
  channels: Array<Channel>;
};
