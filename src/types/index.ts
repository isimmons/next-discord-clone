export type TChannel = {
  id: number;
  label: string;
  description?: string;
  icon?: string;
  unread?: boolean;
  messages: Array<TMessage>;
};

export type TCategory = {
  id: number;
  label: string;
  channels: Array<TChannel>;
};

export type TMessage = {
  user: string;
  avatarUrl: string;
  date: string;
  text: string;
};

export type TServer = {
  label: string;
  img: string;
  categories: Array<TCategory>;
};
