export type ChatType = {
  id: number;
  from_id: number;
  to_id: number;
  advertisement_id: number;
  type: 'text' | 'image';
  content: string;
  readed: boolean;
  created_at: number;
  delete_at: number;
  title: string;
  first_name: string | null;
  last_name: string | null;
  avatar_id: string;
  user_id: number;
};
