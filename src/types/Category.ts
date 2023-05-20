export type CategoryType = {
  id: number;
  parent_id: null | number;
  name: string;
  title: string;
  image_id: null | number;
  order: number;
  status: 'active' | 'Inactive';
  create_at: string;
  childExist?: boolean;
};

export type CategoriesType = CategoryType & {
  children: {[k: number]: CategoryType};
};
